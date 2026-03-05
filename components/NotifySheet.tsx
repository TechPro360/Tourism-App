import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import {
  X,
  Bell,
  Check,
  Calendar,
} from "lucide-react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface NotifySheetProps {
  visible: boolean;
  onClose: () => void;
  eventTitle: string;
  onSelect: (option: string) => void;
}

const NOTIFY_OPTIONS = [
  { id: "day", label: "1 day before", icon: "day" },
  { id: "week", label: "1 week before", icon: "week" },
  { id: "month", label: "1 month before", icon: "month" },
];

export default function NotifySheet({
  visible,
  onClose,
  eventTitle,
  onSelect,
}: NotifySheetProps) {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const [selected, setSelected] = useState<string | null>(null);

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

  const handleSelect = (optionId: string) => {
    if (selected === optionId) {
      setSelected(null);
      onSelect("");
    } else {
      setSelected(optionId);
      onSelect(optionId);
    }
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.backdrop, { opacity: backdropAnim }]}>
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

          <View style={styles.headerRow}>
            <Bell size={20} color="#117A7A" />
            <Text style={styles.sheetTitle}>Set Reminder</Text>
          </View>

          <Text style={styles.eventName} numberOfLines={2}>
            {eventTitle}
          </Text>

          <View style={styles.optionsList}>
            {NOTIFY_OPTIONS.map((option) => {
              const isSelected = selected === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionRow,
                    isSelected && styles.optionRowSelected,
                  ]}
                  onPress={() => handleSelect(option.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.optionIcon, isSelected && styles.optionIconSelected]}>
                    <Calendar size={18} color={isSelected ? "#FFFFFF" : "#117A7A"} />
                  </View>
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                    {option.label}
                  </Text>
                  {isSelected && (
                    <View style={styles.checkCircle}>
                      <Check size={14} color="#117A7A" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1A1A1A",
  },
  eventName: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "#888",
    marginBottom: 20,
    lineHeight: 20,
  },
  optionsList: {
    gap: 10,
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5FAF8",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 14,
    gap: 14,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  optionRowSelected: {
    borderColor: "#117A7A",
    backgroundColor: "#E8F6F6",
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  optionIconSelected: {
    backgroundColor: "#117A7A",
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600" as const,
    color: "#1A1A1A",
  },
  optionTextSelected: {
    color: "#117A7A",
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E0F0F0",
    justifyContent: "center",
    alignItems: "center",
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
