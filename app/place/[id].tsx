import React, { useEffect, useRef, useCallback } from "react";
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
  Share,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  ChevronRight,
  Share2,
} from "lucide-react-native";
import { municipalities } from "@/constants/municipalities";
import { useAppContext } from "@/contexts/AppContext";
import { resolveImageSource } from "@/utils/imageHelper";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function PlaceDetailScreen() {
  const { id, cityId } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  const { toggleFavorite, isFavorite } = useAppContext();

  const municipality = municipalities.find((m) => m.id === cityId);
  const place = municipality?.places.find((p) => p.id === id);

  const favorite = isFavorite(id as string);

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

  const handleFavoritePress = useCallback(() => {
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
  }, [heartScale, toggleFavorite, id]);

  const handleLocationPress = useCallback(() => {
    if (!place) return;
    const url = Platform.select({
      ios: `maps:${place.coordinates.latitude},${place.coordinates.longitude}`,
      android: `geo:${place.coordinates.latitude},${place.coordinates.longitude}`,
      default: `https://www.google.com/maps/search/?api=1&query=${place.coordinates.latitude},${place.coordinates.longitude}`,
    });
    if (url) Linking.openURL(url);
  }, [place]);

  const handleSocialPress = useCallback((url?: string) => {
    if (url) Linking.openURL(url);
  }, []);

  const handleSharePress = useCallback(async () => {
    if (!place || !municipality) return;
    try {
      await Share.share({
        title: place.name,
        message: `Check out ${place.name} in ${municipality.name}, Nueva Ecija! A must-visit destination.${place.website ? `\n\n${place.website}` : ''}`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  }, [place, municipality]);

  if (!place || !municipality) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.errorContainer}>
          <MapPin size={48} color="#C8DEDE" />
          <Text style={styles.errorText}>Place not found</Text>
          <TouchableOpacity style={styles.errorButton} onPress={() => router.back()}>
            <Text style={styles.errorButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const categoryColors: Record<string, string> = {
    adventure: "#2E86AB",
    faith: "#A23B72",
    food: "#E8890C",
    fun: "#F18F01",
    learning: "#5C946E",
    historical: "#8B6914",
    agritourism: "#3A7D44",
  };
  const categoryColor = categoryColors[place.category] || "#117A7A";

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.headerOverlay, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleSharePress}
            activeOpacity={0.7}
          >
            <Share2 size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <Animated.View style={{ transform: [{ scale: heartScale }] }}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleFavoritePress}
              activeOpacity={0.7}
            >
              <Heart
                size={22}
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
          { paddingBottom: insets.bottom + 40 },
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
          {place.images.map((image, index) => (
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
              <Image source={resolveImageSource(image)} style={styles.carouselImage} />
            </Animated.View>
          ))}
        </Animated.ScrollView>

        <View style={styles.paginationContainer}>
          {place.images.map((_, index) => {
            const inputRange = [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH,
            ];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 22, 8],
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
                style={[styles.paginationDot, { width: dotWidth, opacity }]}
              />
            );
          })}
        </View>

        <Animated.View
          style={[styles.contentContainer, { opacity: fadeAnim }]}
        >
          <View style={[styles.categoryTag, { backgroundColor: categoryColor }]}>
            <Text style={styles.categoryTagText}>
              {place.category.charAt(0).toUpperCase() + place.category.slice(1)}
            </Text>
          </View>

          <Text style={styles.placeName}>{place.name}</Text>

          <TouchableOpacity
            style={styles.locationContainer}
            onPress={handleLocationPress}
            activeOpacity={0.7}
          >
            <MapPin size={16} color="#117A7A" />
            <Text style={styles.locationText}>{municipality.name}, Nueva Ecija</Text>
            <ChevronRight size={14} color="#117A7A" />
          </TouchableOpacity>

          <Text style={styles.description}>{place.description}</Text>

          <TouchableOpacity
            style={styles.directionsButton}
            onPress={handleLocationPress}
            activeOpacity={0.8}
          >
            <Navigation size={18} color="#FFFFFF" />
            <Text style={styles.directionsButtonText}>Get Directions</Text>
          </TouchableOpacity>

          {(place.contact || place.website) && (
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              {place.contact && (
                <TouchableOpacity
                  style={styles.infoRow}
                  onPress={() => Linking.openURL(`tel:${place.contact}`)}
                  activeOpacity={0.7}
                >
                  <View style={styles.infoIconBox}>
                    <Phone size={18} color="#117A7A" />
                  </View>
                  <Text style={styles.infoText}>{place.contact}</Text>
                </TouchableOpacity>
              )}
              {place.website && (
                <TouchableOpacity
                  style={styles.infoRow}
                  onPress={() => handleSocialPress(place.website)}
                  activeOpacity={0.7}
                >
                  <View style={styles.infoIconBox}>
                    <Globe size={18} color="#117A7A" />
                  </View>
                  <Text style={styles.infoText}>Visit Website</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {place.socialMedia && (
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Connect</Text>
              <View style={styles.socialRow}>
                {place.socialMedia.facebook && (
                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: "#1877F2" }]}
                    onPress={() => handleSocialPress(place.socialMedia?.facebook)}
                    activeOpacity={0.8}
                  >
                    <Facebook size={22} color="#FFFFFF" />
                  </TouchableOpacity>
                )}
                {place.socialMedia.instagram && (
                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: "#E4405F" }]}
                    onPress={() => handleSocialPress(place.socialMedia?.instagram)}
                    activeOpacity={0.8}
                  >
                    <Instagram size={22} color="#FFFFFF" />
                  </TouchableOpacity>
                )}
                {place.socialMedia.twitter && (
                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: "#1DA1F2" }]}
                    onPress={() => handleSocialPress(place.socialMedia?.twitter)}
                    activeOpacity={0.8}
                  >
                    <Twitter size={22} color="#FFFFFF" />
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
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerActions: {
    flexDirection: "row" as const,
    gap: 10,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
  },
  imageCarousel: {
    height: 360,
  },
  carouselImageWrapper: {
    width: SCREEN_WIDTH,
    height: 360,
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
    paddingVertical: 14,
    height: 28,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#117A7A",
    marginHorizontal: 3,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 4,
  },
  categoryTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 12,
  },
  categoryTagText: {
    fontSize: 11,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  },
  placeName: {
    fontSize: 28,
    fontWeight: "800" as const,
    color: "#1A1A1A",
    marginBottom: 10,
    letterSpacing: 0.2,
    lineHeight: 34,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
    backgroundColor: "#F0F8F8",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  locationText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#117A7A",
  },
  description: {
    fontSize: 16,
    fontWeight: "400" as const,
    color: "#4A4A4A",
    lineHeight: 26,
    marginBottom: 24,
  },
  directionsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#117A7A",
    paddingVertical: 15,
    borderRadius: 14,
    marginBottom: 28,
    shadowColor: "#117A7A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  directionsButtonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#F5FAF8",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 10,
  },
  infoIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E8F4F4",
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: "#117A7A",
  },
  socialRow: {
    flexDirection: "row",
    gap: 14,
  },
  socialButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 18,
    color: "#7A9E9E",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  errorButton: {
    backgroundColor: "#117A7A",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  errorButtonText: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: "#FFFFFF",
  },
});
