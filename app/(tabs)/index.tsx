import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Heart, Navigation, ChevronRight } from "lucide-react-native";
import { useAppContext } from "@/contexts/AppContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface CategoryItem {
  id: string;
  title: string;
  icon: string;
  specialBg?: boolean;
}

const categories: CategoryItem[] = [
  { id: "hotels", title: "Hotels & Resorts", icon: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/7zxhqljwc2mhvbxntr5rk", specialBg: false },
  { id: "restaurants", title: "Restaurants & Food", icon: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/jvm67vwak3jtj22irhsvb", specialBg: false },
  { id: "pasalubong", title: "Pasalubong", icon: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/6zsvbeof7e9q9bkyh4zyp", specialBg: false },
  { id: "agri", title: "Agri-Tourism", icon: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/i3qhh2z7oinf84m7oxjru", specialBg: false },
  { id: "historical", title: "Historical Sites", icon: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/ebtjsmj7glje7qbjr3tuj", specialBg: false },
  { id: "events", title: "Events & Fiestas", icon: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/dmtl5s1wig26bswukcvru", specialBg: false },
];

interface DestinationCard {
  id: string;
  name: string;
  image: string;
  location: string;
  spotId: string;
}

const featuredDestinations: DestinationCard[] = [
  {
    id: "1",
    name: "Minalungao National Park",
    location: "General Tinio",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    spotId: "1",
  },
  {
    id: "2",
    name: "Pantabangan Lake",
    location: "Pantabangan",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    spotId: "2",
  },
  {
    id: "3",
    name: "Gabaldon Falls",
    location: "Gabaldon",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
    spotId: "3",
  },
  {
    id: "4",
    name: "Dupinga River",
    location: "Carranglan",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    spotId: "8",
  },
  {
    id: "5",
    name: "Cabu Bridge",
    location: "San Antonio",
    image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800",
    spotId: "9",
  },
];

interface CategoryButtonProps {
  category: CategoryItem;
  index: number;
  categoryAnimations: {
    scale: Animated.Value;
    opacity: Animated.Value;
  }[];
}

const CategoryButton = React.memo(function CategoryButton({ category, index, categoryAnimations }: CategoryButtonProps) {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const router = useRouter();

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [scaleValue]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [scaleValue]);

  return (
    <Animated.View
      style={[
        styles.categoryButtonWrapper,
        index % 3 !== 2 && styles.categoryButtonMargin,
        {
          opacity: categoryAnimations[index].opacity,
          transform: [
            { scale: Animated.multiply(categoryAnimations[index].scale, scaleValue) },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.categoryButton}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => router.push(`/categories/${category.id}` as any)}
        activeOpacity={1}
      >
        <View
          style={[
            styles.categoryIconContainer,
            category.specialBg && styles.categoryIconWhiteBg,
          ]}
        >
          <Image
            source={{ uri: category.icon }}
            style={styles.categoryIcon}
            tintColor={category.specialBg ? undefined : "#117A7A"}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.categoryText}>{category.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

interface DestinationCardComponentProps {
  dest: DestinationCard;
  index: number;
  scrollX: Animated.Value;
  fadeAnim: Animated.Value;
}

const DestinationCardComponent = React.memo(function DestinationCardComponent({
  dest,
  index,
  scrollX,
  fadeAnim,
}: DestinationCardComponentProps) {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useAppContext();
  const favorite = isFavorite(dest.spotId);
  const heartScale = useRef(new Animated.Value(1)).current;

  const cardWidth = SCREEN_WIDTH - 60;
  const inputRange = [
    (index - 1) * cardWidth,
    index * cardWidth,
    (index + 1) * cardWidth,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.92, 1, 0.92],
    extrapolate: "clamp",
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.6, 1, 0.6],
    extrapolate: "clamp",
  });

  const handleFavorite = useCallback(() => {
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
    toggleFavorite(dest.spotId);
  }, [heartScale, toggleFavorite, dest.spotId]);

  return (
    <Animated.View
      style={[
        styles.destinationCard,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.destinationTouchable}
        activeOpacity={0.9}
        onPress={() => router.push(`/spot/${dest.spotId}` as any)}
      >
        <Image
          source={{ uri: dest.image }}
          style={styles.destinationImage}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.75)"]}
          style={styles.destinationGradient}
        >
          <Text style={styles.destinationName} numberOfLines={1}>{dest.name}</Text>
          <View style={styles.destinationFooter}>
            <View style={styles.destinationLocationRow}>
              <Navigation size={12} color="rgba(255,255,255,0.7)" />
              <Text style={styles.destinationLocation}>{dest.location}</Text>
            </View>
            <ChevronRight size={16} color="rgba(255,255,255,0.6)" />
          </View>
        </LinearGradient>

        <Animated.View style={[styles.destFavoriteBtn, { transform: [{ scale: heartScale }] }]}>
          <TouchableOpacity
            onPress={handleFavorite}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Heart
              size={18}
              color={favorite ? "#E94444" : "#FFFFFF"}
              fill={favorite ? "#E94444" : "transparent"}
            />
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
});

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const currentIndex = useRef(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [categoryAnimations] = useState(
    categories.map(() => ({
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }))
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();

    const staggerDelay = 80;
    const animations = categoryAnimations.map((anim, index) =>
      Animated.parallel([
        Animated.spring(anim.scale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          delay: index * staggerDelay,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 400,
          delay: index * staggerDelay,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    );

    Animated.stagger(staggerDelay, animations).start();
  }, [fadeAnim, slideAnim, categoryAnimations]);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % featuredDestinations.length;
      const cardWidth = SCREEN_WIDTH - 60;
      scrollViewRef.current?.scrollTo({
        x: currentIndex.current * cardWidth,
        animated: true,
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/irbpt3hyilycqszzygzes",
        }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.1)", "rgba(255,255,255,0.95)"]}
          locations={[0, 0.3, 0.6]}
          style={styles.gradient}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Image
                source={{
                  uri: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/25dqw5o26bqtorxqav9af",
                }}
                style={styles.logo}
                resizeMode="contain"
              />
            </Animated.View>

            <View style={styles.contentContainer}>
              <Animated.Text
                style={[
                  styles.sectionTitle,
                  {
                    opacity: fadeAnim,
                  },
                ]}
              >
                Featured Destinations
              </Animated.Text>

              <Animated.ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.destinationsScroll}
                contentContainerStyle={styles.destinationsContent}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
              >
                {featuredDestinations.map((dest, index) => (
                  <DestinationCardComponent
                    key={dest.id}
                    dest={dest}
                    index={index}
                    scrollX={scrollX}
                    fadeAnim={fadeAnim}
                  />
                ))}
              </Animated.ScrollView>

              <View style={styles.paginationContainer}>
                {featuredDestinations.map((_, index) => {
                  const cardWidth = SCREEN_WIDTH - 60;
                  const inputRange = [
                    (index - 1) * cardWidth,
                    index * cardWidth,
                    (index + 1) * cardWidth,
                  ];

                  const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [8, 20, 8],
                    extrapolate: "clamp",
                  });

                  const dotOpacity = scrollX.interpolate({
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
                          opacity: dotOpacity,
                        },
                      ]}
                    />
                  );
                })}
              </View>

              <View style={styles.categoriesContainer}>
                {categories.map((category, index) => (
                  <CategoryButton
                    key={category.id}
                    category={category}
                    index={index}
                    categoryAnimations={categoryAnimations}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  backgroundImageStyle: {
    opacity: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  logo: {
    width: 280,
    height: 130,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "transparent",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 8,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    marginBottom: 12,
    letterSpacing: 0.5,
    textShadow: "0px 1px 4px rgba(0, 0, 0, 0.3)",
  },
  destinationsScroll: {
    marginBottom: 8,
  },
  destinationsContent: {
    paddingHorizontal: 0,
  },
  destinationCard: {
    width: SCREEN_WIDTH - 60,
    height: 200,
    marginHorizontal: 6,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  destinationTouchable: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E0EDED",
    borderRadius: 20,
    overflow: "hidden",
  },
  destinationImage: {
    width: "100%",
    height: "100%",
  },
  destinationGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "65%",
    justifyContent: "flex-end",
    padding: 16,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  destinationFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  destinationLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  destinationLocation: {
    fontSize: 13,
    fontWeight: "500" as const,
    color: "rgba(255,255,255,0.8)",
    letterSpacing: 0.2,
  },
  destFavoriteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 4,
    height: 8,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#117A7A",
    marginHorizontal: 4,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 4,
  },
  categoryButtonWrapper: {
    width: "31%",
    aspectRatio: 1,
    marginBottom: 12,
  },
  categoryButton: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderRadius: 18,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 3px 8px rgba(17, 122, 122, 0.12)",
    elevation: 4,
    borderWidth: 1.5,
    borderColor: "rgba(17, 122, 122, 0.1)",
  },
  categoryButtonMargin: {
    marginRight: "3.5%",
  },
  categoryIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E8F6F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryIcon: {
    width: 32,
    height: 32,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "600" as const,
    color: "#2C5F5F",
    textAlign: "center",
    lineHeight: 13,
    letterSpacing: 0.1,
  },
  categoryIconWhiteBg: {
    backgroundColor: "#FFFFFF",
  },
});
