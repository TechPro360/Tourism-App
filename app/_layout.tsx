// template
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Image, Text, StyleSheet, Animated, Platform } from "react-native";
import { AppProvider } from "@/contexts/AppContext";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

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

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, onFinish]);

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
});
