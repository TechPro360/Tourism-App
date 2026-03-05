import React, { useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  MapPin,
  Heart,
  ChevronRight,
  Building2,
  Landmark,
  Navigation,
} from "lucide-react-native";
import { municipalities, Place } from "@/constants/municipalities";
import { useAppContext } from "@/contexts/AppContext";
import { resolveImageSource } from "@/utils/imageHelper";

export default function CityPlacesScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const headerAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;

  const { toggleFavorite, isFavorite } = useAppContext();

  const municipality = municipalities.find((m) => m.id === id);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [headerAnim, contentAnim]);

  const handlePlacePress = useCallback(
    (placeId: string) => {
      router.push(`/place/${placeId}?cityId=${id}` as any);
    },
    [router, id]
  );

  const handleFavoritePress = useCallback(
    (placeId: string) => {
      toggleFavorite(placeId);
    },
    [toggleFavorite]
  );

  if (!municipality) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.errorText}>Municipality not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Animated.View style={[styles.heroContainer, { opacity: headerAnim, marginTop: insets.top }]}>
        <Image
          source={resolveImageSource(municipality.image)}
          style={styles.heroImage}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.4)", "transparent", "rgba(0,0,0,0.65)"]}
          locations={[0, 0.4, 1]}
          style={styles.heroGradient}
        />

        <View style={[styles.headerOverlay, { paddingTop: 8 }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            styles.heroContent,
            {
              opacity: headerAnim,
              transform: [
                {
                  translateY: headerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.typeBadge}>
            {municipality.type === "city" ? (
              <Building2 size={12} color="#117A7A" />
            ) : (
              <Landmark size={12} color="#117A7A" />
            )}
            <Text style={styles.typeBadgeText}>
              {municipality.type === "city" ? "City" : "Municipality"}
            </Text>
          </View>
          <Text style={styles.heroTitle}>{municipality.name}</Text>
          <Text style={styles.heroDescription} numberOfLines={2}>
            {municipality.description}
          </Text>
          <View style={styles.heroStats}>
            <View style={styles.statItem}>
              <MapPin size={14} color="rgba(255,255,255,0.8)" />
              <Text style={styles.statText}>
                {municipality.places.length}{" "}
                {municipality.places.length === 1 ? "Place" : "Places"} to visit
              </Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.sectionHeader,
            {
              opacity: contentAnim,
              transform: [
                {
                  translateY: contentAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [15, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Places to Visit</Text>
          <Text style={styles.sectionSubtitle}>
            Discover what {municipality.name} has to offer
          </Text>
        </Animated.View>

        {municipality.places.map((place, index) => (
          <PlaceCard
            key={place.id}
            place={place}
            index={index}
            contentAnim={contentAnim}
            isFav={isFavorite(place.id)}
            onPress={() => handlePlacePress(place.id)}
            onFavorite={() => handleFavoritePress(place.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

interface PlaceCardProps {
  place: Place;
  index: number;
  contentAnim: Animated.Value;
  isFav: boolean;
  onPress: () => void;
  onFavorite: () => void;
}

function PlaceCard({ place, index, contentAnim, isFav, onPress, onFavorite }: PlaceCardProps) {
  const heartScale = useRef(new Animated.Value(1)).current;

  const handleFav = useCallback(() => {
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
    onFavorite();
  }, [heartScale, onFavorite]);

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
    <Animated.View
      style={[
        styles.placeCard,
        {
          opacity: contentAnim,
          transform: [
            {
              translateY: contentAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20 + index * 10, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.placeCardTouchable}
        activeOpacity={0.9}
        onPress={onPress}
        testID={`place-card-${place.id}`}
      >
        <Image source={resolveImageSource(place.image)} style={styles.placeImage} />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.75)"]}
          style={styles.placeImageGradient}
        />

        <Animated.View style={[styles.favoriteButton, { transform: [{ scale: heartScale }] }]}>
          <TouchableOpacity onPress={handleFav} activeOpacity={0.7} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Heart
              size={20}
              color={isFav ? "#E94444" : "#FFFFFF"}
              fill={isFav ? "#E94444" : "transparent"}
            />
          </TouchableOpacity>
        </Animated.View>

        <View style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
          <Text style={styles.categoryText}>
            {place.category.charAt(0).toUpperCase() + place.category.slice(1)}
          </Text>
        </View>

        <View style={styles.placeInfo}>
          <Text style={styles.placeName} numberOfLines={1}>
            {place.name}
          </Text>
          <Text style={styles.placeDescription} numberOfLines={2}>
            {place.description}
          </Text>
          <View style={styles.placeFooter}>
            <View style={styles.placeLocationRow}>
              <Navigation size={12} color="rgba(255,255,255,0.7)" />
              <Text style={styles.placeLocationText}>View Details</Text>
            </View>
            <ChevronRight size={16} color="rgba(255,255,255,0.6)" />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F7F4",
  },
  heroContainer: {
    height: 260,
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heroGradient: {
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
    zIndex: 10,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  heroContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: "700" as const,
    color: "#117A7A",
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800" as const,
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  heroDescription: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 20,
    marginBottom: 8,
  },
  heroStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statText: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: "rgba(255,255,255,0.8)",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    letterSpacing: 0.2,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: "#7A9E9E",
    marginTop: 4,
  },
  placeCard: {
    marginBottom: 14,
    borderRadius: 18,
    overflow: "hidden",
  },
  placeCardTouchable: {
    height: 220,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#E0EDED",
    shadowColor: "#0A5A5A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  placeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeImageGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "65%",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  },
  placeInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  placeName: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  placeDescription: {
    fontSize: 13,
    fontWeight: "400" as const,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 18,
    marginBottom: 8,
  },
  placeFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  placeLocationText: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: "rgba(255,255,255,0.7)",
  },
  errorText: {
    fontSize: 18,
    color: "#666666",
    textAlign: "center",
    marginTop: 100,
  },
});
