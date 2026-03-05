import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  Heart,
  Navigation,
  ChevronRight,
} from "lucide-react-native";
import { useAppContext } from "@/contexts/AppContext";
import { resolveImageSource } from "@/utils/imageHelper";
import { categoryData, CategoryItemData } from "@/constants/categoryItems";
import ActionToast from "@/components/ActionToast";

export default function CategoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const { toggleFavorite, isFavorite } = useAppContext();

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIcon, setToastIcon] = useState<React.ReactNode>(null);

  const showToast = useCallback((icon: React.ReactNode, message: string) => {
    setToastIcon(icon);
    setToastMessage(message);
    setToastVisible(true);
  }, []);

  const category = categoryData[id as string];

  const HERO_MAX = 220;
  const HERO_MIN = insets.top + 56;

  const heroHeight = scrollY.interpolate({
    inputRange: [0, HERO_MAX - HERO_MIN],
    outputRange: [HERO_MAX, HERO_MIN],
    extrapolate: "clamp",
  });

  const heroContentOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const compactTitleOpacity = scrollY.interpolate({
    inputRange: [60, 140],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const heroBgOpacity = scrollY.interpolate({
    inputRange: [0, HERO_MAX - HERO_MIN],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const headerWhiteBgOpacity = scrollY.interpolate({
    inputRange: [(HERO_MAX - HERO_MIN) * 0.5, HERO_MAX - HERO_MIN],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
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
  }, [fadeAnim, contentAnim]);

  if (!category) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.errorText}>Category not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, animation: "slide_from_right" }} />

      <Animated.View style={[styles.heroContainer, { opacity: fadeAnim, height: heroHeight }]}>
        <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: heroBgOpacity }]}>
          <LinearGradient
            colors={[category.color, category.color + "CC", category.color + "88"]}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>

        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.heroWhiteBg,
            { opacity: headerWhiteBgOpacity },
          ]}
        />

        <View style={[styles.headerOverlay, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Animated.Text
            style={[
              styles.compactTitle,
              { opacity: compactTitleOpacity },
            ]}
            numberOfLines={1}
          >
            {category.title}
          </Animated.Text>
          <View style={{ width: 42 }} />
        </View>

        <Animated.View
          style={[
            styles.heroContent,
            {
              opacity: Animated.multiply(fadeAnim, heroContentOpacity),
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.heroTitle}>{category.title}</Text>
          <Text style={styles.heroDescription} numberOfLines={2}>
            {category.description}
          </Text>
          <View style={styles.heroStats}>
            <View style={styles.statItem}>
              <Text style={styles.statText}>
                {category.items.length} {category.items.length === 1 ? "Place" : "Places"}
              </Text>
            </View>
          </View>
        </Animated.View>
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
            Discover the best {category.title.toLowerCase()} in Nueva Ecija
          </Text>
        </Animated.View>

        {category.items.map((item, index) => (
          <CategoryCard
            key={item.id}
            item={item}
            index={index}
            contentAnim={contentAnim}
            categoryColor={category.color}
            categoryTitle={category.title}
            isFav={isFavorite(item.id)}
            onPress={() => router.push(`/spot/${item.id}` as any)}
            onFavorite={() => {
              const willBeFav = !isFavorite(item.id);
              toggleFavorite(item.id);
              showToast(
                <Heart size={28} color="#FFFFFF" fill={willBeFav ? "#E94444" : "transparent"} />,
                willBeFav ? "Added to Favorites" : "Removed from Favorites"
              );
            }}
          />
        ))}

        {category.items.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No destinations found in this category yet
            </Text>
          </View>
        )}
      </Animated.ScrollView>

      <ActionToast
        visible={toastVisible}
        icon={toastIcon}
        message={toastMessage}
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
}

interface CategoryCardProps {
  item: CategoryItemData;
  index: number;
  contentAnim: Animated.Value;
  categoryColor: string;
  categoryTitle: string;
  isFav: boolean;
  onPress: () => void;
  onFavorite: () => void;
}

function CategoryCard({
  item,
  index,
  contentAnim,
  categoryColor,
  categoryTitle,
  isFav,
  onPress,
  onFavorite,
}: CategoryCardProps) {
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
        testID={`category-card-${item.id}`}
      >
        <Image source={resolveImageSource(item.image)} style={styles.placeImage} />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.75)"]}
          style={styles.placeImageGradient}
        />

        <Animated.View style={[styles.favoriteButton, { transform: [{ scale: heartScale }] }]}>
          <TouchableOpacity
            onPress={handleFav}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Heart
              size={20}
              color={isFav ? "#E94444" : "#FFFFFF"}
              fill={isFav ? "#E94444" : "transparent"}
            />
          </TouchableOpacity>
        </Animated.View>

        <View style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
          <Text style={styles.categoryText}>{categoryTitle}</Text>
        </View>

        <View style={styles.placeInfo}>
          <Text style={styles.placeName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.placeDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.placeFooter}>
            <View style={styles.placeLocationRow}>
              <Navigation size={12} color="rgba(255,255,255,0.7)" />
              <Text style={styles.placeLocationText}>{item.location}</Text>
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
    overflow: "hidden",
  },
  heroWhiteBg: {
    backgroundColor: "#F0F7F4",
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
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  compactTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    textAlign: "center",
    marginHorizontal: 12,
  },
  heroContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
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
  emptyContainer: {
    paddingVertical: 60,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999999",
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#666666",
    textAlign: "center",
    marginTop: 40,
  },
});
