// template
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Image, Text, StyleSheet, Animated, Platform } from "react-native";
import { AppProvider } from "@/contexts/AppContext";
import { collectAllImageUrls } from "@/utils/allItems";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [loadingText, setLoadingText] = useState("Loading assets...");

  const prefetchImages = useCallback(async () => {
    try {
      const urls = collectAllImageUrls();
      console.log(`Prefetching ${urls.length} images for offline use...`);
      const batchSize = 6;
      let completed = 0;
      for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        await Promise.allSettled(
          batch.map(url => Image.prefetch(url))
        );
        completed += batch.length;
        const progress = Math.min(completed / urls.length, 1);
        Animated.timing(progressAnim, {
          toValue: progress,
          duration: 100,
          useNativeDriver: false,
        }).start();
      }
      setLoadingText("Ready!");
      console.log(`Prefetched ${urls.length} images successfully`);
    } catch (error) {
      console.log("Image prefetch error:", error);
      setLoadingText("Ready!");
    }
  }, [progressAnim]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    let didFinish = false;

    const finishLoading = () => {
      if (didFinish) return;
      didFinish = true;
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    };

    const minTimer = new Promise<void>(resolve => setTimeout(resolve, 2500));

    Promise.all([prefetchImages(), minTimer]).then(() => {
      finishLoading();
    });

    const maxTimer = setTimeout(finishLoading, 8000);

    return () => clearTimeout(maxTimer);
  }, [fadeAnim, scaleAnim, onFinish, prefetchImages]);

  return (
    <View style={styles.loadingContainer}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
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

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.loadingText}>{loadingText}</Text>
      </View>

      <View style={styles.brandingContainer}>
        <Text style={styles.poweredByText}>Powered by</Text>
        <Text style={styles.companyName}>TechPro 360 Solutions</Text>
      </View>
    </View>
  );
}

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back", animation: "slide_from_right" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="category/[id]" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="spot/[id]" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="categories/[id]" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="city/[id]" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="place/[id]" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="event/[id]" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="emergency-hotlines" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="explored-places" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="favorites-list" options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="notification-events" options={{ headerShown: false, animation: "slide_from_right" }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    SplashScreen.hideAsync();
    
    if (Platform.OS === "android") {
      import("expo-navigation-bar").then((NavigationBar) => {
        NavigationBar.setVisibilityAsync("hidden");
        NavigationBar.setBehaviorAsync("inset-swipe");
        NavigationBar.setPositionAsync("absolute");
      }).catch(() => {
        console.log("NavigationBar not available");
      });
    }
  }, []);

  if (isLoading) {
    return (
      <QueryClientProvider client={queryClient}>
        <LoadingScreen onFinish={() => setIsLoading(false)} />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootLayoutNav />
        </GestureHandlerRootView>
      </AppProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 280,
    height: 280,
  },
  brandingContainer: {
    position: "absolute",
    bottom: 60,
    alignItems: "center",
  },
  poweredByText: {
    fontSize: 12,
    color: "#999999",
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    color: "#117A7A",
    fontWeight: "600" as const,
  },
  progressContainer: {
    position: "absolute",
    bottom: 120,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 60,
  },
  progressTrack: {
    width: "100%",
    height: 4,
    backgroundColor: "#E8F6F6",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#117A7A",
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 12,
    color: "#999999",
    fontWeight: "500" as const,
  },
});
