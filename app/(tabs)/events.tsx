import React, { useEffect, useRef, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Calendar, Clock, MapPin, ChevronRight, Sparkles } from "lucide-react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { upcomingEvents, eventCategoryColors, Event } from "@/constants/events";

type FilterType = "all" | "upcoming" | "this_month" | "featured";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function getDayNumber(dateStr: string): string {
  return new Date(dateStr).getDate().toString();
}

function getMonthShort(dateStr: string): string {
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
  ];
  return months[new Date(dateStr).getMonth()];
}

export default function EventsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "upcoming", label: "Upcoming" },
    { key: "this_month", label: "This Month" },
    { key: "featured", label: "Featured" },
  ];

  const filteredEvents = useMemo(() => {
    const now = new Date();
    const sorted = [...upcomingEvents].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    switch (activeFilter) {
      case "upcoming":
        return sorted.filter((e) => new Date(e.date) >= now);
      case "this_month":
        return sorted.filter((e) => {
          const d = new Date(e.date);
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });
      case "featured":
        return sorted.filter((e) => e.isFeatured);
      default:
        return sorted;
    }
  }, [activeFilter]);

  const featuredEvents = useMemo(
    () => upcomingEvents.filter((e) => e.isFeatured),
    []
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const renderFeaturedCard = (event: Event, index: number) => {
    const colors = eventCategoryColors[event.category] || eventCategoryColors.festival;
    return (
      <TouchableOpacity
        key={event.id}
        style={styles.featuredCard}
        activeOpacity={0.9}
        onPress={() => router.push(`/event/${event.id}` as any)}
      >
        <Image source={{ uri: event.image }} style={styles.featuredImage} />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.85)"]}
          style={styles.featuredGradient}
        >
          <View style={styles.featuredContent}>
            <View style={[styles.categoryBadge, { backgroundColor: colors.bg }]}>
              <Text style={[styles.categoryBadgeText, { color: colors.text }]}>
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </Text>
            </View>
            <Text style={styles.featuredTitle} numberOfLines={2}>
              {event.title}
            </Text>
            <View style={styles.featuredMeta}>
              <View style={styles.metaRow}>
                <Calendar size={13} color="#FFFFFF" />
                <Text style={styles.featuredMetaText}>{formatDate(event.date)}</Text>
              </View>
              <View style={styles.metaRow}>
                <MapPin size={13} color="#FFFFFF" />
                <Text style={styles.featuredMetaText} numberOfLines={1}>
                  {event.location}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderEventCard = (event: Event, index: number) => {
    const colors = eventCategoryColors[event.category] || eventCategoryColors.festival;
    return (
      <Animated.View
        key={event.id}
        style={[
          styles.eventCardWrapper,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30 + index * 10, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.eventCard}
          activeOpacity={0.85}
          onPress={() => router.push(`/event/${event.id}` as any)}
        >
          <View style={styles.dateBlock}>
            <Text style={styles.dateDay}>{getDayNumber(event.date)}</Text>
            <Text style={styles.dateMonth}>{getMonthShort(event.date)}</Text>
          </View>

          <Image source={{ uri: event.image }} style={styles.eventThumb} />

          <View style={styles.eventInfo}>
            <View style={[styles.categoryTag, { backgroundColor: colors.bg }]}>
              <Text style={[styles.categoryTagText, { color: colors.text }]}>
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </Text>
            </View>
            <Text style={styles.eventTitle} numberOfLines={2}>
              {event.title}
            </Text>
            <View style={styles.eventMetaRow}>
              <Clock size={12} color="#888" />
              <Text style={styles.eventMetaText}>{event.time}</Text>
            </View>
            <View style={styles.eventMetaRow}>
              <MapPin size={12} color="#888" />
              <Text style={styles.eventMetaText} numberOfLines={1}>
                {event.venue}
              </Text>
            </View>
          </View>

          <View style={styles.chevronContainer}>
            <ChevronRight size={18} color="#CCC" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={["#FFFFFF", "#F8FFFE", "#FFFFFF"]}
        style={styles.backgroundGradient}
      />

      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Events</Text>
            <Text style={styles.headerSubtitle}>
              {filteredEvents.length} upcoming {filteredEvents.length === 1 ? "event" : "events"}
            </Text>
          </View>
          <View style={styles.headerIconBg}>
            <Sparkles size={22} color="#117A7A" />
          </View>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                activeFilter === filter.key && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(filter.key)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterChipText,
                  activeFilter === filter.key && styles.filterChipTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {activeFilter === "all" && featuredEvents.length > 0 && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionLabel}>Featured Events</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredScroll}
              decelerationRate="fast"
              snapToInterval={300}
            >
              {featuredEvents.map((event, idx) => renderFeaturedCard(event, idx))}
            </ScrollView>
          </View>
        )}

        <View style={styles.listSection}>
          {activeFilter === "all" && (
            <Text style={styles.sectionLabel}>All Events</Text>
          )}
          {filteredEvents.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Calendar size={56} color="#D0D0D0" />
              <Text style={styles.emptyTitle}>No Events Found</Text>
              <Text style={styles.emptyText}>
                Check back soon for upcoming events in Nueva Ecija
              </Text>
            </View>
          ) : (
            filteredEvents.map((event, idx) => renderEventCard(event, idx))
          )}
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: "#117A7A",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: "500" as const,
    color: "#5A9B9B",
  },
  headerIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    paddingBottom: 8,
  },
  filterScroll: {
    paddingHorizontal: 24,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#F2F2F2",
  },
  filterChipActive: {
    backgroundColor: "#117A7A",
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#666",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
  },
  featuredSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    paddingHorizontal: 24,
    marginBottom: 14,
  },
  featuredScroll: {
    paddingHorizontal: 24,
    gap: 16,
  },
  featuredCard: {
    width: 280,
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  featuredImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  featuredGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "70%",
    justifyContent: "flex-end",
    padding: 16,
  },
  featuredContent: {
    gap: 6,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: "700" as const,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  featuredMeta: {
    gap: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  featuredMetaText: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.9,
    fontWeight: "500" as const,
  },
  listSection: {
    paddingHorizontal: 24,
  },
  eventCardWrapper: {
    marginBottom: 14,
  },
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    shadowColor: "#117A7A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(17, 122, 122, 0.06)",
    gap: 12,
  },
  dateBlock: {
    width: 50,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#117A7A",
    justifyContent: "center",
    alignItems: "center",
  },
  dateDay: {
    fontSize: 22,
    fontWeight: "800" as const,
    color: "#FFFFFF",
    lineHeight: 26,
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: "700" as const,
    color: "rgba(255,255,255,0.85)",
    letterSpacing: 1,
  },
  eventThumb: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#F0F0F0",
  },
  eventInfo: {
    flex: 1,
    gap: 3,
  },
  categoryTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 1,
  },
  categoryTagText: {
    fontSize: 10,
    fontWeight: "700" as const,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    lineHeight: 20,
  },
  eventMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  eventMetaText: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500" as const,
    flex: 1,
  },
  chevronContainer: {
    paddingLeft: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#666666",
    marginTop: 18,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 15,
    color: "#999999",
    textAlign: "center",
    lineHeight: 22,
  },
});
