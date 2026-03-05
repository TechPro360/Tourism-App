import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Heart, MapPin, Trash2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAppContext } from "@/contexts/AppContext";
import { touristSpots } from "@/constants/touristSpots";
import { resolveImageSource } from "@/utils/imageHelper";

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { favorites, toggleFavorite } = useAppContext();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const favoriteSpots = touristSpots.filter((spot) =>
    favorites.includes(spot.id)
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [fadeAnim]);

  const handleRemoveFavorite = (spotId: string) => {
    toggleFavorite(spotId);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={["#FFFFFF", "#F8FFFE", "#FFFFFF"]}
        style={styles.backgroundGradient}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerSubtitle}>
          {favoriteSpots.length} saved {favoriteSpots.length === 1 ? "place" : "places"}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {favoriteSpots.length === 0 ? (
          <Animated.View
            style={[
              styles.emptyContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Heart size={64} color="#D0D0D0" />
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptyText}>
              Start exploring and save your favorite places by tapping the heart
              icon
            </Text>
          </Animated.View>
        ) : (
          <View style={styles.cardsContainer}>
            {favoriteSpots.map((spot, index) => (
              <Animated.View
                key={spot.id}
                style={[
                  styles.cardWrapper,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.card}
                  activeOpacity={0.9}
                  onPress={() => router.push(`/spot/${spot.id}` as any)}
                >
                  <Image source={resolveImageSource(spot.image)} style={styles.cardImage} />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.8)"]}
                    style={styles.cardGradient}
                  >
                    <View style={styles.cardContent}>
                      <View style={styles.cardInfo}>
                        <Text style={styles.cardName} numberOfLines={2}>
                          {spot.name}
                        </Text>
                        <View style={styles.locationRow}>
                          <MapPin size={14} color="#FFFFFF" />
                          <Text style={styles.cardLocation} numberOfLines={1}>
                            {spot.location}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </LinearGradient>

                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleRemoveFavorite(spot.id);
                    }}
                  >
                    <Trash2 size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        )}
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
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "#666666",
    marginTop: 20,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#999999",
    textAlign: "center",
    lineHeight: 24,
  },
  cardsContainer: {
    gap: 16,
  },
  cardWrapper: {
    borderRadius: 20,
    overflow: "hidden",
  },
  card: {
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#F0F0F0",
    boxShadow: "0px 4px 12px rgba(17, 122, 122, 0.15)",
    elevation: 6,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "60%",
    justifyContent: "flex-end",
    padding: 20,
  },
  cardContent: {
    gap: 8,
  },
  cardInfo: {
    gap: 6,
  },
  cardName: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cardLocation: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  removeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(233, 68, 68, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)",
    elevation: 5,
  },
});
