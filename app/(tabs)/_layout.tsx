import { Tabs } from "expo-router";
import { Home, MapPin, CalendarDays, Settings } from "lucide-react-native";
import React from "react";
import { View, StyleSheet, Platform, Image } from "react-native";

export default function TabLayout() {
  const AnimatedBullIcon = () => (
    <View style={styles.centerButton}>
      <View style={styles.centerIconContainer}>
        <Image
          source={{ uri: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/hfavmu7s16hdblzuf3bv8" }}
          style={styles.centerIcon}
          tintColor="#117A7A"
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
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => <CalendarDays color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          href: null,
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
    boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.1)",
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
    boxShadow: "0px 4px 12px rgba(17, 122, 122, 0.4)",
    elevation: 10,
    borderWidth: 5,
    borderColor: "#FFFFFF",
  },
  centerIcon: {
    width: 50,
    height: 50,
  },
});
