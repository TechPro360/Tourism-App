import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MapPin, Search, Building2, Landmark, ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { municipalities } from "@/constants/municipalities";
import { resolveImageSource } from "@/utils/imageHelper";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 64) / 2;

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "city" | "municipality">("all");
  const cardAnims = useRef(municipalities.map(() => new Animated.Value(0))).current;

  const HEADER_HEIGHT = 110;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT, 0],
    extrapolate: "clamp",
  });
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT * 0.6],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: Platform.OS !== 'web',
    }).start();

    const staggerAnims = cardAnims.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        delay: index * 40,
        useNativeDriver: Platform.OS !== 'web',
      })
    );
    Animated.stagger(40, staggerAnims).start();
  }, [fadeAnim, cardAnims]);

  const filteredMunicipalities = municipalities.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || m.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const cities = municipalities.filter((m) => m.type === "city");
  const muns = municipalities.filter((m) => m.type === "municipality");

  const handleCityPress = useCallback((cityId: string) => {
    router.push(`/city/${cityId}` as any);
  }, [router]);

  const filterButtons = [
    { key: "all" as const, label: "All", count: municipalities.length },
    { key: "city" as const, label: "Cities", count: cities.length },
    { key: "municipality" as const, label: "Municipalities", count: muns.length },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={["#F0F7F4", "#FFFFFF", "#F5FAF8"]}
        style={styles.backgroundGradient}
      />

      <Animated.View
        style={[
          styles.header,
          {
            opacity: Animated.multiply(fadeAnim, headerOpacity),
            height: headerHeight,
            overflow: "hidden" as const,
          },
        ]}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Explore</Text>
            <Text style={styles.headerAccent}>Nueva Ecija</Text>
          </View>
          <View style={styles.headerBadge}>
            <MapPin size={16} color="#FFFFFF" />
            <Text style={styles.headerBadgeText}>{municipalities.length}</Text>
          </View>
        </View>
        <Text style={styles.headerSubtitle}>
          Select a city or municipality to discover places
        </Text>
      </Animated.View>

      <Animated.View style={[styles.searchContainer, { opacity: fadeAnim }]}>
        <Search color="#117A7A" size={18} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search city or municipality..."
          placeholderTextColor="#9CBCBC"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </Animated.View>

      <Animated.View style={[styles.filterRow, { opacity: fadeAnim }]}>
        {filterButtons.map((btn) => (
          <TouchableOpacity
            key={btn.key}
            style={[
              styles.filterButton,
              activeFilter === btn.key && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter(btn.key)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterButtonText,
                activeFilter === btn.key && styles.filterButtonTextActive,
              ]}
            >
              {btn.label}
            </Text>
            <View
              style={[
                styles.filterCount,
                activeFilter === btn.key && styles.filterCountActive,
              ]}
            >
              <Text
                style={[
                  styles.filterCountText,
                  activeFilter === btn.key && styles.filterCountTextActive,
                ]}
              >
                {btn.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {filteredMunicipalities.length === 0 ? (
          <Animated.View style={[styles.emptyContainer, { opacity: fadeAnim }]}>
            <MapPin size={56} color="#C8DEDE" />
            <Text style={styles.emptyTitle}>No Results Found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your search or filter
            </Text>
          </Animated.View>
        ) : (
          <View style={styles.cardsGrid}>
            {filteredMunicipalities.map((municipality, index) => {
              const animValue = cardAnims[municipalities.indexOf(municipality)] || fadeAnim;
              return (
                <Animated.View
                  key={municipality.id}
                  style={[
                    styles.cardWrapper,
                    {
                      opacity: animValue,
                      transform: [
                        {
                          translateY: animValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [30, 0],
                          }),
                        },
                        {
                          scale: animValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.95, 1],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.85}
                    onPress={() => handleCityPress(municipality.id)}
                    testID={`municipality-card-${municipality.id}`}
                  >
                    <Image
                      source={resolveImageSource(municipality.image)}
                      style={styles.cardImage}
                    />
                    <LinearGradient
                      colors={["transparent", "rgba(0,0,0,0.7)"]}
                      style={styles.cardGradient}
                    />
                    <View style={styles.cardTypeBadge}>
                      {municipality.type === "city" ? (
                        <Building2 size={10} color="#117A7A" />
                      ) : (
                        <Landmark size={10} color="#117A7A" />
                      )}
                      <Text style={styles.cardTypeText}>
                        {municipality.type === "city" ? "City" : "Municipality"}
                      </Text>
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.cardName} numberOfLines={2}>
                        {municipality.name}
                      </Text>
                      <View style={styles.cardFooter}>
                        <View style={styles.placesCount}>
                          <MapPin size={10} color="#FFFFFF" />
                          <Text style={styles.placesCountText}>
                            {municipality.places.length} {municipality.places.length === 1 ? "place" : "places"}
                          </Text>
                        </View>
                        <ChevronRight size={14} color="rgba(255,255,255,0.7)" />
                      </View>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F7F4",
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
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "300" as const,
    color: "#2D2D2D",
    letterSpacing: 0.5,
  },
  headerAccent: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: "#117A7A",
    letterSpacing: 0.3,
    marginTop: -2,
  },
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#117A7A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },
  headerBadgeText: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: "#7A9E9E",
    marginTop: 6,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 12,
    gap: 10,
    boxShadow: "0px 2px 8px rgba(17, 122, 122, 0.06)",
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#1A1A1A",
    fontWeight: "400" as const,
  },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    gap: 6,
    borderWidth: 1,
    borderColor: "#E0EDED",
  },
  filterButtonActive: {
    backgroundColor: "#117A7A",
    borderColor: "#117A7A",
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: "#5A7A7A",
  },
  filterButtonTextActive: {
    color: "#FFFFFF",
  },
  filterCount: {
    backgroundColor: "#E8F4F4",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  filterCountActive: {
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  filterCountText: {
    fontSize: 11,
    fontWeight: "700" as const,
    color: "#117A7A",
  },
  filterCountTextActive: {
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#5A7A7A",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#9CBCBC",
    textAlign: "center",
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  cardWrapper: {
    width: CARD_WIDTH,
  },
  card: {
    height: 190,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#E0EDED",
    boxShadow: "0px 4px 10px rgba(10, 90, 90, 0.1)",
    elevation: 4,
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
    height: "70%",
  },
  cardTypeBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  cardTypeText: {
    fontSize: 10,
    fontWeight: "700" as const,
    color: "#117A7A",
    textTransform: "uppercase" as const,
    letterSpacing: 0.3,
  },
  cardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  cardName: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    lineHeight: 18,
    marginBottom: 6,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placesCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  placesCountText: {
    fontSize: 11,
    fontWeight: "500" as const,
    color: "rgba(255,255,255,0.85)",
  },
});
