import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
  Linking,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  MapPin,
  Heart,
  Phone,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Navigation,
  CheckCircle2,
} from "lucide-react-native";
import { touristSpots } from "@/constants/touristSpots";
import { useAppContext } from "@/contexts/AppContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function SpotDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const scrollX = useRef(new Animated.Value(0)).current;

  const { toggleFavorite, isFavorite, markAsExplored, isExplored } =
    useAppContext();

  const spot = touristSpots.find((s) => s.id === id);
  const favorite = isFavorite(id as string);
  const explored = isExplored(id as string);

  const [heartScale] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const handleFavoritePress = () => {
    Animated.sequence([
      Animated.spring(heartScale, {
        toValue: 1.3,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(heartScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    toggleFavorite(id as string);
  };

  const handleExplorePress = () => {
    markAsExplored(id as string);
  };

  const handleLocationPress = () => {
    if (!spot) return;

    const scheme = Platform.select({
      ios: "maps:",
      android: "geo:",
      default: "https:",
    });

    const url = Platform.select({
      ios: `${scheme}${spot.coordinates.latitude},${spot.coordinates.longitude}`,
      android: `${scheme}${spot.coordinates.latitude},${spot.coordinates.longitude}`,
      default: `https://www.google.com/maps/search/?api=1&query=${spot.coordinates.latitude},${spot.coordinates.longitude}`,
    });

    Linking.openURL(url);
  };

  const handleSocialPress = (url?: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  if (!spot) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Spot not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient
        colors={["#FFFFFF", "#F8FFFE", "#FFFFFF"]}
        style={styles.backgroundGradient}
      />

      <View style={styles.headerOverlay}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.actionButton, explored && styles.actionButtonActive]}
            onPress={handleExplorePress}
          >
            <CheckCircle2
              size={24}
              color={explored ? "#117A7A" : "#FFFFFF"}
              fill={explored ? "#117A7A" : "transparent"}
            />
          </TouchableOpacity>

          <Animated.View style={{ transform: [{ scale: heartScale }] }}>
            <TouchableOpacity style={styles.actionButton} onPress={handleFavoritePress}>
              <Heart
                size={24}
                color={favorite ? "#E94444" : "#FFFFFF"}
                fill={favorite ? "#E94444" : "transparent"}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageCarousel}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {spot.images.map((image, index) => (
            <Animated.View
              key={index}
              style={[
                styles.carouselImageWrapper,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <Image source={{ uri: image }} style={styles.carouselImage} />
            </Animated.View>
          ))}
        </Animated.ScrollView>

        <View style={styles.paginationContainer}>
          {spot.images.map((_, index) => {
            const inputRange = [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 20, 8],
              extrapolate: "clamp",
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.paginationDot,
                  {
                    width: dotWidth,
                    opacity,
                  },
                ]}
              />
            );
          })}
        </View>

        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.spotName}>{spot.name}</Text>

          <View style={styles.locationContainer}>
            <MapPin size={18} color="#117A7A" />
            <Text style={styles.locationText}>{spot.location}</Text>
          </View>

          <Text style={styles.description}>{spot.description}</Text>

          <View style={styles.actionsSection}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleLocationPress}
            >
              <Navigation size={20} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Get Directions</Text>
            </TouchableOpacity>
          </View>

          {(spot.contact || spot.website) && (
            <View style={styles.contactSection}>
              <Text style={styles.sectionTitle}>Contact Information</Text>

              {spot.contact && (
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() => Linking.openURL(`tel:${spot.contact}`)}
                >
                  <Phone size={20} color="#117A7A" />
                  <Text style={styles.contactText}>{spot.contact}</Text>
                </TouchableOpacity>
              )}

              {spot.website && (
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() => handleSocialPress(spot.website)}
                >
                  <Globe size={20} color="#117A7A" />
                  <Text style={styles.contactText}>Visit Website</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {spot.socialMedia && (
            <View style={styles.socialSection}>
              <Text style={styles.sectionTitle}>Connect With Us</Text>

              <View style={styles.socialButtons}>
                {spot.socialMedia.facebook && (
                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: "#1877F2" }]}
                    onPress={() => handleSocialPress(spot.socialMedia?.facebook)}
                  >
                    <Facebook size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                )}

                {spot.socialMedia.instagram && (
                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: "#E4405F" }]}
                    onPress={() => handleSocialPress(spot.socialMedia?.instagram)}
                  >
                    <Instagram size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                )}

                {spot.socialMedia.twitter && (
                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: "#1DA1F2" }]}
                    onPress={() => handleSocialPress(spot.socialMedia?.twitter)}
                  >
                    <Twitter size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
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
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 54,
    zIndex: 10,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonActive: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
  },
  imageCarousel: {
    height: 380,
  },
  carouselImageWrapper: {
    width: SCREEN_WIDTH,
    height: 380,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    height: 24,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#117A7A",
    marginHorizontal: 4,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  spotName: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: "#1A1A1A",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "500" as const,
    color: "#117A7A",
  },
  description: {
    fontSize: 16,
    fontWeight: "400" as const,
    color: "#4A4A4A",
    lineHeight: 26,
    marginBottom: 28,
  },
  actionsSection: {
    marginBottom: 28,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#117A7A",
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: "#117A7A",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  contactSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#F0F8F8",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#117A7A",
  },
  socialSection: {
    marginBottom: 28,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 16,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  errorText: {
    fontSize: 18,
    color: "#666666",
    textAlign: "center",
  },
});
