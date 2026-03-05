import { ImageSource } from './imageHelper';
import { touristSpots } from '@/constants/touristSpots';
import { municipalities } from '@/constants/municipalities';
import { upcomingEvents } from '@/constants/events';
import { categoryData } from '@/constants/categoryItems';

export interface FavoriteItem {
  id: string;
  name: string;
  location: string;
  image: ImageSource;
  route: string;
}

export function findFavoriteItem(id: string): FavoriteItem | null {
  const spot = touristSpots.find(s => s.id === id);
  if (spot) {
    return {
      id: spot.id,
      name: spot.name,
      location: spot.location,
      image: spot.image,
      route: `/spot/${spot.id}`,
    };
  }

  for (const m of municipalities) {
    const place = m.places.find(p => p.id === id);
    if (place) {
      return {
        id: place.id,
        name: place.name,
        location: m.name,
        image: place.image,
        route: `/place/${place.id}?cityId=${m.id}`,
      };
    }
  }

  const event = upcomingEvents.find(e => e.id === id);
  if (event) {
    return {
      id: event.id,
      name: event.title,
      location: event.location,
      image: event.image,
      route: `/event/${event.id}`,
    };
  }

  for (const key of Object.keys(categoryData)) {
    const item = categoryData[key].items.find(i => i.id === id);
    if (item) {
      return {
        id: item.id,
        name: item.name,
        location: item.location,
        image: item.image,
        route: `/categories/${key}`,
      };
    }
  }

  return null;
}

export function getAllFavoriteItems(favoriteIds: string[]): FavoriteItem[] {
  return favoriteIds
    .map(id => findFavoriteItem(id))
    .filter((item): item is FavoriteItem => item !== null);
}

export function collectAllImageUrls(): string[] {
  const urls: string[] = [];

  for (const spot of touristSpots) {
    if (typeof spot.image === 'string') urls.push(spot.image);
    for (const img of spot.images) {
      if (typeof img === 'string' && !urls.includes(img)) urls.push(img);
    }
  }

  for (const m of municipalities) {
    if (typeof m.image === 'string') urls.push(m.image);
    for (const p of m.places) {
      if (typeof p.image === 'string' && !urls.includes(p.image)) urls.push(p.image);
    }
  }

  for (const e of upcomingEvents) {
    if (!urls.includes(e.image)) urls.push(e.image);
  }

  for (const key of Object.keys(categoryData)) {
    for (const item of categoryData[key].items) {
      if (typeof item.image === 'string' && !urls.includes(item.image)) {
        urls.push(item.image);
      }
    }
  }

  return [...new Set(urls)];
}
