import { Tabs } from "expo-router";
import { Home, MapPin, Heart, Settings } from "lucide-react-native";
import React from "react";
import { View, StyleSheet, Platform, Image } from "react-native";

export default function TabLayout() {
  const AnimatedBullIcon = () => (
    <View style={styles.centerButton}>
      <View style={styles.centerIconContainer}>
        <Image
          source={{ uri: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/hfavmu7s16hdblzuf3bv8" }}
          style={styles.centerIcon}
          resizeMode="contain"
        />
      </View>
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#117A7A",
        tabBarInactiveTintColor: "#A0A0A0",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color, size }) => <MapPin color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="center"
        options={{
          title: "",
          tabBarIcon: AnimatedBullIcon,
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    height: Platform.OS === "ios" ? 88 : 70,
    paddingBottom: Platform.OS === "ios" ? 28 : 10,
    paddingTop: 10,
    borderTopWidth: 0,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: "600" as const,
  },
  tabBarItem: {
    paddingVertical: 5,
  },
  centerButton: {
    top: -30,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },

  centerIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#117A7A",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 5,
    borderColor: "#FFFFFF",
  },
  centerIcon: {
    width: 50,
    height: 50,
    tintColor: "#117A7A",
  },
});
