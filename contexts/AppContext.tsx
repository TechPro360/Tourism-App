import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useCallback } from "react";

export interface TouristSpot {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  category: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  website?: string;
  contact?: string;
}

interface EventNotification {
  eventId: string;
  option: string;
}

interface ExploreState {
  exploredSpots: string[];
  favorites: string[];
  eventNotifications: EventNotification[];
}

const STORAGE_KEY = "@nueva_ecija_app_state";

export interface EventNotificationData {
  eventId: string;
  option: string;
}

export const [AppProvider, useAppContext] = createContextHook(() => {
  const [exploredSpots, setExploredSpots] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [eventNotifications, setEventNotifications] = useState<EventNotificationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadState();
  }, []);

  const loadState = async () => {
    try {
      const storedState = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedState) {
        const state: ExploreState = JSON.parse(storedState);
        setExploredSpots(state.exploredSpots || []);
        setFavorites(state.favorites || []);
        setEventNotifications(state.eventNotifications || []);
      }
    } catch (error) {
      console.error("Failed to load state:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveState = async (newExplored: string[], newFavorites: string[], newNotifications?: EventNotificationData[]) => {
    try {
      const state: ExploreState = {
        exploredSpots: newExplored,
        favorites: newFavorites,
        eventNotifications: newNotifications ?? eventNotifications,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save state:", error);
    }
  };

  const toggleFavorite = useCallback(
    (spotId: string) => {
      setFavorites((prev) => {
        const newFavorites = prev.includes(spotId)
          ? prev.filter((id) => id !== spotId)
          : [...prev, spotId];
        saveState(exploredSpots, newFavorites);
        return newFavorites;
      });
    },
    [exploredSpots]
  );

  const markAsExplored = useCallback(
    (spotId: string) => {
      setExploredSpots((prev) => {
        if (prev.includes(spotId)) return prev;
        const newExplored = [...prev, spotId];
        saveState(newExplored, favorites);
        return newExplored;
      });
    },
    [favorites]
  );

  const toggleExplored = useCallback(
    (spotId: string) => {
      setExploredSpots((prev) => {
        const newExplored = prev.includes(spotId)
          ? prev.filter((id) => id !== spotId)
          : [...prev, spotId];
        saveState(newExplored, favorites);
        return newExplored;
      });
    },
    [favorites]
  );

  const isFavorite = useCallback(
    (spotId: string) => favorites.includes(spotId),
    [favorites]
  );

  const isExplored = useCallback(
    (spotId: string) => exploredSpots.includes(spotId),
    [exploredSpots]
  );

  const setEventNotification = useCallback(
    (eventId: string, option: string) => {
      setEventNotifications((prev) => {
        let updated: EventNotificationData[];
        if (!option) {
          updated = prev.filter((n) => n.eventId !== eventId);
        } else {
          const existing = prev.findIndex((n) => n.eventId === eventId);
          if (existing >= 0) {
            updated = prev.map((n) => n.eventId === eventId ? { eventId, option } : n);
          } else {
            updated = [...prev, { eventId, option }];
          }
        }
        saveState(exploredSpots, favorites, updated);
        return updated;
      });
    },
    [exploredSpots, favorites]
  );

  const removeEventNotification = useCallback(
    (eventId: string) => {
      setEventNotifications((prev) => {
        const updated = prev.filter((n) => n.eventId !== eventId);
        saveState(exploredSpots, favorites, updated);
        return updated;
      });
    },
    [exploredSpots, favorites]
  );

  const getEventNotification = useCallback(
    (eventId: string) => eventNotifications.find((n) => n.eventId === eventId)?.option || null,
    [eventNotifications]
  );

  return {
    exploredSpots,
    favorites,
    eventNotifications,
    isLoading,
    toggleFavorite,
    markAsExplored,
    toggleExplored,
    isFavorite,
    isExplored,
    setEventNotification,
    removeEventNotification,
    getEventNotification,
  };
});
