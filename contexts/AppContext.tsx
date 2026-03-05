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

interface ExploreState {
  exploredSpots: string[];
  favorites: string[];
}

const STORAGE_KEY = "@nueva_ecija_app_state";

export const [AppProvider, useAppContext] = createContextHook(() => {
  const [exploredSpots, setExploredSpots] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
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
      }
    } catch (error) {
      console.error("Failed to load state:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveState = async (newExplored: string[], newFavorites: string[]) => {
    try {
      const state: ExploreState = {
        exploredSpots: newExplored,
        favorites: newFavorites,
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

  return {
    exploredSpots,
    favorites,
    isLoading,
    toggleFavorite,
    markAsExplored,
    toggleExplored,
    isFavorite,
    isExplored,
  };
});
