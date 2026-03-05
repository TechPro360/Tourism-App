import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  Platform,
  Share,
  Linking,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import {
  X,
  Copy,
  MessageCircle,
  Instagram,
  Share2,
  Link,
} from "lucide-react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ShareSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  url?: string;
}

export default function ShareSheet({
  visible,
  onClose,
  title,
  message,
  url,
}: ShareSheetProps) {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 9,
          tension: 65,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, backdropAnim]);

  const handleCopyLink = async () => {
    const textToCopy = url || message;
    try {
      await Clipboard.setStringAsync(textToCopy);
      console.log("Link copied to clipboard");
    } catch (error) {
      console.log("Copy error:", error);
    }
    onClose();
  };

  const handleNativeShare = async () => {
    try {
      await Share.share({
        title,
        message: url ? `${message}\n\n${url}` : message,
      });
    } catch (error) {
      console.log("Share error:", error);
    }
    onClose();
  };

  const handleSocialShare = (platform: string) => {
    const fullMessage = url ? `${message}\n\n${url}` : message;
    const encodedMessage = encodeURIComponent(fullMessage);
    const encodedUrl = encodeURIComponent(url || "");

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = url
          ? `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`
          : `https://www.facebook.com/sharer/sharer.php?quote=${encodedMessage}`;
        break;
      case "messenger":
        shareUrl = `fb-messenger://share/?link=${encodedUrl || encodedMessage}`;
        break;
      case "instagram":
        handleNativeShare();
        return;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
        break;
      default:
        handleNativeShare();
        return;
    }

    if (Platform.OS === "web") {
      if (shareUrl.startsWith("http")) {
        window.open(shareUrl, "_blank");
      } else {
        handleNativeShare();
      }
    } else {
      Linking.canOpenURL(shareUrl).then((supported) => {
        if (supported) {
          Linking.openURL(shareUrl);
        } else {
          handleNativeShare();
        }
      });
    }
    onClose();
  };

  const shareLink = url || message;

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Animated.View
          style={[styles.backdrop, { opacity: backdropAnim }]}
        >
          <TouchableOpacity
            style={styles.backdropTouch}
            activeOpacity={1}
            onPress={onClose}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheetContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.handle} />

          <Text style={styles.sheetTitle}>Share</Text>

          <TouchableOpacity
            style={styles.copyLinkRow}
            onPress={handleCopyLink}
            activeOpacity={0.7}
          >
            <View style={styles.copyLinkIcon}>
              <Link size={18} color="#117A7A" />
            </View>
            <Text style={styles.copyLinkText}>Copy Link</Text>
            <Copy size={18} color="#999" />
          </TouchableOpacity>

          <View style={styles.socialGrid}>
            <TouchableOpacity
              style={styles.socialItem}
              onPress={() => handleSocialShare("facebook")}
              activeOpacity={0.7}
            >
              <View style={[styles.socialCircle, { backgroundColor: "#1877F2" }]}>
                <Text style={styles.socialIcon}>f</Text>
              </View>
              <Text style={styles.socialLabel}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialItem}
              onPress={() => handleSocialShare("messenger")}
              activeOpacity={0.7}
            >
              <View style={[styles.socialCircle, { backgroundColor: "#0099FF" }]}>
                <MessageCircle size={22} color="#FFF" />
              </View>
              <Text style={styles.socialLabel}>Messenger</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialItem}
              onPress={() => handleSocialShare("instagram")}
              activeOpacity={0.7}
            >
              <View style={[styles.socialCircle, { backgroundColor: "#E4405F" }]}>
                <Instagram size={22} color="#FFF" />
              </View>
              <Text style={styles.socialLabel}>Instagram</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialItem}
              onPress={() => handleSocialShare("twitter")}
              activeOpacity={0.7}
            >
              <View style={[styles.socialCircle, { backgroundColor: "#1A1A1A" }]}>
                <Text style={styles.xIcon}>𝕏</Text>
              </View>
              <Text style={styles.socialLabel}>X</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialItem}
              onPress={() => handleSocialShare("others")}
              activeOpacity={0.7}
            >
              <View style={[styles.socialCircle, { backgroundColor: "#666" }]}>
                <Share2 size={22} color="#FFF" />
              </View>
              <Text style={styles.socialLabel}>Others</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.linkPreview}>
            <View style={styles.linkPreviewIcon}>
              <Link size={14} color="#999" />
            </View>
            <Text style={styles.linkPreviewText} numberOfLines={2}>
              {shareLink}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <X size={18} color="#666" />
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  backdropTouch: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#DDD",
    alignSelf: "center",
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 18,
  },
  copyLinkRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5FAF8",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 20,
    gap: 12,
  },
  copyLinkIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  copyLinkText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600" as const,
    color: "#1A1A1A",
  },
  socialGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  socialItem: {
    alignItems: "center",
    gap: 8,
    width: 64,
  },
  socialCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  xIcon: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  socialLabel: {
    fontSize: 11,
    fontWeight: "600" as const,
    color: "#666",
    textAlign: "center",
  },
  linkPreview: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  linkPreviewIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EBEBEB",
    justifyContent: "center",
    alignItems: "center",
  },
  linkPreviewText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "400" as const,
    color: "#888",
    lineHeight: 18,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#F5F5F5",
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: "#666",
  },
});
