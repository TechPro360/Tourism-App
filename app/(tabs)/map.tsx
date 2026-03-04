import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MapPin, Search, Filter } from "lucide-react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { touristSpots } from "@/constants/touristSpots";

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const filteredSpots = touristSpots.filter((spot) => {
    const matchesSearch =
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={["#FFFFFF", "#F8FFFE", "#FFFFFF"]}
        style={styles.backgroundGradient}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Map</Text>
        <Text style={styles.headerSubtitle}>
          {filteredSpots.length} {filteredSpots.length === 1 ? "destination" : "destinations"}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Search color="#117A7A" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations..."
          placeholderTextColor="#999999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {filteredSpots.length === 0 ? (
          <Animated.View
            style={[
              styles.emptyContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Filter size={64} color="#D0D0D0" />
            <Text style={styles.emptyTitle}>No Results Found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your search or filter criteria
            </Text>
          </Animated.View>
        ) : (
          <View style={styles.spotsContainer}>
            {filteredSpots.map((spot, index) => (
              <Animated.View
                key={spot.id}
                style={[
                  styles.spotCard,
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
                  style={styles.spotCardTouchable}
                  activeOpacity={0.9}
                  onPress={() => router.push(`/spot/${spot.id}` as any)}
                >
                  <Image source={{ uri: spot.image }} style={styles.spotImage} />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.8)"]}
                    style={styles.spotGradient}
                  >
                    <View style={styles.spotContent}>
                      <Text style={styles.spotName} numberOfLines={2}>
                        {spot.name}
                      </Text>
                      <View style={styles.locationRow}>
                        <MapPin size={14} color="#FFFFFF" />
                        <Text style={styles.spotLocation} numberOfLines={1}>
                          {spot.location}
                        </Text>
                      </View>
                      <Text style={styles.spotDescription} numberOfLines={2}>
                        {spot.description}
                      </Text>
                    </View>
                  </LinearGradient>
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
    paddingBottom: 12,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F8F8",
    marginHorizontal: 24,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(17, 122, 122, 0.1)",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#1A1A1A",
    fontWeight: "500" as const,
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
  spotsContainer: {
    gap: 16,
  },
  spotCard: {
    borderRadius: 20,
    overflow: "hidden",
  },
  spotCardTouchable: {
    height: 280,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#F0F0F0",
    shadowColor: "#117A7A",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  spotImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  spotGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "65%",
    justifyContent: "flex-end",
    padding: 20,
  },
  spotContent: {
    gap: 8,
  },
  spotName: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  spotLocation: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  spotDescription: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: "#FFFFFF",
    opacity: 0.85,
    lineHeight: 20,
  },
});
