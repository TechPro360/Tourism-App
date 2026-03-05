import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, Stack } from "expo-router";
import {
  ArrowLeft,
  Bell,
  BellOff,
  Calendar,
  Clock,
  MapPin,
  Trash2,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppContext } from "@/contexts/AppContext";
import { upcomingEvents, eventCategoryColors } from "@/constants/events";
import NotifySheet from "@/components/NotifySheet";
import ActionToast from "@/components/ActionToast";

const NOTIFY_LABELS: Record<string, string> = {
  day: "1 day before",
  week: "1 week before",
  month: "1 month before",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export default function NotificationEventsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {
    eventNotifications,
    setEventNotification,
    removeEventNotification,
  } = useAppContext();

  const [notifyVisible, setNotifyVisible] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedEventTitle, setSelectedEventTitle] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIcon, setToastIcon] = useState<React.ReactNode>(null);

  const showToast = useCallback((icon: React.ReactNode, message: string) => {
    setToastIcon(icon);
    setToastMessage(message);
    setToastVisible(true);
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [fadeAnim]);

  const notifiedEvents = eventNotifications
    .map((n) => {
      const event = upcomingEvents.find((e) => e.id === n.eventId);
      return event ? { ...event, notifyOption: n.option } : null;
    })
    .filter(Boolean) as (typeof upcomingEvents[number] & { notifyOption: string })[];

  const handleChangeNotify = (eventId: string, title: string) => {
    setSelectedEventId(eventId);
    setSelectedEventTitle(title);
    setNotifyVisible(true);
  };

  const handleNotifySelect = (option: string) => {
    if (selectedEventId) {
      if (option) {
        setEventNotification(selectedEventId, option);
        showToast(
          <Bell size={28} color="#FFFFFF" />,
          `Reminder updated: ${NOTIFY_LABELS[option] || option}`
        );
      } else {
        removeEventNotification(selectedEventId);
        showToast(
          <BellOff size={28} color="#FFFFFF" />,
          "Reminder removed"
        );
      }
    }
  };

  const handleRemove = (eventId: string) => {
    removeEventNotification(eventId);
    showToast(
      <BellOff size={28} color="#FFFFFF" />,
      "Reminder removed"
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, animation: "slide_from_right" }} />

      <LinearGradient
        colors={["#FFFFFF", "#F8FFFE", "#FFFFFF"]}
        style={styles.backgroundGradient}
      />

      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color="#117A7A" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Event Reminders</Text>
          <Text style={styles.headerSubtitle}>
            {notifiedEvents.length} {notifiedEvents.length === 1 ? "event" : "events"} with reminders
          </Text>
        </View>
        <View style={styles.headerIconBg}>
          <Bell size={20} color="#117A7A" />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {notifiedEvents.length === 0 ? (
          <Animated.View style={[styles.emptyContainer, { opacity: fadeAnim }]}>
            <View style={styles.emptyIconBg}>
              <BellOff size={48} color="#C8DEDE" />
            </View>
            <Text style={styles.emptyTitle}>No Reminders Set</Text>
            <Text style={styles.emptyText}>
              Set reminders on events to get notified before they happen
            </Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Text style={styles.browseButtonText}>Browse Events</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          notifiedEvents.map((event, index) => {
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
                          outputRange: [20 + index * 10, 0],
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
                      <Calendar size={12} color="#888" />
                      <Text style={styles.eventMetaText}>{formatDate(event.date)}</Text>
                    </View>
                    <View style={styles.eventMetaRow}>
                      <MapPin size={12} color="#888" />
                      <Text style={styles.eventMetaText} numberOfLines={1}>
                        {event.venue}
                      </Text>
                    </View>

                    <View style={styles.reminderRow}>
                      <View style={styles.reminderBadge}>
                        <Bell size={12} color="#117A7A" />
                        <Text style={styles.reminderText}>
                          {NOTIFY_LABELS[event.notifyOption] || event.notifyOption}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={styles.changeBtn}
                      onPress={() => handleChangeNotify(event.id, event.title)}
                      activeOpacity={0.7}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Clock size={16} color="#117A7A" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={() => handleRemove(event.id)}
                      activeOpacity={0.7}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Trash2 size={16} color="#E94444" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })
        )}
      </ScrollView>

      <NotifySheet
        visible={notifyVisible}
        onClose={() => setNotifyVisible(false)}
        eventTitle={selectedEventTitle}
        onSelect={handleNotifySelect}
      />

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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E8F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800" as const,
    color: "#1A1A1A",
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: "500" as const,
    color: "#5A9B9B",
    marginTop: 2,
  },
  headerIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E8F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIconBg: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#E8F6F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#5A7A7A",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 15,
    color: "#9CBCBC",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  browseButton: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    backgroundColor: "#117A7A",
    borderRadius: 14,
  },
  browseButtonText: {
    fontSize: 15,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  eventCardWrapper: {
    marginBottom: 14,
  },
  eventCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    boxShadow: "0px 2px 10px rgba(17, 122, 122, 0.08)",
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(17, 122, 122, 0.06)",
    gap: 12,
  },
  eventThumb: {
    width: 64,
    height: 80,
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
    textTransform: "uppercase" as const,
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
  reminderRow: {
    marginTop: 4,
  },
  reminderBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#E8F6F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  reminderText: {
    fontSize: 11,
    fontWeight: "600" as const,
    color: "#117A7A",
  },
  cardActions: {
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  changeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E8F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  removeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFECEC",
    justifyContent: "center",
    alignItems: "center",
  },
});
