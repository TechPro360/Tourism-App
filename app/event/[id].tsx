import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Linking,
  Platform,
  Share,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Share2,
  Tag,
  Users,
} from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { upcomingEvents, eventCategoryColors } from "@/constants/events";

function formatFullDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  ];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function getDaysUntil(dateStr: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const eventDate = new Date(dateStr);
  eventDate.setHours(0, 0, 0, 0);
  return Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const heroScale = useRef(new Animated.Value(1.1)).current;

  const event = upcomingEvents.find((e) => e.id === id);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(heroScale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, heroScale]);

  if (!event) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Event not found</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const colors = eventCategoryColors[event.category] || eventCategoryColors.festival;
  const daysUntil = getDaysUntil(event.date);

  const handleCall = () => {
    if (event.contact) {
      Linking.openURL(`tel:${event.contact}`);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${event.title} on ${formatFullDate(event.date)} at ${event.venue}, ${event.location}!`,
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  const handleOpenMap = () => {
    const query = encodeURIComponent(`${event.venue}, ${event.location}`);
    if (Platform.OS === "ios") {
      Linking.openURL(`maps:?q=${query}`);
    } else if (Platform.OS === "android") {
      Linking.openURL(`geo:0,0?q=${query}`);
    } else {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroContainer}>
          <Animated.Image
            source={{ uri: event.image }}
            style={[styles.heroImage, { transform: [{ scale: heroScale }] }]}
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "transparent", "rgba(0,0,0,0.7)"]}
            locations={[0, 0.3, 1]}
            style={styles.heroGradient}
          />

          <View style={[styles.heroTopBar, { paddingTop: insets.top + 8 }]}>
            <TouchableOpacity
              style={styles.heroBackBtn}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <ArrowLeft size={22} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.heroShareBtn}
              onPress={handleShare}
              activeOpacity={0.8}
            >
              <Share2 size={20} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.heroBottom}>
            <View style={[styles.categoryPill, { backgroundColor: colors.bg }]}>
              <Text style={[styles.categoryPillText, { color: colors.text }]}>
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </Text>
            </View>
            <Text style={styles.heroTitle}>{event.title}</Text>
            {daysUntil > 0 && (
              <View style={styles.countdownRow}>
                <View style={styles.countdownBadge}>
                  <Text style={styles.countdownText}>
                    {daysUntil === 1 ? "Tomorrow" : `In ${daysUntil} days`}
                  </Text>
                </View>
              </View>
            )}
            {daysUntil === 0 && (
              <View style={styles.countdownRow}>
                <View style={[styles.countdownBadge, { backgroundColor: "#E94444" }]}>
                  <Text style={styles.countdownText}>Happening Today!</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.infoCardsRow}>
            <View style={styles.infoCard}>
              <View style={[styles.infoCardIcon, { backgroundColor: "#E8F6F6" }]}>
                <Calendar size={20} color="#117A7A" />
              </View>
              <Text style={styles.infoCardLabel}>Date</Text>
              <Text style={styles.infoCardValue}>{formatFullDate(event.date)}</Text>
            </View>

            <View style={styles.infoCard}>
              <View style={[styles.infoCardIcon, { backgroundColor: "#FFF3E0" }]}>
                <Clock size={20} color="#E65100" />
              </View>
              <Text style={styles.infoCardLabel}>Time</Text>
              <Text style={styles.infoCardValue}>
                {event.time}
                {event.endTime ? `\n– ${event.endTime}` : ""}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.locationCard}
            activeOpacity={0.8}
            onPress={handleOpenMap}
          >
            <View style={[styles.locationIconBg, { backgroundColor: "#E3F2FD" }]}>
              <MapPin size={22} color="#1565C0" />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationVenue}>{event.venue}</Text>
              <Text style={styles.locationAddress}>{event.location}</Text>
            </View>
            <Text style={styles.mapLink}>Map</Text>
          </TouchableOpacity>

          <View style={styles.detailsRow}>
            {event.price && (
              <View style={styles.detailChip}>
                <Tag size={14} color="#117A7A" />
                <Text style={styles.detailChipText}>{event.price}</Text>
              </View>
            )}
            <View style={styles.detailChip}>
              <Users size={14} color="#117A7A" />
              <Text style={styles.detailChipText}>{event.organizer}</Text>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionLabel}>About This Event</Text>
            <Text style={styles.descriptionText}>{event.description}</Text>
          </View>

          {event.contact && (
            <TouchableOpacity
              style={styles.contactButton}
              activeOpacity={0.85}
              onPress={handleCall}
            >
              <Phone size={20} color="#FFFFFF" />
              <Text style={styles.contactButtonText}>Contact Organizer</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "#666",
    marginBottom: 16,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#117A7A",
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFFFFF",
  },
  heroContainer: {
    height: 340,
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heroGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  heroTopBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  heroBackBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  heroShareBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  heroBottom: {
    position: "absolute",
    bottom: 24,
    left: 24,
    right: 24,
    gap: 8,
  },
  categoryPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: "700" as const,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800" as const,
    color: "#FFFFFF",
    letterSpacing: 0.3,
    lineHeight: 34,
  },
  countdownRow: {
    flexDirection: "row",
  },
  countdownBadge: {
    backgroundColor: "#117A7A",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
  countdownText: {
    fontSize: 12,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  contentContainer: {
    padding: 24,
    gap: 20,
    marginTop: -16,
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  infoCardsRow: {
    flexDirection: "row",
    gap: 14,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  infoCardIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  infoCardLabel: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  infoCardValue: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#1A1A1A",
    textAlign: "center",
    lineHeight: 20,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  locationIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  locationInfo: {
    flex: 1,
    gap: 2,
  },
  locationVenue: {
    fontSize: 15,
    fontWeight: "700" as const,
    color: "#1A1A1A",
  },
  locationAddress: {
    fontSize: 13,
    fontWeight: "500" as const,
    color: "#888",
  },
  mapLink: {
    fontSize: 13,
    fontWeight: "700" as const,
    color: "#1565C0",
  },
  detailsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  detailChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E8F6F6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  detailChipText: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: "#117A7A",
  },
  descriptionSection: {
    gap: 10,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1A1A1A",
  },
  descriptionText: {
    fontSize: 15,
    fontWeight: "400" as const,
    color: "#555",
    lineHeight: 24,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#117A7A",
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#117A7A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
});
