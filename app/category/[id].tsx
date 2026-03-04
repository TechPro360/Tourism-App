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
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, MapPin } from "lucide-react-native";
import { touristSpots } from "@/constants/touristSpots";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const COLUMN_WIDTH = (SCREEN_WIDTH - 48) / 2;

interface CategoryInfo {
  title: string;
  color: string;
  accentColor: string;
  description: string;
}

const categoryData: Record<string, CategoryInfo> = {
  adventure: {
    title: "Adventure",
    color: "#E94444",
    accentColor: "rgba(233, 68, 68, 0.15)",
    description: "Embark on thrilling adventures and explore nature's wonders",
  },
  faith: {
    title: "Faith",
    color: "#5FA8D3",
    accentColor: "rgba(95, 168, 211, 0.15)",
    description: "Discover sacred places and spiritual journeys",
  },
  food: {
    title: "Food",
    color: "#A94064",
    accentColor: "rgba(169, 64, 100, 0.15)",
    description: "Savor the flavors of Nueva Ecija's culinary treasures",
  },
  fun: {
    title: "Fun",
    color: "#C8D647",
    accentColor: "rgba(200, 214, 71, 0.15)",
    description: "Experience joy and entertainment for the whole family",
  },
  learning: {
    title: "Learning",
    color: "#EE7644",
    accentColor: "rgba(238, 118, 68, 0.15)",
    description: "Expand your knowledge and explore cultural heritage",
  },
};

export default function CategoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const category = categoryData[id as string];
  const spots = touristSpots.filter((spot) => spot.category === id);

  const [imageHeights, setImageHeights] = useState<Record<string, number>>({});

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    spots.forEach((spot) => {
      spot.images.forEach((imageUrl, index) => {
        Image.getSize(imageUrl, (width, height) => {
          const aspectRatio = height / width;
          const calculatedHeight = COLUMN_WIDTH * aspectRatio;
          setImageHeights((prev) => ({
            ...prev,
            [`${spot.id}-${index}`]: calculatedHeight,
          }));
        });
      });
    });
  }, [fadeAnim, id]);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const renderMasonryColumn = (columnSpots: typeof spots, columnIndex: number) => {
    return (
      <View style={styles.masonryColumn}>
        {columnSpots.map((spot, spotIndex) => {
          const imageIndex = columnIndex;
          const imageUrl = spot.images[imageIndex] || spot.images[0];
          const height = imageHeights[`${spot.id}-${imageIndex}`] || 200;

          return (
            <Animated.View
              key={`${spot.id}-${columnIndex}`}
              style={[
                styles.imageCard,
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
                activeOpacity={0.9}
                onPress={() => router.push(`/spot/${spot.id}` as any)}
                style={[styles.imageWrapper, { height }]}
              >
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.imageGradient}
                >
                  <View style={styles.imageInfo}>
                    <Text style={styles.imageName} numberOfLines={2}>
                      {spot.name}
                    </Text>
                    <View style={styles.locationRow}>
                      <MapPin size={14} color="#FFFFFF" />
                      <Text style={styles.imageLocation} numberOfLines={1}>
                        {spot.location}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    );
  };

  if (!category) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Category not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <LinearGradient
        colors={["#FFFFFF", category.accentColor, "#FFFFFF"]}
        style={styles.backgroundGradient}
      />

      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: category.color }]}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerOpacity,
            },
          ]}
        >
          <Text style={[styles.headerTitle, { color: category.color }]}>
            {category.title}
          </Text>
          <Text style={styles.headerDescription}>{category.description}</Text>
          <View
            style={[styles.divider, { backgroundColor: category.color }]}
          />
        </Animated.View>

        <View style={styles.masonryContainer}>
          {[0, 1].map((columnIndex) => {
            const columnSpots = spots.filter(
              (_, index) => index % 2 === columnIndex
            );
            return (
              <View key={columnIndex}>
                {renderMasonryColumn(columnSpots, columnIndex)}
              </View>
            );
          })}
        </View>

        {spots.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No destinations found in this category yet
            </Text>
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
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  header: {
    paddingHorizontal: 8,
    paddingVertical: 20,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: "800" as const,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  headerDescription: {
    fontSize: 16,
    fontWeight: "500" as const,
    color: "#666666",
    lineHeight: 24,
    marginBottom: 16,
  },
  divider: {
    height: 4,
    width: 60,
    borderRadius: 2,
  },
  masonryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  masonryColumn: {
    flex: 1,
    paddingHorizontal: 4,
  },
  imageCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
  imageWrapper: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#F0F0F0",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "60%",
    justifyContent: "flex-end",
    padding: 12,
  },
  imageInfo: {
    gap: 4,
  },
  imageName: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  imageLocation: {
    fontSize: 12,
    fontWeight: "500" as const,
    color: "#FFFFFF",
    opacity: 0.9,
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
  },
});
