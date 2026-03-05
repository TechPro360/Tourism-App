import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronRight, Compass, Navigation, Heart } from "lucide-react-native";
import { useRouter } from "expo-router";
import { resolveImageSource } from "@/utils/imageHelper";
import { useAppContext } from "@/contexts/AppContext";
import ActionToast from "@/components/ActionToast";


interface Tab {
  id: string;
  title: string;
  subtitle: string;
  tabIcon: string;
  headerLogo: string;
  accent: string;
  accentLight: string;
  bgGradient: [string, string];
}

interface ContentItem {
  title: string;
  description: string;
  image: string;
  spotId: string;
}

interface TabContent {
  [key: string]: ContentItem[];
}

const categoryImages = {
  adventure: require('@/assets/images/adventure.png'),
  faith: require('@/assets/images/faith.png'),
  food: require('@/assets/images/food.png'),
  fun: require('@/assets/images/fun.png'),
  learning: require('@/assets/images/learning.png'),
};

const tabs: Tab[] = [
  {
    id: "adventure",
    title: "Adventure",
    subtitle: "Never Ending",
    tabIcon: "adventure",
    headerLogo: "adventure",
    accent: "#E74C3C",
    accentLight: "#FDE8E6",
    bgGradient: ["#FFFFFF", "#FFF5F4"],
  },
  {
    id: "faith",
    title: "Faith",
    subtitle: "Never Ending",
    tabIcon: "faith",
    headerLogo: "faith",
    accent: "#3498DB",
    accentLight: "#E8F4FD",
    bgGradient: ["#FFFFFF", "#F0F7FC"],
  },
  {
    id: "food",
    title: "Food",
    subtitle: "Never Ending",
    tabIcon: "food",
    headerLogo: "food",
    accent: "#C0396B",
    accentLight: "#FCE8F0",
    bgGradient: ["#FFFFFF", "#FDF2F6"],
  },
  {
    id: "fun",
    title: "Fun",
    subtitle: "Never Ending",
    tabIcon: "fun",
    headerLogo: "fun",
    accent: "#8BAA20",
    accentLight: "#F2F6E0",
    bgGradient: ["#FFFFFF", "#F7F9EE"],
  },
  {
    id: "learning",
    title: "Learning",
    subtitle: "Never Ending",
    tabIcon: "learning",
    headerLogo: "learning",
    accent: "#E8751A",
    accentLight: "#FDF0E5",
    bgGradient: ["#FFFFFF", "#FEF5ED"],
  },
];

const tabContents: TabContent = {
  adventure: [
    {
      title: "Minalungao National Park",
      description: "Crystal-clear emerald waters surrounded by towering limestone cliffs. Experience bamboo rafting, cliff diving, and swimming in one of Nueva Ecija's most breathtaking natural wonders.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      spotId: "1",
    },
    {
      title: "Mountain Trekking & Hiking",
      description: "Conquer Mount Damas and explore various hiking trails offering panoramic views of endless rice fields and mountain ranges.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
      spotId: "8",
    },
    {
      title: "Eco-Parks & Nature Tours",
      description: "Discover hidden waterfalls, explore lush forests, and encounter diverse wildlife in Nueva Ecija's pristine ecological parks.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      spotId: "3",
    },
  ],
  faith: [
    {
      title: "Historic Churches & Cathedrals",
      description: "Visit centuries-old Spanish colonial churches that stand as testaments to the province's deep Catholic faith and enduring spiritual heritage.",
      image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800",
      spotId: "4",
    },
    {
      title: "Taong Putik Festival",
      description: "Witness the unique Taong Putik Festival in Aliaga where devotees cover themselves in mud and dried grass to honor St. John the Baptist.",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
      spotId: "10",
    },
    {
      title: "Pilgrimage Sites",
      description: "Experience spiritual renewal at various pilgrimage destinations throughout Nueva Ecija, from sacred shrines to prayer mountains.",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800",
      spotId: "11",
    },
  ],
  food: [
    {
      title: "Authentic Ilocano Cuisine",
      description: "Indulge in the rich flavors of authentic Ilocano dishes including pinakbet, bagnet, and dinengdeng passed down through generations.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800",
      spotId: "12",
    },
    {
      title: "Longganisa de Cabanatuan",
      description: "Taste the legendary Cabanatuan longganisa — sweet, garlicky, and bursting with flavor. An iconic delicacy synonymous with Nueva Ecija.",
      image: "https://images.unsplash.com/photo-1613564834361-9436948817d1?w=800",
      spotId: "5",
    },
    {
      title: "Rice-Based Delicacies",
      description: "As the Rice Granary of the Philippines, Nueva Ecija excels in creating exquisite rice-based treats from savory kakanin to sweet bibingka.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800",
      spotId: "24",
    },
  ],
  fun: [
    {
      title: "Festivals & Celebrations",
      description: "Join vibrant celebrations of Tanduyong Festival, Binalay Festival, and various town fiestas with colorful street dancing and live music.",
      image: "https://images.unsplash.com/photo-1519167758481-83f29da8c2b6?w=800",
      spotId: "6",
    },
    {
      title: "Local Markets & Shopping",
      description: "Explore bustling public markets filled with fresh produce, local handicrafts, and unique finds from morning vegetable markets to night bazaars.",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800",
      spotId: "14",
    },
    {
      title: "Parks & Recreation",
      description: "Enjoy family-friendly activities at various parks and recreation centers. From picnics in scenic spots to outdoor sports and community events.",
      image: "https://images.unsplash.com/photo-1529472119196-cb724127a98e?w=800",
      spotId: "15",
    },
  ],
  learning: [
    {
      title: "Historical Landmarks",
      description: "Discover the rich history through well-preserved landmarks. Visit the Cabanatuan American Memorial and various World War II sites.",
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800",
      spotId: "13",
    },
    {
      title: "Agricultural Heritage",
      description: "Learn about modern and traditional farming techniques in the Rice Granary of the Philippines through educational farm tours and rice museums.",
      image: "https://images.unsplash.com/photo-1536147210925-c3f1e3e67b0d?w=800",
      spotId: "7",
    },
    {
      title: "Cultural Museums & Centers",
      description: "Immerse yourself in Nueva Ecija's cultural heritage at various museums, from Ilocano traditions to contemporary art galleries.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      spotId: "7",
    },
  ],
};

const LOGO_HEIGHT = 126;

export default function CenterScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("adventure");
  const { toggleFavorite, isFavorite } = useAppContext();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIcon, setToastIcon] = useState<React.ReactNode>(null);

  const showToast = useCallback((icon: React.ReactNode, message: string) => {
    setToastIcon(icon);
    setToastMessage(message);
    setToastVisible(true);
  }, []);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const logoFade = useRef(new Animated.Value(1)).current;
  const contentFade = useRef(new Animated.Value(1)).current;
  const titleSlide = useRef(new Animated.Value(20)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const logoContainerHeight = scrollY.interpolate({
    inputRange: [0, LOGO_HEIGHT],
    outputRange: [LOGO_HEIGHT, 0],
    extrapolate: "clamp",
  });
  const logoContainerOpacity = scrollY.interpolate({
    inputRange: [0, LOGO_HEIGHT * 0.6],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const cardAnimations = useRef(
    Array(10).fill(0).map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(40),
    }))
  ).current;

  const animateCards = useCallback(() => {
    cardAnimations.forEach((anim) => {
      anim.opacity.setValue(0);
      anim.translateY.setValue(40);
    });

    cardAnimations.forEach((anim, index) => {
      Animated.parallel([
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 450,
          delay: index * 120,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.spring(anim.translateY, {
          toValue: 0,
          friction: 9,
          tension: 50,
          delay: index * 120,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    });
  }, [cardAnimations]);

  const animateTitle = useCallback(() => {
    titleSlide.setValue(20);
    titleOpacity.setValue(0);
    Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.spring(titleSlide, {
        toValue: 0,
        friction: 10,
        tension: 60,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  }, [titleSlide, titleOpacity]);

  const animateLogo = useCallback(() => {
    Animated.sequence([
      Animated.timing(logoFade, {
        toValue: 0,
        duration: 150,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(logoFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  }, [logoFade]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
    animateCards();
    animateTitle();
  }, [fadeAnim, logoScale, animateCards, animateTitle]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(contentFade, {
        toValue: 0,
        duration: 120,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 280,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
    animateCards();
    animateTitle();
    animateLogo();
  }, [activeTab, contentFade, animateCards, animateTitle, animateLogo]);

  const handleTabPress = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const activeContent = tabContents[activeTab] || [];
  const activeTabData = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  const renderTabItem = useCallback((tab: Tab) => {
    const isActive = activeTab === tab.id;
    return (
      <TouchableOpacity
        key={tab.id}
        onPress={() => handleTabPress(tab.id)}
        activeOpacity={0.7}
        style={styles.tabButton}
      >
        <View
          style={[
            styles.tabPill,
            isActive && {
              backgroundColor: tab.accent + "14",
              borderColor: tab.accent + "30",
            },
          ]}
        >
          <View
            style={[
              styles.tabIconWrap,
              isActive && {
                backgroundColor: tab.accent + "12",
                borderColor: tab.accent + "40",
              },
            ]}
          >
            <Image
              source={categoryImages[tab.tabIcon as keyof typeof categoryImages]}
              style={styles.tabIconImage}
              resizeMode="contain"
            />
          </View>
          {isActive && (
            <Text style={[styles.tabLabel, { color: tab.accent }]}>
              {tab.title}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }, [activeTab, handleTabPress]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const renderCard = useCallback((item: ContentItem, index: number) => {
    const cardAnim = cardAnimations[index];
    const favorite = isFavorite(item.spotId);
    return (
      <Animated.View
        key={`${activeTab}-${index}`}
        style={[
          styles.placeCard,
          {
            opacity: cardAnim?.opacity || 1,
            transform: [
              { translateY: cardAnim?.translateY || 0 },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.placeCardTouchable}
          activeOpacity={0.9}
          onPress={() => router.push(`/spot/${item.spotId}` as any)}
        >
          <Image
            source={resolveImageSource(item.image)}
            style={styles.placeImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.75)"]}
            style={styles.placeImageGradient}
          />

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => {
              const willBeFav = !favorite;
              toggleFavorite(item.spotId);
              showToast(
                <Heart size={28} color="#FFFFFF" fill={willBeFav ? "#E94444" : "transparent"} />,
                willBeFav ? "Added to Favorites" : "Removed from Favorites"
              );
            }}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Heart
              size={20}
              color={favorite ? "#E94444" : "#FFFFFF"}
              fill={favorite ? "#E94444" : "transparent"}
            />
          </TouchableOpacity>

          <View style={[styles.categoryBadge, { backgroundColor: activeTabData.accent }]}>
            <Text style={styles.categoryBadgeText}>
              {activeTabData.title}
            </Text>
          </View>

          <View style={styles.placeInfo}>
            <Text style={styles.placeName} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.placeDescription} numberOfLines={2}>
              {item.description}
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
  }, [activeTab, activeTabData, cardAnimations, router, isFavorite, toggleFavorite, showToast]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={activeTabData.bgGradient}
        style={StyleSheet.absoluteFillObject}
      />

      <View
        style={[
          styles.headerArea,
          {
            paddingTop: insets.top + 8,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              height: logoContainerHeight,
              opacity: logoContainerOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Animated.View style={{ opacity: logoFade }}>
            <Image
              source={categoryImages[activeTabData.headerLogo as keyof typeof categoryImages]}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
        </Animated.View>

        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
          {tabs.map(renderTabItem)}
        </Animated.ScrollView>

        <Animated.View
          style={[
            styles.sectionHeader,
            {
              opacity: titleOpacity,
              transform: [{ translateX: titleSlide }],
            },
          ]}
        >
          <View style={[styles.sectionAccent, { backgroundColor: activeTabData.accent }]} />
          <View>
            <Text style={styles.sectionSubtitle}>{activeTabData.subtitle}</Text>
            <Text style={[styles.sectionTitle, { color: activeTabData.accent }]}>{activeTabData.title}</Text>
          </View>
          <View style={styles.sectionCountContainer}>
            <Compass size={14} color="rgba(0,0,0,0.35)" />
            <Text style={styles.sectionCount}>{activeContent.length} places</Text>
          </View>
        </Animated.View>
      </View>

      <Animated.View style={[styles.contentArea, { opacity: contentFade }]}>
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 100 },
          ]}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {activeContent.map(renderCard)}
        </Animated.ScrollView>
      </Animated.View>

      <ActionToast
        visible={toastVisible}
        icon={toastIcon}
        message={toastMessage}
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerArea: {
    paddingBottom: 4,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logo: {
    width: 240,
    height: 110,
  },
  tabsRow: {
    paddingHorizontal: 16,
    gap: 6,
    alignItems: "center",
    paddingVertical: 6,
  },
  tabButton: {
    marginRight: 2,
  },
  tabPill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 28,
    paddingRight: 4,
    paddingVertical: 4,
    paddingLeft: 4,
    gap: 8,
    backgroundColor: "rgba(0,0,0,0.04)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  tabIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.08)",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  tabIconImage: {
    width: 34,
    height: 34,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: "700" as const,
    letterSpacing: 0.5,
    paddingRight: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 6,
    gap: 12,
  },
  sectionAccent: {
    width: 3,
    height: 32,
    borderRadius: 2,
  },
  sectionSubtitle: {
    fontSize: 11,
    fontWeight: "600" as const,
    color: "rgba(0,0,0,0.4)",
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800" as const,
    letterSpacing: -0.3,
  },
  sectionCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: "auto",
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: "500" as const,
    color: "rgba(0,0,0,0.35)",
  },
  contentArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    gap: 18,
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
  },
  placeImageGradient: {
    position: "absolute" as const,
    left: 0,
    right: 0,
    bottom: 0,
    height: "65%",
  },
  favoriteButton: {
    position: "absolute" as const,
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
    position: "absolute" as const,
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  },
  placeInfo: {
    position: "absolute" as const,
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
});
