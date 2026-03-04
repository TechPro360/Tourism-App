import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { MapPin } from "lucide-react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Tab {
  id: string;
  title: string;
  image: string;
  colors: {
    primary: string;
    secondary: string;
    gradient: [string, string, string];
  };
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
    title: "Never Ending Adventure",
    image: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/gvi1kmkuxdxpwpvoi3hjv",
    colors: {
      primary: "#E74C3C",
      secondary: "#C0392B",
      gradient: ["rgba(231, 76, 60, 0.88)", "rgba(192, 57, 43, 0.92)", "rgba(231, 76, 60, 0.95)"],
    },
  },
  {
    id: "faith",
    title: "Never Ending Faith",
    image: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/z8fyoay78qavd9580587u",
    colors: {
      primary: "#5DADE2",
      secondary: "#3498DB",
      gradient: ["rgba(93, 173, 226, 0.88)", "rgba(52, 152, 219, 0.92)", "rgba(93, 173, 226, 0.95)"],
    },
  },
  {
    id: "food",
    title: "Never Ending Food",
    image: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/wumybnpxyhvc3iwedhjdq",
    colors: {
      primary: "#A93B5C",
      secondary: "#8E2D4A",
      gradient: ["rgba(169, 59, 92, 0.88)", "rgba(142, 45, 74, 0.92)", "rgba(169, 59, 92, 0.95)"],
    },
  },
  {
    id: "fun",
    title: "Never Ending Fun",
    image: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/ccnmkbozim44hvprjudba",
    colors: {
      primary: "#C0CA33",
      secondary: "#9E9D24",
      gradient: ["rgba(192, 202, 51, 0.88)", "rgba(158, 157, 36, 0.92)", "rgba(192, 202, 51, 0.95)"],
    },
  },
  {
    id: "learning",
    title: "Never Ending Learning",
    image: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/g7a1lt202jccd2pk0ya89",
    colors: {
      primary: "#FF7043",
      secondary: "#F4511E",
      gradient: ["rgba(255, 112, 67, 0.88)", "rgba(244, 81, 30, 0.92)", "rgba(255, 112, 67, 0.95)"],
    },
  },
];

const tabContents: TabContent = {
  adventure: [
    {
      title: "Minalungao National Park",
      description: "Dive into crystal-clear emerald waters surrounded by towering limestone cliffs. Experience bamboo rafting, cliff diving, and swimming in one of Nueva Ecija's most breathtaking natural wonders. Perfect for thrill-seekers and nature lovers alike.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    },
    {
      title: "Mountain Trekking & Hiking",
      description: "Conquer Mount Damas and explore various hiking trails offering panoramic views of endless rice fields and mountain ranges. Each trail presents unique challenges and rewards adventurers with stunning vistas and unforgettable experiences.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    },
    {
      title: "Eco-Parks & Nature Tours",
      description: "Discover hidden waterfalls, explore lush forests, and encounter diverse wildlife in Nueva Ecija's pristine ecological parks. From bird watching to nature photography, adventure awaits at every turn in this natural paradise.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    },
  ],
  faith: [
    {
      title: "Historic Churches & Cathedrals",
      description: "Visit centuries-old Spanish colonial churches that stand as testaments to the province's deep Catholic faith. Each church tells stories of devotion, resilience, and the enduring spiritual heritage of Nueva Ecija's faithful communities.",
      image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800",
    },
    {
      title: "Taong Putik Festival",
      description: "Witness the unique Taong Putik Festival in Aliaga where devotees cover themselves in mud and dried grass to honor St. John the Baptist. This extraordinary display of faith showcases the deep religious traditions and thanksgiving rituals of the province.",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    },
    {
      title: "Pilgrimage Sites",
      description: "Experience spiritual renewal at various pilgrimage destinations throughout Nueva Ecija. From sacred shrines to prayer mountains, these holy places offer peace, reflection, and connection with the divine for believers and seekers alike.",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800",
    },
  ],
  food: [
    {
      title: "Authentic Ilocano Cuisine",
      description: "Indulge in the rich flavors of authentic Ilocano dishes including pinakbet, bagnet, and dinengdeng. These traditional recipes passed down through generations showcase the culinary heritage and bold flavors that define Nueva Ecija's food scene.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800",
    },
    {
      title: "Longganisa de Cabanatuan",
      description: "Taste the legendary Cabanatuan longganisa - sweet, garlicky, and bursting with flavor. This iconic breakfast sausage has become synonymous with Nueva Ecija's gastronomic identity and is a must-try for every food enthusiast.",
      image: "https://images.unsplash.com/photo-1613564834361-9436948817d1?w=800",
    },
    {
      title: "Rice-Based Delicacies",
      description: "As the Rice Granary of the Philippines, Nueva Ecija excels in creating exquisite rice-based treats. From savory kakanin to sweet bibingka, these delicacies highlight the versatility and quality of locally harvested rice.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800",
    },
  ],
  fun: [
    {
      title: "Festivals & Celebrations",
      description: "Join the vibrant celebrations of Tanduyong Festival, Binalay Festival, and various town fiestas. Experience colorful street dancing, live music, cultural performances, and the warm hospitality that makes every celebration in Nueva Ecija unforgettable.",
      image: "https://images.unsplash.com/photo-1519167758481-83f29da8c2b6?w=800",
    },
    {
      title: "Local Markets & Shopping",
      description: "Explore bustling public markets filled with fresh produce, local handicrafts, and unique finds. From early morning vegetable markets to night bazaars, shopping in Nueva Ecija is an adventure filled with discoveries and authentic local experiences.",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800",
    },
    {
      title: "Parks & Recreation",
      description: "Enjoy family-friendly activities at various parks and recreation centers throughout the province. From picnics in scenic spots to outdoor sports and community events, Nueva Ecija offers countless ways to have fun and create lasting memories.",
      image: "https://images.unsplash.com/photo-1529472119196-cb724127a98e?w=800",
    },
  ],
  learning: [
    {
      title: "Historical Landmarks",
      description: "Discover the rich history of Nueva Ecija through its well-preserved landmarks. Visit the Cabanatuan American Memorial, Fort Magsaysay, and various World War II sites that educate visitors about the province's crucial role in Philippine history.",
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800",
    },
    {
      title: "Agricultural Heritage",
      description: "Learn about modern and traditional farming techniques in the Rice Granary of the Philippines. Educational farm tours, rice museums, and agri-tourism sites offer insights into sustainable agriculture and the province's agricultural innovations.",
      image: "https://images.unsplash.com/photo-1536147210925-c3f1e3e67b0d?w=800",
    },
    {
      title: "Cultural Museums & Centers",
      description: "Immerse yourself in Nueva Ecija's cultural heritage at various museums and cultural centers. From Ilocano traditions to contemporary art galleries, these institutions preserve and share the province's diverse cultural narratives and artistic expressions.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    },
  ],
};

export default function CenterScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("adventure");
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const headerScale = useRef(new Animated.Value(0.9)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;
  
  const cardAnimations = useRef(
    Array(10).fill(0).map(() => ({
      scale: new Animated.Value(0.8),
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(30),
    }))
  ).current;

  const animateCards = useCallback(() => {
    cardAnimations.forEach((anim) => {
      anim.scale.setValue(0.8);
      anim.opacity.setValue(0);
      anim.translateY.setValue(30);
    });

    const animations = cardAnimations.map((anim, index) =>
      Animated.parallel([
        Animated.spring(anim.scale, {
          toValue: 1,
          friction: 7,
          tension: 40,
          delay: index * 80,
          useNativeDriver: true,
        }),
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 400,
          delay: index * 80,
          useNativeDriver: true,
        }),
        Animated.spring(anim.translateY, {
          toValue: 0,
          friction: 8,
          tension: 40,
          delay: index * 80,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(0, animations).start();
  }, [cardAnimations]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(headerScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    animateCards();
  }, [fadeAnim, headerScale, animateCards]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    animateCards();
  }, [activeTab, contentOpacity, animateCards]);

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  const activeContent = tabContents[activeTab] || [];
  const activeTabData = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1536147210925-c3f1e3e67b0d?w=1200",
        }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <LinearGradient
          colors={activeTabData.colors.gradient}
          style={styles.backgroundGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </ImageBackground>

      <View style={[styles.content, { paddingTop: insets.top }]}>
        <Animated.View
          style={[
            styles.headerSection,
            {
              opacity: fadeAnim,
              transform: [{ scale: headerScale }],
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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContent}
          style={styles.tabsContainer}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => handleTabPress(tab.id)}
              activeOpacity={0.9}
              style={styles.tabImageContainer}
            >
              <Animated.View
                style={[
                  styles.tabImageWrapper,
                  activeTab === tab.id && styles.tabImageWrapperActive,
                ]}
              >
                <Image
                  source={{ uri: tab.image }}
                  style={styles.tabImage}
                  resizeMode="contain"
                />
                {activeTab === tab.id && (
                  <View style={[styles.activeTabIndicator, { backgroundColor: tab.colors.primary }]} />
                )}
              </Animated.View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Animated.View style={{ flex: 1, opacity: contentOpacity }}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.contentContainer}>
              {activeContent.map((item, index) => (
                <Animated.View
                  key={`${activeTab}-${index}`}
                  style={[
                    styles.cardWrapper,
                    {
                      opacity: cardAnimations[index]?.opacity || 1,
                      transform: [
                        { scale: cardAnimations[index]?.scale || 1 },
                        { translateY: cardAnimations[index]?.translateY || 0 },
                      ],
                    },
                  ]}
                >
                  {Platform.OS === 'web' ? (
                    <View style={styles.glassCard}>
                      <ImageBackground
                        source={{ uri: item.image }}
                        style={styles.cardImage}
                        imageStyle={styles.cardImageStyle}
                      >
                        <LinearGradient
                          colors={[
                            "rgba(0, 0, 0, 0.3)",
                            `${activeTabData.colors.primary}DD`,
                          ]}
                          style={styles.cardGradient}
                        />
                      </ImageBackground>
                      <View style={styles.cardContent}>
                        <View style={styles.cardHeader}>
                          <View style={[styles.iconCircle, { backgroundColor: `${activeTabData.colors.primary}20` }]}>
                            <MapPin size={20} color={activeTabData.colors.primary} />
                          </View>
                          <Text style={[styles.cardTitle, { color: activeTabData.colors.primary }]}>{item.title}</Text>
                        </View>
                        <Text style={styles.cardDescription}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <BlurView intensity={80} tint="light" style={styles.glassCard}>
                      <ImageBackground
                        source={{ uri: item.image }}
                        style={styles.cardImage}
                        imageStyle={styles.cardImageStyle}
                      >
                        <LinearGradient
                          colors={[
                            "rgba(0, 0, 0, 0.3)",
                            `${activeTabData.colors.primary}DD`,
                          ]}
                          style={styles.cardGradient}
                        />
                      </ImageBackground>
                      <View style={styles.cardContent}>
                        <View style={styles.cardHeader}>
                          <View style={[styles.iconCircle, { backgroundColor: `${activeTabData.colors.primary}20` }]}>
                            <MapPin size={20} color={activeTabData.colors.primary} />
                          </View>
                          <Text style={[styles.cardTitle, { color: activeTabData.colors.primary }]}>{item.title}</Text>
                        </View>
                        <Text style={styles.cardDescription}>
                          {item.description}
                        </Text>
                      </View>
                    </BlurView>
                  )}
                </Animated.View>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5F5",
  },
  backgroundImage: {
    position: "absolute" as const,
    left: 0,
    right: 0,
    top: 0,
    height: SCREEN_HEIGHT * 0.5,
    width: "100%",
  },
  backgroundImageStyle: {
    resizeMode: "cover" as const,
  },
  backgroundGradient: {
    position: "absolute" as const,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
  },
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    alignItems: "center",
  },
  logo: {
    width: 220,
    height: 100,
    marginBottom: 20,
  },
  tabsContainer: {
    marginBottom: 20,
  },
  tabsScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
    alignItems: "center",
  },
  tabImageContainer: {
    marginRight: 4,
  },
  tabImageWrapper: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  tabImageWrapperActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    transform: [{ scale: 1.05 }],
  },
  tabImage: {
    width: 140,
    height: 80,
  },
  activeTabIndicator: {
    position: "absolute" as const,
    bottom: -8,
    left: "50%",
    marginLeft: -6,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  glassCard: {
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: Platform.OS === 'web' ? "rgba(255, 255, 255, 0.3)" : "transparent",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.4)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  cardImage: {
    width: "100%",
    height: 180,
  },
  cardImageStyle: {
    resizeMode: "cover" as const,
  },
  cardGradient: {
    position: "absolute" as const,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  cardContent: {
    padding: 20,
    backgroundColor: Platform.OS === 'web' ? "rgba(255, 255, 255, 0.9)" : "transparent",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    letterSpacing: 0.3,
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "#2C4A4A",
    lineHeight: 22,
    letterSpacing: 0.2,
  },
});
