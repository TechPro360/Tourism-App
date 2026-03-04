import React, { useEffect, useRef } from "react";
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
import { ArrowLeft, Heart } from "lucide-react-native";
import { useAppContext } from "@/contexts/AppContext";
import { ImageSource, resolveImageSource } from "@/utils/imageHelper";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface CategoryInfo {
  title: string;
  color: string;
  accentColor: string;
  description: string;
  items: {
    id: string;
    name: string;
    location: string;
    image: ImageSource;
    description: string;
    date?: string;
  }[];
}

const categoryData: Record<string, CategoryInfo> = {
  hotels: {
    title: "Hotels & Resorts",
    color: "#0EA5E9",
    accentColor: "rgba(14, 165, 233, 0.1)",
    description: "Discover comfortable stays and luxurious resorts in Nueva Ecija",
    items: [
      {
        id: "h1",
        name: "Villa Soledad Resort",
        location: "Cabanatuan City",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        description: "Elegant resort with modern amenities, pools, and beautiful gardens",
      },
      {
        id: "h2",
        name: "Fortune Hotel",
        location: "San Jose City",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
        description: "Comfortable hotel with excellent service and dining options",
      },
      {
        id: "h3",
        name: "Greenfield Resort",
        location: "Pantabangan",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
        description: "Lakeside resort perfect for relaxation and water activities",
      },
      {
        id: "h4",
        name: "Dandin Resort",
        location: "Carranglan",
        image: require('@/assets/images/Municipal-Images/Carrangalan/HOTEL AND RESORT/Dandin Resort/Dandin Resort.jpg'),
        description: "Relaxing resort with swimming pools and scenic mountain views",
      },
      {
        id: "h5",
        name: "Highland Hotel & Resort",
        location: "Carranglan",
        image: require('@/assets/images/Municipal-Images/Carrangalan/HOTEL AND RESORT/Highland Hotel & Resort/Highland Hotel & Resort.jpg'),
        description: "Premier highland resort with breathtaking mountain views",
      },
      {
        id: "h6",
        name: "M&S Venue & Private Pool",
        location: "Carranglan",
        image: require('@/assets/images/Municipal-Images/Carrangalan/HOTEL AND RESORT/M_S Venue & Private Pool/M_s Venue & Private Pool.jpg'),
        description: "Private venue and pool for events and family gatherings",
      },
      {
        id: "h7",
        name: "MBA Nature Resort",
        location: "Carranglan",
        image: require('@/assets/images/Municipal-Images/Carrangalan/HOTEL AND RESORT/MBA Nature Resort/MBA Nature Resort.jpg'),
        description: "Nature-themed resort with lush greenery and outdoor activities",
      },
    ],
  },
  restaurants: {
    title: "Restaurants & Food",
    color: "#F59E0B",
    accentColor: "rgba(245, 158, 11, 0.1)",
    description: "Savor authentic Nueva Ecijan cuisine and international flavors",
    items: [
      {
        id: "r1",
        name: "Nanay's Kitchen",
        location: "Cabanatuan City",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
        description: "Authentic Filipino cuisine with a homey atmosphere",
      },
      {
        id: "r2",
        name: "Harvest Table",
        location: "Science City of Muñoz",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
        description: "Farm-to-table dining featuring fresh local produce",
      },
      {
        id: "r3",
        name: "Lakeside Grill",
        location: "Pantabangan",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
        description: "Grilled specialties with stunning lake views",
      },
      {
        id: "r4",
        name: "7-27 Cafe",
        location: "Carranglan",
        image: require('@/assets/images/Municipal-Images/Carrangalan/RESTAURANT/7-27 Cafe/7_27 Cafe.jpg'),
        description: "Cozy cafe serving freshly brewed coffee and pastries",
      },
      {
        id: "r5",
        name: "Fragata Restaurant",
        location: "Carranglan",
        image: require('@/assets/images/Municipal-Images/Carrangalan/RESTAURANT/Fragata Restaurant/Fragata Restaurant.jpg'),
        description: "Delicious Filipino cuisine with generous servings",
      },
      {
        id: "r6",
        name: "Highland RestoBar",
        location: "Carranglan",
        image: require('@/assets/images/Municipal-Images/Carrangalan/RESTAURANT/Highland RestoBar/Highland RestoBar.jpg'),
        description: "Great food and drinks with a laid-back highland vibe",
      },
      {
        id: "r7",
        name: "Lola Mommy's Eatery",
        location: "Carranglan",
        image: require('@/assets/images/Municipal-Images/Carrangalan/RESTAURANT/Lola Mommy_s Eatery/Lola Mommy_s Eatery.jpg'),
        description: "Home-style eatery with traditional Filipino comfort food",
      },
      {
        id: "r8",
        name: "Roadtrip Cafe and Resto",
        location: "Carranglan",
        image: require('@/assets/images/Municipal-Images/Carrangalan/RESTAURANT/Roadtrip Cafe and Resto/Roadtrip Cafe and Resto.jpg'),
        description: "Roadside cafe perfect for travelers with hearty meals",
      },
    ],
  },
  pasalubong: {
    title: "Pasalubong",
    color: "#EC4899",
    accentColor: "rgba(236, 72, 153, 0.1)",
    description: "Take home authentic Nueva Ecijan delicacies and products",
    items: [
      {
        id: "p1",
        name: "Kakanin Paradise",
        location: "Cabanatuan City",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
        description: "Traditional rice cakes and Filipino sweets",
      },
      {
        id: "p2",
        name: "Nueva Ecija Rice Products",
        location: "Science City of Muñoz",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800",
        description: "Premium rice varieties and rice-based products",
      },
      {
        id: "p3",
        name: "Longganisa House",
        location: "San Jose City",
        image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800",
        description: "Famous Nueva Ecija longganisa and other meat products",
      },
    ],
  },
  agri: {
    title: "Agri-Tourism",
    color: "#10B981",
    accentColor: "rgba(16, 185, 129, 0.1)",
    description: "Experience farming life and agricultural wonders",
    items: [
      {
        id: "a1",
        name: "Rice Fields Tour",
        location: "Science City of Muñoz",
        image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800",
        description: "Explore vast rice paddies and learn about rice farming",
      },
      {
        id: "a2",
        name: "Organic Farm Experience",
        location: "Guimba",
        image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800",
        description: "Interactive farm tours with organic produce harvesting",
      },
      {
        id: "a3",
        name: "Fruit Orchards",
        location: "Llanera",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
        description: "Visit lush orchards and enjoy fresh tropical fruits",
      },
    ],
  },
  historical: {
    title: "Historical Sites",
    color: "#8B5CF6",
    accentColor: "rgba(139, 92, 246, 0.1)",
    description: "Journey through Nueva Ecija's rich historical heritage",
    items: [
      {
        id: "his1",
        name: "Plaza Lucero",
        location: "Cabanatuan City",
        image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800",
        description: "Historic park commemorating WWII POW Camp Cabanatuan",
      },
      {
        id: "his2",
        name: "Fort Magsaysay",
        location: "Palayan City",
        image: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800",
        description: "Military reservation with historical significance",
      },
      {
        id: "his3",
        name: "Heritage Churches",
        location: "Various Municipalities",
        image: "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
        description: "Spanish colonial churches showcasing baroque architecture",
      },
    ],
  },
  events: {
    title: "Events & Fiestas",
    color: "#EF4444",
    accentColor: "rgba(239, 68, 68, 0.1)",
    description: "Celebrate with the vibrant festivals and events of Nueva Ecija",
    items: [
      {
        id: "e1",
        name: "Tanduyong Festival",
        location: "Cabanatuan City",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
        description: "Annual celebration showcasing local culture and rice industry",
        date: "June 19-24",
      },
      {
        id: "e2",
        name: "Taong Putik Festival",
        location: "Aliaga",
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800",
        description: "Unique festival honoring St. John the Baptist",
        date: "June 24",
      },
      {
        id: "e3",
        name: "Bangus Festival",
        location: "San Jose City",
        image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
        description: "Celebration of the milkfish industry with cooking competitions",
        date: "April 23-30",
      },
    ],
  },
};

export default function CategoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const { toggleFavorite, isFavorite } = useAppContext();

  const category = categoryData[id as string];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  if (!category) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.errorText}>Category not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false, animation: "slide_from_right" }} />
      
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
      >
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={[styles.headerTitle, { color: category.color }]}>
            {category.title}
          </Text>
          <Text style={styles.headerDescription}>{category.description}</Text>
          <View style={[styles.divider, { backgroundColor: category.color }]} />
        </Animated.View>

        <View style={styles.itemsContainer}>
          {category.items.map((item, index) => (
            <Animated.View
              key={item.id}
              style={[
                styles.card,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50 + index * 20, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity style={styles.cardTouchable} activeOpacity={0.9}>
                <Image source={resolveImageSource(item.image)} style={styles.cardImage} />
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorite(item.id)}
                  activeOpacity={0.7}
                >
                  <Heart
                    size={28}
                    color="#FFFFFF"
                    fill={isFavorite(item.id) ? "#FFFFFF" : "transparent"}
                    strokeWidth={2.5}
                  />
                </TouchableOpacity>
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.cardGradient}
                >
                  <Text style={styles.cardName}>{item.name}</Text>
                  <Text style={styles.cardLocation}>{item.location}</Text>
                  {item.date && (
                    <Text style={styles.cardDate}>{item.date}</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
              <View style={styles.cardDescription}>
                <Text style={styles.cardDescriptionText}>{item.description}</Text>
              </View>
            </Animated.View>
          ))}
        </View>
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
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
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
  itemsContainer: {
    gap: 20,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardTouchable: {
    width: "100%",
  },
  cardImage: {
    width: "100%",
    height: 220,
  },
  cardGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "70%",
    justifyContent: "flex-end",
    padding: 20,
  },
  cardName: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  cardLocation: {
    fontSize: 15,
    fontWeight: "500" as const,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  cardDate: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#FFD700",
    marginTop: 6,
    letterSpacing: 0.2,
  },
  favoriteButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  cardDescription: {
    padding: 20,
  },
  cardDescriptionText: {
    fontSize: 15,
    fontWeight: "400" as const,
    color: "#666666",
    lineHeight: 22,
  },
  errorText: {
    fontSize: 18,
    color: "#666666",
    textAlign: "center",
    marginTop: 40,
  },
});
