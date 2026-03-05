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
import { ArrowLeft, CheckCircle2, MapPin } from "lucide-react-native";
import { useRouter, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAppContext } from "@/contexts/AppContext";
import { touristSpots } from "@/constants/touristSpots";
import { resolveImageSource } from "@/utils/imageHelper";

export default function ExploredPlacesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { exploredSpots, toggleExplored } = useAppContext();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const exploredSpotsList = touristSpots.filter((spot) =>
    exploredSpots.includes(spot.id)
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [fadeAnim]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient
        colors={["#FFFFFF", "#F8FFFE", "#FFFFFF"]}
        style={styles.backgroundGradient}
      />

      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color="#117A7A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Places Explored</Text>
        <View style={styles.headerRight}>
          <Text style={styles.countText}>{exploredSpotsList.length}</Text>
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
        {exploredSpotsList.length === 0 ? (
          <Animated.View style={[styles.emptyContainer, { opacity: fadeAnim }]}>
            <CheckCircle2 size={64} color="#D0D0D0" />
            <Text style={styles.emptyTitle}>No Places Explored Yet</Text>
            <Text style={styles.emptyText}>
              Start visiting places and mark them as explored
            </Text>
          </Animated.View>
        ) : (
          <View style={styles.cardsContainer}>
            {exploredSpotsList.map((spot) => (
              <Animated.View
                key={spot.id}
                style={[styles.cardWrapper, { opacity: fadeAnim }]}
              >
                <TouchableOpacity
                  style={styles.card}
                  activeOpacity={0.9}
                  onPress={() => router.push(`/spot/${spot.id}` as any)}
                >
                  <Image
                    source={resolveImageSource(spot.image)}
                    style={styles.cardImage}
                  />
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
                    style={styles.exploredBadge}
                    onPress={(e) => {
                      e.stopPropagation();
                      toggleExplored(spot.id);
                    }}
                    activeOpacity={0.7}
                  >
                    <CheckCircle2 size={20} color="#FFFFFF" />
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
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 14,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E8F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    letterSpacing: 0.3,
  },
  headerRight: {
    backgroundColor: "#E8F6F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  countText: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: "#117A7A",
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
  exploredBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(17, 122, 122, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)",
    elevation: 5,
  },
});
