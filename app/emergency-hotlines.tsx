import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Linking,
  Platform,
  TextInput,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Phone,
  Shield,
  Flame,
  Siren,
  Ambulance,
  Search,
  X,
} from "lucide-react-native";
import { emergencyHotlines } from "@/constants/emergencyHotlines";
import type { HotlineEntry } from "@/constants/emergencyHotlines";

export default function EmergencyHotlinesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [expandedDistricts, setExpandedDistricts] = React.useState<{
    [key: string]: boolean;
  }>({});

  const [expandedEntries, setExpandedEntries] = React.useState<{
    [key: string]: boolean;
  }>({});

  const filteredHotlines = useMemo(() => {
    if (!searchQuery.trim()) return emergencyHotlines;
    const query = searchQuery.toLowerCase().trim();
    return emergencyHotlines
      .map((district) => ({
        ...district,
        entries: district.entries.filter((entry) =>
          entry.municipality.toLowerCase().includes(query)
        ),
      }))
      .filter((district) => district.entries.length > 0);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const expanded: { [key: string]: boolean } = {};
      const expandedE: { [key: string]: boolean } = {};
      filteredHotlines.forEach((district, dIdx) => {
        expanded[district.name] = true;
        district.entries.forEach((_, eIdx) => {
          expandedE[`${dIdx}-${eIdx}`] = true;
        });
      });
      setExpandedDistricts(expanded);
      setExpandedEntries(expandedE);
    }
  }, [searchQuery, filteredHotlines]);

  const toggleDistrict = (districtName: string) => {
    setExpandedDistricts((prev) => ({
      ...prev,
      [districtName]: !prev[districtName],
    }));
  };

  const toggleEntry = (key: string) => {
    setExpandedEntries((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: Platform.OS !== "web",
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: Platform.OS !== "web",
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleCallPress = (number: string) => {
    const cleaned = number.replace(/[^0-9+()-]/g, "").replace(/\s/g, "");
    Linking.openURL(`tel:${cleaned}`);
  };

  const renderPhoneNumbers = (label: string, numbers: string, iconColor: string, icon: React.ReactNode) => {
    if (!numbers || numbers.trim() === "") return null;
    const lines = numbers.split("\n").filter((l) => l.trim() !== "");
    return (
      <View style={styles.hotlineCategory}>
        <View style={styles.hotlineCategoryHeader}>
          {icon}
          <Text style={[styles.hotlineCategoryLabel, { color: iconColor }]}>
            {label}
          </Text>
        </View>
        {lines.map((line, idx) => {
          const isLabel =
            line.includes(":") &&
            !line.match(/^\(?0\d/) &&
            !line.match(/^\+/);
          if (isLabel) {
            return (
              <Text key={idx} style={styles.hotlineSubLabel}>
                {line}
              </Text>
            );
          }
          const cleanNumber = line.replace(/[^0-9+()-\s]/g, "").trim();
          return (
            <TouchableOpacity
              key={idx}
              style={styles.phoneRow}
              onPress={() => handleCallPress(cleanNumber || line)}
              activeOpacity={0.7}
            >
              <Phone size={14} color={iconColor} />
              <Text style={styles.phoneNumber}>{line.trim()}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderEntry = (entry: HotlineEntry, districtIdx: number, entryIdx: number) => {
    const key = `${districtIdx}-${entryIdx}`;
    const isExpanded = expandedEntries[key] ?? false;

    return (
      <View key={key} style={styles.entryContainer}>
        <TouchableOpacity
          style={styles.entryHeader}
          onPress={() => toggleEntry(key)}
          activeOpacity={0.7}
        >
          <Text style={styles.entryMunicipality}>{entry.municipality}</Text>
          {isExpanded ? (
            <ChevronUp size={18} color="#117A7A" />
          ) : (
            <ChevronDown size={18} color="#117A7A" />
          )}
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.entryContent}>
            {renderPhoneNumbers(
              "C/MDRRMO",
              entry.cdrrmo,
              "#E67E22",
              <Shield size={16} color="#E67E22" />
            )}
            {renderPhoneNumbers(
              "BFP",
              entry.bfp,
              "#E74C3C",
              <Flame size={16} color="#E74C3C" />
            )}
            {renderPhoneNumbers(
              "PNP",
              entry.pnp,
              "#2E86AB",
              <Siren size={16} color="#2E86AB" />
            )}
            {renderPhoneNumbers(
              "RHU / Ambulance",
              entry.rhuAmbulance,
              "#27AE60",
              <Ambulance size={16} color="#27AE60" />
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient
        colors={["#FFFFFF", "#F8FFFE", "#E8F6F5", "#FFFFFF"]}
        style={styles.backgroundGradient}
      />

      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
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
          <View style={styles.titleIconRow}>
            <View style={styles.titleIconBg}>
              <Phone size={28} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.title}>Emergency Hotlines</Text>
          <Text style={styles.subtitle}>Nueva Ecija</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 50],
                    outputRange: [0, 60],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.warningBanner}>
            <Text style={styles.warningText}>
              In case of emergency, call the appropriate hotline for your area.
              Tap any number to dial directly.
            </Text>
          </View>

          <View style={styles.searchContainer}>
            <Search size={18} color="#117A7A" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search municipality..."
              placeholderTextColor="#9CBBBB"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
              autoCapitalize="none"
              testID="search-hotlines"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <X size={18} color="#999" />
              </TouchableOpacity>
            )}
          </View>

          {filteredHotlines.length === 0 && (
            <View style={styles.emptyState}>
              <Search size={40} color="#C8DEDE" />
              <Text style={styles.emptyStateText}>No municipality found for &ldquo;{searchQuery}&rdquo;</Text>
            </View>
          )}

          {filteredHotlines.map((district, districtIdx) => {
            const isDistrictExpanded =
              expandedDistricts[district.name] ?? false;

            return (
              <View key={district.name} style={styles.districtContainer}>
                <TouchableOpacity
                  style={styles.districtHeader}
                  onPress={() => toggleDistrict(district.name)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.districtName}>{district.name}</Text>
                  {isDistrictExpanded ? (
                    <ChevronUp size={22} color="#117A7A" />
                  ) : (
                    <ChevronDown size={22} color="#117A7A" />
                  )}
                </TouchableOpacity>
                {isDistrictExpanded && (
                  <View style={styles.districtContent}>
                    {district.entries.map((entry, entryIdx) =>
                      renderEntry(entry, districtIdx, entryIdx)
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </Animated.View>
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
    backgroundColor: "#117A7A",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
    elevation: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  titleIconRow: {
    marginBottom: 12,
  },
  titleIconBg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E74C3C",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 12px rgba(231, 76, 60, 0.3)",
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "800" as const,
    color: "#1A1A1A",
    letterSpacing: 0.3,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#117A7A",
    marginTop: 4,
  },
  content: {
    paddingTop: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F8F8",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: "rgba(17, 122, 122, 0.15)",
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500" as const,
    color: "#1A1A1A",
    paddingVertical: 12,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
    gap: 12,
  },
  emptyStateText: {
    fontSize: 15,
    fontWeight: "500" as const,
    color: "#7A9E9E",
    textAlign: "center",
  },
  warningBanner: {
    backgroundColor: "#FFF3E0",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#E67E22",
  },
  warningText: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "#795548",
    lineHeight: 20,
  },
  districtContainer: {
    marginBottom: 12,
  },
  districtHeader: {
    backgroundColor: "#117A7A",
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 2px 8px rgba(17, 122, 122, 0.2)",
    elevation: 3,
  },
  districtName: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  districtContent: {
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  entryContainer: {
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(17, 122, 122, 0.1)",
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    paddingHorizontal: 16,
  },
  entryMunicipality: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    flex: 1,
  },
  entryContent: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 12,
  },
  hotlineCategory: {
    backgroundColor: "#F8FFFE",
    borderRadius: 10,
    padding: 12,
  },
  hotlineCategoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  hotlineCategoryLabel: {
    fontSize: 13,
    fontWeight: "700" as const,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  },
  hotlineSubLabel: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: "#666",
    marginBottom: 4,
    marginLeft: 22,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginLeft: 16,
  },
  phoneNumber: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: "#117A7A",
  },
});
