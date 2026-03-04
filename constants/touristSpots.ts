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
  images: string[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  website?: string;
  contact?: string;
}

export const touristSpots: TouristSpot[] = [
  {
    id: "1",
    name: "Minalungao National Park",
    location: "General Tinio, Nueva Ecija",
    description:
      "A stunning natural park featuring limestone formations, crystal-clear waters, and lush greenery. Perfect for swimming, kayaking, and nature photography. The Peñaranda River flows through towering rock walls creating a breathtaking gorge.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    coordinates: {
      latitude: 15.3611,
      longitude: 121.0514,
    },
    category: "adventure",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    ],
    socialMedia: {
      facebook: "https://facebook.com/minalungao",
      instagram: "https://instagram.com/minalungao",
    },
    contact: "+63 912 345 6789",
  },
  {
    id: "2",
    name: "Pantabangan Lake",
    location: "Pantabangan, Nueva Ecija",
    description:
      "The largest man-made lake in Southeast Asia, offering serene views, island hopping, and various water activities. A perfect spot for relaxation and adventure seekers alike.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    coordinates: {
      latitude: 15.8167,
      longitude: 121.1167,
    },
    category: "adventure",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    ],
    socialMedia: {
      facebook: "https://facebook.com/pantabanganlake",
    },
    contact: "+63 923 456 7890",
  },
  {
    id: "3",
    name: "Gabaldon Falls",
    location: "Gabaldon, Nueva Ecija",
    description:
      "A hidden gem featuring multiple waterfalls cascading into natural pools. Surrounded by lush forest, it's an ideal destination for nature lovers and adventure enthusiasts.",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
    coordinates: {
      latitude: 15.5667,
      longitude: 121.3333,
    },
    category: "adventure",
    images: [
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    socialMedia: {
      instagram: "https://instagram.com/gabaldonfalls",
    },
    contact: "+63 934 567 8901",
  },
  {
    id: "4",
    name: "Nuestra Señora de la Asunción Church",
    location: "Cabiao, Nueva Ecija",
    description:
      "A historic Spanish colonial church built in the 18th century. Known for its beautiful baroque architecture and rich religious heritage.",
    image: "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
    coordinates: {
      latitude: 15.2456,
      longitude: 120.8544,
    },
    category: "faith",
    images: [
      "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
      "https://images.unsplash.com/photo-1605128410556-61b9fc44c0e7?w=800",
      "https://images.unsplash.com/photo-1606502709776-04c9d8d78b39?w=800",
    ],
    socialMedia: {
      facebook: "https://facebook.com/cabiaoparish",
    },
    contact: "+63 945 678 9012",
  },
  {
    id: "5",
    name: "Kakanin Village",
    location: "Cabanatuan City, Nueva Ecija",
    description:
      "Experience authentic Filipino rice cakes and delicacies. A must-visit for food enthusiasts wanting to taste traditional kakanin made with local ingredients.",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
    coordinates: {
      latitude: 15.4906,
      longitude: 120.9803,
    },
    category: "food",
    images: [
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
      "https://images.unsplash.com/photo-1606502709776-04c9d8d78b39?w=800",
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
    ],
    socialMedia: {
      facebook: "https://facebook.com/kakaninvillage",
      instagram: "https://instagram.com/kakaninvillage",
    },
    website: "https://kakaninvillage.com",
    contact: "+63 956 789 0123",
  },
  {
    id: "6",
    name: "Bantug Lake Ranch",
    location: "San Jose City, Nueva Ecija",
    description:
      "A beautiful ranch resort offering horseback riding, fishing, and various outdoor activities. Perfect for family fun and relaxation.",
    image: "https://images.unsplash.com/photo-1542978709-b7d3e32d2ff6?w=800",
    coordinates: {
      latitude: 15.7739,
      longitude: 120.9897,
    },
    category: "fun",
    images: [
      "https://images.unsplash.com/photo-1542978709-b7d3e32d2ff6?w=800",
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    socialMedia: {
      facebook: "https://facebook.com/bantuglakeranch",
      instagram: "https://instagram.com/bantuglakeranch",
    },
    website: "https://bantuglakeranch.com",
    contact: "+63 967 890 1234",
  },
  {
    id: "7",
    name: "Nueva Ecija Museum",
    location: "Palayan City, Nueva Ecija",
    description:
      "Discover the rich history and culture of Nueva Ecija through artifacts, exhibits, and educational displays. A great learning experience for all ages.",
    image: "https://images.unsplash.com/photo-1544785349-c4a5301826fd?w=800",
    coordinates: {
      latitude: 15.5403,
      longitude: 121.0869,
    },
    category: "learning",
    images: [
      "https://images.unsplash.com/photo-1544785349-c4a5301826fd?w=800",
      "https://images.unsplash.com/photo-1566127444c25-35b4f0e89e6e?w=800",
      "https://images.unsplash.com/photo-1569930784237-9e17ff5c3d84?w=800",
    ],
    socialMedia: {
      facebook: "https://facebook.com/nuevaecijamuseum",
    },
    contact: "+63 978 901 2345",
  },
  {
    id: "8",
    name: "Dupinga River",
    location: "Carranglan, Nueva Ecija",
    description:
      "A pristine river surrounded by lush forests and mountains. Perfect for adventure seekers and nature lovers looking for an off-the-beaten-path destination.",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    coordinates: {
      latitude: 15.9167,
      longitude: 121.1333,
    },
    category: "adventure",
    images: [
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    contact: "+63 989 012 3456",
  },
  {
    id: "9",
    name: "Cabu Bridge",
    location: "San Antonio, Nueva Ecija",
    description:
      "An iconic landmark bridge offering scenic views of the river below. A popular spot for photography and sightseeing.",
    image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800",
    coordinates: {
      latitude: 15.2500,
      longitude: 121.0167,
    },
    category: "adventure",
    images: [
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
    ],
    contact: "+63 990 123 4567",
  },
  {
    id: "10",
    name: "Our Lady of Purification Church",
    location: "San Isidro, Nueva Ecija",
    description:
      "A beautiful heritage church with stunning architecture and deep religious significance to the local community.",
    image: "https://images.unsplash.com/photo-1605128410556-61b9fc44c0e7?w=800",
    coordinates: {
      latitude: 15.4000,
      longitude: 120.9500,
    },
    category: "faith",
    images: [
      "https://images.unsplash.com/photo-1605128410556-61b9fc44c0e7?w=800",
      "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
      "https://images.unsplash.com/photo-1606502709776-04c9d8d78b39?w=800",
    ],
    socialMedia: {
      facebook: "https://facebook.com/sanisidroparish",
    },
    contact: "+63 901 234 5678",
  },
  {
    id: "11",
    name: "St. Nicholas of Tolentino Church",
    location: "San Nicolas, Nueva Ecija",
    description:
      "Historic parish church featuring beautiful colonial architecture and religious artifacts.",
    image: "https://images.unsplash.com/photo-1606502709776-04c9d8d78b39?w=800",
    coordinates: {
      latitude: 15.3333,
      longitude: 120.8667,
    },
    category: "faith",
    images: [
      "https://images.unsplash.com/photo-1606502709776-04c9d8d78b39?w=800",
      "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
      "https://images.unsplash.com/photo-1605128410556-61b9fc44c0e7?w=800",
    ],
    contact: "+63 912 345 6780",
  },
  {
    id: "12",
    name: "Sinangkalan Food Park",
    location: "Cabanatuan City, Nueva Ecija",
    description:
      "A vibrant food hub featuring local delicacies, street food, and authentic Filipino cuisine in a lively atmosphere.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    coordinates: {
      latitude: 15.4850,
      longitude: 120.9700,
    },
    category: "food",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
    ],
    socialMedia: {
      facebook: "https://facebook.com/sinangkalanfoodpark",
      instagram: "https://instagram.com/sinangkalanfoodpark",
    },
    contact: "+63 923 456 7801",
  },
  {
    id: "13",
    name: "Nueva Ecija Provincial Capitol",
    location: "Palayan City, Nueva Ecija",
    description:
      "The seat of provincial government with impressive modern architecture and beautiful landscaping.",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800",
    coordinates: {
      latitude: 15.5403,
      longitude: 121.0869,
    },
    category: "learning",
    images: [
      "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800",
      "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800",
      "https://images.unsplash.com/photo-1544785349-c4a5301826fd?w=800",
    ],
    contact: "+63 934 567 8902",
  },
  {
    id: "14",
    name: "Aqua Planet",
    location: "Talavera, Nueva Ecija",
    description:
      "A fun-filled water park perfect for families, featuring exciting water slides, wave pools, and relaxation areas.",
    image: "https://images.unsplash.com/photo-1542978709-b7d3e32d2ff6?w=800",
    coordinates: {
      latitude: 15.5833,
      longitude: 120.9167,
    },
    category: "fun",
    images: [
      "https://images.unsplash.com/photo-1542978709-b7d3e32d2ff6?w=800",
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    socialMedia: {
      facebook: "https://facebook.com/aquaplanetph",
      instagram: "https://instagram.com/aquaplanetph",
    },
    website: "https://aquaplanet.com.ph",
    contact: "+63 945 678 9023",
  },
  {
    id: "15",
    name: "Hilltop Adventure",
    location: "General Tinio, Nueva Ecija",
    description:
      "An adventure park offering zipline, wall climbing, ATV rides, and other outdoor activities for thrill-seekers.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
    coordinates: {
      latitude: 15.3500,
      longitude: 121.0400,
    },
    category: "fun",
    images: [
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
      "https://images.unsplash.com/photo-1542978709-b7d3e32d2ff6?w=800",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    ],
    socialMedia: {
      facebook: "https://facebook.com/hilltopadventurene",
    },
    contact: "+63 956 789 0234",
  },
];
