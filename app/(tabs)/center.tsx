import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MapPin, ChevronRight, Compass } from "lucide-react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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
}

interface TabContent {
  [key: string]: ContentItem[];
}

const tabs: Tab[] = [
  {
    id: "adventure",
    title: "Adventure",
    subtitle: "Never Ending",
    tabIcon: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/86e07wvx9zwyi2x9foyc2",
    headerLogo: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/86e07wvx9zwyi2x9foyc2",
    accent: "#E74C3C",
    accentLight: "#FDE8E6",
    bgGradient: ["#FFFFFF", "#FFF5F4"],
  },
  {
    id: "faith",
    title: "Faith",
    subtitle: "Never Ending",
    tabIcon: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/0hcrctrg8jxkf5nn1jrkp",
    headerLogo: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/0hcrctrg8jxkf5nn1jrkp",
    accent: "#3498DB",
    accentLight: "#E8F4FD",
    bgGradient: ["#FFFFFF", "#F0F7FC"],
  },
  {
    id: "food",
    title: "Food",
    subtitle: "Never Ending",
    tabIcon: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/afdfcz80zvij9gl6horve",
    headerLogo: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/afdfcz80zvij9gl6horve",
    accent: "#C0396B",
    accentLight: "#FCE8F0",
    bgGradient: ["#FFFFFF", "#FDF2F6"],
  },
  {
    id: "fun",
    title: "Fun",
    subtitle: "Never Ending",
    tabIcon: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/mi8ype72348spyer2ufez",
    headerLogo: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/mi8ype72348spyer2ufez",
    accent: "#8BAA20",
    accentLight: "#F2F6E0",
    bgGradient: ["#FFFFFF", "#F7F9EE"],
  },
  {
    id: "learning",
    title: "Learning",
    subtitle: "Never Ending",
    tabIcon: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/cvj26grwpzkujvqw7j69m",
    headerLogo: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/cvj26grwpzkujvqw7j69m",
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
    },
    {
      title: "Mountain Trekking & Hiking",
      description: "Conquer Mount Damas and explore various hiking trails offering panoramic views of endless rice fields and mountain ranges.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    },
    {
      title: "Eco-Parks & Nature Tours",
      description: "Discover hidden waterfalls, explore lush forests, and encounter diverse wildlife in Nueva Ecija's pristine ecological parks.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    },
  ],
  faith: [
    {
      title: "Historic Churches & Cathedrals",
      description: "Visit centuries-old Spanish colonial churches that stand as testaments to the province's deep Catholic faith and enduring spiritual heritage.",
      image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800",
    },
    {
      title: "Taong Putik Festival",
      description: "Witness the unique Taong Putik Festival in Aliaga where devotees cover themselves in mud and dried grass to honor St. John the Baptist.",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    },
    {
      title: "Pilgrimage Sites",
      description: "Experience spiritual renewal at various pilgrimage destinations throughout Nueva Ecija, from sacred shrines to prayer mountains.",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800",
    },
  ],
  food: [
    {
      title: "Authentic Ilocano Cuisine",
      description: "Indulge in the rich flavors of authentic Ilocano dishes including pinakbet, bagnet, and dinengdeng passed down through generations.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800",
    },
    {
      title: "Longganisa de Cabanatuan",
      description: "Taste the legendary Cabanatuan longganisa — sweet, garlicky, and bursting with flavor. An iconic delicacy synonymous with Nueva Ecija.",
      image: "https://images.unsplash.com/photo-1613564834361-9436948817d1?w=800",
    },
    {
      title: "Rice-Based Delicacies",
      description: "As the Rice Granary of the Philippines, Nueva Ecija excels in creating exquisite rice-based treats from savory kakanin to sweet bibingka.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800",
    },
  ],
  fun: [
    {
      title: "Festivals & Celebrations",
      description: "Join vibrant celebrations of Tanduyong Festival, Binalay Festival, and various town fiestas with colorful street dancing and live music.",
      image: "https://images.unsplash.com/photo-1519167758481-83f29da8c2b6?w=800",
    },
    {
      title: "Local Markets & Shopping",
      description: "Explore bustling public markets filled with fresh produce, local handicrafts, and unique finds from morning vegetable markets to night bazaars.",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800",
    },
    {
      title: "Parks & Recreation",
      description: "Enjoy family-friendly activities at various parks and recreation centers. From picnics in scenic spots to outdoor sports and community events.",
      image: "https://images.unsplash.com/photo-1529472119196-cb724127a98e?w=800",
    },
  ],
  learning: [
    {
      title: "Historical Landmarks",
      description: "Discover the rich history through well-preserved landmarks. Visit the Cabanatuan American Memorial and various World War II sites.",
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800",
    },
    {
      title: "Agricultural Heritage",
      description: "Learn about modern and traditional farming techniques in the Rice Granary of the Philippines through educational farm tours and rice museums.",
      image: "https://images.unsplash.com/photo-1536147210925-c3f1e3e67b0d?w=800",
    },
    {
      title: "Cultural Museums & Centers",
      description: "Immerse yourself in Nueva Ecija's cultural heritage at various museums, from Ilocano traditions to contemporary art galleries.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    },
  ],
};

export default function CenterScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("adventure");
  const scrollRef = useRef<ScrollView>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const logoFade = useRef(new Animated.Value(1)).current;
  const contentFade = useRef(new Animated.Value(1)).current;
  const titleSlide = useRef(new Animated.Value(20)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

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
          useNativeDriver: true,
        }),
        Animated.spring(anim.translateY, {
          toValue: 0,
          friction: 9,
          tension: 50,
          delay: index * 120,
          useNativeDriver: true,
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
        useNativeDriver: true,
      }),
      Animated.spring(titleSlide, {
        toValue: 0,
        friction: 10,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, [titleSlide, titleOpacity]);

  const animateLogo = useCallback(() => {
    Animated.sequence([
      Animated.timing(logoFade, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(logoFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoFade]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
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
        useNativeDriver: true,
      }),
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
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
              source={{ uri: tab.tabIcon }}
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

  const renderCard = useCallback((item: ContentItem, index: number) => {
    const cardAnim = cardAnimations[index];
    return (
      <Animated.View
        key={`${activeTab}-${index}`}
        style={[
          styles.cardOuter,
          {
            opacity: cardAnim?.opacity || 1,
            transform: [
              { translateY: cardAnim?.translateY || 0 },
            ],
          },
        ]}
      >
        <View style={styles.card}>
          <Image
            source={{ uri: item.image }}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.75)"]}
            style={styles.cardImageOverlay}
            locations={[0.2, 0.6, 1]}
          />
          <View style={styles.cardBody}>
            <View style={styles.cardLocationRow}>
              <MapPin size={12} color="#FFFFFF" />
              <Text style={styles.cardLocationText}>
                Nueva Ecija
              </Text>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
          <View style={styles.cardBottom}>
            <Text style={styles.cardDesc} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.cardFooter}>
              <View style={[styles.cardBadge, { backgroundColor: activeTabData.accent + "15" }]}>
                <Text style={[styles.cardBadgeText, { color: activeTabData.accent }]}>
                  {activeTabData.title}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.cardArrowBtn, { backgroundColor: activeTabData.accent }]}
              >
                <ChevronRight size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }, [activeTab, activeTabData, cardAnimations]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={activeTabData.bgGradient}
        style={StyleSheet.absoluteFillObject}
      />

      <Animated.View
        style={[
          styles.headerArea,
          {
            paddingTop: insets.top + 8,
            opacity: fadeAnim,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: logoScale }],
              opacity: logoFade,
            },
          ]}
        >
          <Image
            source={{ uri: activeTabData.headerLogo }}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
          {tabs.map(renderTabItem)}
        </ScrollView>

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
      </Animated.View>

      <Animated.View style={[styles.contentArea, { opacity: contentFade }]}>
        <ScrollView
          ref={scrollRef}
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 100 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {activeContent.map(renderCard)}
        </ScrollView>
      </Animated.View>
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
    paddingVertical: 8,
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
  cardOuter: {
    borderRadius: 20,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 14,
      },
      android: {
        elevation: 8,
      },
      web: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 14,
      },
    }),
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  cardImage: {
    width: "100%",
    height: 190,
  },
  cardImageOverlay: {
    position: "absolute" as const,
    left: 0,
    right: 0,
    top: 0,
    height: 190,
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    marginTop: -50,
  },
  cardLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  cardLocationText: {
    fontSize: 10,
    fontWeight: "600" as const,
    letterSpacing: 0.8,
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.85)",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    letterSpacing: -0.2,
  },
  cardBottom: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
  },
  cardDesc: {
    fontSize: 13,
    fontWeight: "400" as const,
    color: "rgba(0,0,0,0.55)",
    lineHeight: 19,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  cardBadgeText: {
    fontSize: 11,
    fontWeight: "700" as const,
    letterSpacing: 0.5,
  },
  cardArrowBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
