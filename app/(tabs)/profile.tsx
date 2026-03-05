import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Linking,
  Image,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Heart,
  CheckCircle2,
  Info,
  ChevronRight,
  ExternalLink,
  MapPin,
  Trash2,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAppContext } from "@/contexts/AppContext";
import { touristSpots } from "@/constants/touristSpots";
import { resolveImageSource } from "@/utils/imageHelper";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { exploredSpots, favorites, toggleFavorite } = useAppContext();

  const favoriteSpots = touristSpots.filter((spot) =>
    favorites.includes(spot.id)
  );
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleAboutPress = () => {
    router.push("/about" as any);
  };

  const handlePoweredByPress = () => {
    Linking.openURL("https://www.techpro360solutions.com");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={["#FFFFFF", "#F8FFFE", "#FFFFFF"]}
        style={styles.backgroundGradient}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Your journey statistics</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.statsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#E8F6F6" }]}>
              <CheckCircle2 size={28} color="#117A7A" />
            </View>
            <Text style={styles.statNumber}>{exploredSpots.length}</Text>
            <Text style={styles.statLabel}>Places Explored</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#FFE8EE" }]}>
              <Heart size={28} color="#E94444" />
            </View>
            <Text style={styles.statNumber}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 30],
                    outputRange: [0, 40],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>My Favorites</Text>

          {favoriteSpots.length === 0 ? (
            <View style={styles.emptyFavContainer}>
              <Heart size={36} color="#D0D0D0" />
              <Text style={styles.emptyFavText}>No favorites yet</Text>
            </View>
          ) : (
            favoriteSpots.map((spot) => (
              <TouchableOpacity
                key={spot.id}
                style={styles.favItem}
                activeOpacity={0.8}
                onPress={() => router.push(`/spot/${spot.id}` as any)}
              >
                <Image
                  source={resolveImageSource(spot.image)}
                  style={styles.favItemImage}
                />
                <View style={styles.favItemInfo}>
                  <Text style={styles.favItemName} numberOfLines={1}>
                    {spot.name}
                  </Text>
                  <View style={styles.favItemLocation}>
                    <MapPin size={12} color="#888" />
                    <Text style={styles.favItemLocationText} numberOfLines={1}>
                      {spot.location}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.favRemoveBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleFavorite(spot.id);
                  }}
                  activeOpacity={0.7}
                >
                  <Trash2 size={16} color="#E94444" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          )}
        </Animated.View>

        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 30],
                    outputRange: [0, 50],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Information</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleAboutPress}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIcon, { backgroundColor: "#E8F6F6" }]}>
                <Info size={22} color="#117A7A" />
              </View>
              <Text style={styles.menuItemText}>About Nueva Ecija</Text>
            </View>
            <ChevronRight size={20} color="#CCCCCC" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.footerContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.logosContainer}>
            <Image
              source={{
                uri: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/lms3g6g1a6je8gfbnt15x",
              }}
              style={styles.provinceLogo}
              resizeMode="contain"
            />
            <Image
              source={{
                uri: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/cvflf92ran3nzii6p5anh",
              }}
              style={styles.philippinesLogo}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.footerText}>Powered by</Text>
          <TouchableOpacity
            onPress={handlePoweredByPress}
            activeOpacity={0.7}
            style={styles.companyButton}
          >
            <Text style={styles.companyName}>TechPro 360 Solutions</Text>
            <ExternalLink size={16} color="#117A7A" />
          </TouchableOpacity>
          <Text style={styles.versionText}>Version 0.1</Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: "#117A7A",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: "500" as const,
    color: "#5A9B9B",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    boxShadow: "0px 4px 12px rgba(17, 122, 122, 0.1)",
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(17, 122, 122, 0.08)",
  },
  statIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "#666666",
    textAlign: "center",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0px 2px 8px rgba(17, 122, 122, 0.08)",
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(17, 122, 122, 0.06)",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#1A1A1A",
  },
  footerContainer: {
    alignItems: "center",
    paddingVertical: 32,
    gap: 8,
  },
  logosContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginBottom: 24,
  },
  provinceLogo: {
    width: 80,
    height: 80,
  },
  philippinesLogo: {
    width: 80,
    height: 80,
  },
  footerText: {
    fontSize: 14,
    color: "#999999",
  },
  companyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#117A7A",
  },
  versionText: {
    fontSize: 12,
    color: "#CCCCCC",
    marginTop: 4,
  },
  emptyFavContainer: {
    alignItems: "center",
    paddingVertical: 28,
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(17, 122, 122, 0.06)",
  },
  emptyFavText: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "#AAAAAA",
  },
  favItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    gap: 12,
    boxShadow: "0px 2px 8px rgba(17, 122, 122, 0.06)",
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(17, 122, 122, 0.06)",
  },
  favItemImage: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#F0F0F0",
  },
  favItemInfo: {
    flex: 1,
    gap: 4,
  },
  favItemName: {
    fontSize: 15,
    fontWeight: "700" as const,
    color: "#1A1A1A",
  },
  favItemLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  favItemLocationText: {
    fontSize: 12,
    fontWeight: "500" as const,
    color: "#888",
    flex: 1,
  },
  favRemoveBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
  },
});
