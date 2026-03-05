import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Heart } from "lucide-react-native";
import { useAppContext } from "@/contexts/AppContext";
import { resolveImageSource } from "@/utils/imageHelper";
import { categoryData } from "@/constants/categoryItems";
import ActionToast from "@/components/ActionToast";

export default function CategoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
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
        <Stack.Screen options={{ headerShown: false }} />
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
          {category.items.map((item, index) => {
            const fav = isFavorite(item.id);
            return (
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
                <TouchableOpacity style={styles.cardTouchable} activeOpacity={0.9} onPress={() => router.push(`/spot/${item.id}` as any)}>
                  <Image source={resolveImageSource(item.image)} style={styles.cardImage} />
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => {
                      const willBeFav = !fav;
                      toggleFavorite(item.id);
                      showToast(
                        <Heart size={28} color="#FFFFFF" fill={willBeFav ? "#E94444" : "transparent"} />,
                        willBeFav ? "Added to Favorites" : "Removed from Favorites"
                      );
                    }}
                    activeOpacity={0.7}
                  >
                    <Heart
                      size={28}
                      color="#FFFFFF"
                      fill={fav ? "#FFFFFF" : "transparent"}
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
            );
          })}
        </View>
      </ScrollView>

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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 4 },
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
