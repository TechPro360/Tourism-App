import { ImageSource } from '@/utils/imageHelper';

export interface Place {
  id: string;
  name: string;
  description: string;
  image: ImageSource;
  images: ImageSource[];
  category: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contact?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface Municipality {
  id: string;
  name: string;
  type: "city" | "municipality";
  description: string;
  image: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  places: Place[];
}

export const municipalities: Municipality[] = [
  {
    id: "cabanatuan",
    name: "Cabanatuan City",
    type: "city",
    description: "The largest city in Nueva Ecija, known as the 'Tricycle Capital of the Philippines' and a major commercial hub.",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800",
    coordinates: { latitude: 15.4906, longitude: 120.9803 },
    places: [
      {
        id: "cab-1",
        name: "Kakanin Village",
        description: "Experience authentic Filipino rice cakes and delicacies. A must-visit for food enthusiasts wanting to taste traditional kakanin made with local ingredients.",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
        images: [
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
          "https://images.unsplash.com/photo-1606502709776-04c9d8d78b39?w=800",
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
        ],
        category: "food",
        coordinates: { latitude: 15.4906, longitude: 120.9803 },
        contact: "+63 956 789 0123",
        socialMedia: { facebook: "https://facebook.com/kakaninvillage" },
      },
      {
        id: "cab-2",
        name: "Sinangkalan Food Park",
        description: "A vibrant food hub featuring local delicacies, street food, and authentic Filipino cuisine in a lively atmosphere.",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
        images: [
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
        ],
        category: "food",
        coordinates: { latitude: 15.4850, longitude: 120.9700 },
        contact: "+63 923 456 7801",
        socialMedia: { facebook: "https://facebook.com/sinangkalanfoodpark" },
      },
      {
        id: "cab-3",
        name: "Freedom Park",
        description: "A historic park commemorating the liberation of prisoners during World War II. Features monuments and peaceful gardens.",
        image: "https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=800",
        images: [
          "https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=800",
          "https://images.unsplash.com/photo-1544785349-c4a5301826fd?w=800",
        ],
        category: "historical",
        coordinates: { latitude: 15.4870, longitude: 120.9750 },
      },
      {
        id: "cab-4",
        name: "Old Cabanatuan City Hall",
        description: "A heritage structure showcasing early 20th century Filipino architecture and local government history.",
        image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800",
        images: [
          "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800",
          "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800",
        ],
        category: "historical",
        coordinates: { latitude: 15.4890, longitude: 120.9780 },
      },
    ],
  },
  {
    id: "gapan",
    name: "Gapan City",
    type: "city",
    description: "One of the oldest towns in Nueva Ecija, rich in history and cultural heritage with Spanish-era architecture.",
    image: "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
    coordinates: { latitude: 15.3000, longitude: 120.9500 },
    places: [
      {
        id: "gap-1",
        name: "Gapan Church (San Vicente Ferrer Parish)",
        description: "A historic Spanish colonial church built in the 16th century, one of the oldest in Nueva Ecija with beautiful baroque architecture.",
        image: "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
        images: [
          "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
          "https://images.unsplash.com/photo-1605128410556-61b9fc44c0e7?w=800",
        ],
        category: "faith",
        coordinates: { latitude: 15.3050, longitude: 120.9510 },
        socialMedia: { facebook: "https://facebook.com/gapanchurch" },
      },
      {
        id: "gap-2",
        name: "Gapan Heritage Houses",
        description: "Well-preserved ancestral houses from the Spanish colonial era showcasing traditional Filipino-Spanish architecture.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800",
        ],
        category: "historical",
        coordinates: { latitude: 15.3020, longitude: 120.9480 },
      },
    ],
  },
  {
    id: "palayan",
    name: "Palayan City",
    type: "city",
    description: "The capital city of Nueva Ecija, home to the provincial government and known for its planned urban layout.",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800",
    coordinates: { latitude: 15.5403, longitude: 121.0869 },
    places: [
      {
        id: "pal-1",
        name: "Nueva Ecija Provincial Capitol",
        description: "The seat of provincial government with impressive modern architecture and beautiful landscaping.",
        image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800",
        images: [
          "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800",
          "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800",
        ],
        category: "learning",
        coordinates: { latitude: 15.5403, longitude: 121.0869 },
        contact: "+63 934 567 8902",
      },
      {
        id: "pal-2",
        name: "Nueva Ecija Museum",
        description: "Discover the rich history and culture of Nueva Ecija through artifacts, exhibits, and educational displays.",
        image: "https://images.unsplash.com/photo-1544785349-c4a5301826fd?w=800",
        images: [
          "https://images.unsplash.com/photo-1544785349-c4a5301826fd?w=800",
          "https://images.unsplash.com/photo-1569930784237-9e17ff5c3d84?w=800",
        ],
        category: "learning",
        coordinates: { latitude: 15.5410, longitude: 121.0880 },
        contact: "+63 978 901 2345",
        socialMedia: { facebook: "https://facebook.com/nuevaecijamuseum" },
      },
      {
        id: "pal-3",
        name: "Cathedral of St. Isidore the Laborer",
        description: "The main cathedral of Nueva Ecija, a modern church with striking architecture and peaceful surroundings.",
        image: "https://images.unsplash.com/photo-1605128410556-61b9fc44c0e7?w=800",
        images: [
          "https://images.unsplash.com/photo-1605128410556-61b9fc44c0e7?w=800",
          "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
        ],
        category: "faith",
        coordinates: { latitude: 15.5420, longitude: 121.0850 },
      },
    ],
  },
  {
    id: "sanjose",
    name: "San Jose City",
    type: "city",
    description: "Known as the 'Rice Granary of the Philippines,' a bustling city surrounded by vast rice fields.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    coordinates: { latitude: 15.7739, longitude: 120.9897 },
    places: [
      {
        id: "sj-1",
        name: "Bantug Lake Ranch",
        description: "A beautiful ranch resort offering horseback riding, fishing, and various outdoor activities. Perfect for family fun.",
        image: "https://images.unsplash.com/photo-1542978709-b7d3e32d2ff6?w=800",
        images: [
          "https://images.unsplash.com/photo-1542978709-b7d3e32d2ff6?w=800",
          "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        ],
        category: "fun",
        coordinates: { latitude: 15.7739, longitude: 120.9897 },
        contact: "+63 967 890 1234",
        website: "https://bantuglakeranch.com",
        socialMedia: { facebook: "https://facebook.com/bantuglakeranch" },
      },
      {
        id: "sj-2",
        name: "San Jose City Plaza",
        description: "The central plaza of the city, a gathering place for locals with beautiful gardens and historical markers.",
        image: "https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=800",
        images: [
          "https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=800",
        ],
        category: "historical",
        coordinates: { latitude: 15.7750, longitude: 120.9910 },
      },
    ],
  },
  {
    id: "munoz",
    name: "Science City of Muñoz",
    type: "city",
    description: "Home to the Central Luzon State University and Philippine Rice Research Institute, the science hub of Nueva Ecija.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
    coordinates: { latitude: 15.7167, longitude: 120.9000 },
    places: [
      {
        id: "mun-1",
        name: "Central Luzon State University",
        description: "A premier state university known for its agricultural programs, beautiful campus, and research facilities.",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
        images: [
          "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
        ],
        category: "learning",
        coordinates: { latitude: 15.7350, longitude: 120.9100 },
        website: "https://clsu.edu.ph",
      },
      {
        id: "mun-2",
        name: "Philippine Rice Research Institute (PhilRice)",
        description: "A government research institute dedicated to rice science, featuring experimental farms and a rice museum.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        images: [
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
          "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
        ],
        category: "learning",
        coordinates: { latitude: 15.7200, longitude: 120.8950 },
        website: "https://philrice.gov.ph",
      },
    ],
  },
  {
    id: "aliaga",
    name: "Aliaga",
    type: "municipality",
    description: "A peaceful agricultural town known for its rice fields and traditional Filipino rural life.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    coordinates: { latitude: 15.5167, longitude: 120.8500 },
    places: [
      {
        id: "ali-1",
        name: "Aliaga Church",
        description: "A historic parish church with Spanish colonial architecture serving the local community for centuries.",
        image: "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
        images: [
          "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
        ],
        category: "faith",
        coordinates: { latitude: 15.5170, longitude: 120.8510 },
      },
    ],
  },
  {
    id: "bongabon",
    name: "Bongabon",
    type: "municipality",
    description: "Known as the 'Onion Capital of the Philippines,' famous for its red onion production.",
    image: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=800",
    coordinates: { latitude: 15.6167, longitude: 121.1500 },
    places: [
      {
        id: "bon-1",
        name: "Bongabon Onion Farms",
        description: "Visit the famous onion farms that earned Bongabon the title of Onion Capital. Learn about onion cultivation and processing.",
        image: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=800",
        images: [
          "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=800",
          "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
        ],
        category: "agritourism",
        coordinates: { latitude: 15.6180, longitude: 121.1520 },
      },
      {
        id: "bon-2",
        name: "Bongabon Church",
        description: "A charming parish church in the heart of town with beautiful religious artifacts.",
        image: "https://images.unsplash.com/photo-1606502709776-04c9d8d78b39?w=800",
        images: [
          "https://images.unsplash.com/photo-1606502709776-04c9d8d78b39?w=800",
        ],
        category: "faith",
        coordinates: { latitude: 15.6170, longitude: 121.1510 },
      },
    ],
  },
  {
    id: "cabiao",
    name: "Cabiao",
    type: "municipality",
    description: "A historic municipality known for its heritage church and traditional Filipino delicacies.",
    image: "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
    coordinates: { latitude: 15.2456, longitude: 120.8544 },
    places: [
      {
        id: "cbi-1",
        name: "Nuestra Señora de la Asunción Church",
        description: "A historic Spanish colonial church built in the 18th century. Known for its beautiful baroque architecture and rich religious heritage.",
        image: "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
        images: [
          "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
          "https://images.unsplash.com/photo-1605128410556-61b9fc44c0e7?w=800",
          "https://images.unsplash.com/photo-1606502709776-04c9d8d78b39?w=800",
        ],
        category: "faith",
        coordinates: { latitude: 15.2456, longitude: 120.8544 },
        contact: "+63 945 678 9012",
        socialMedia: { facebook: "https://facebook.com/cabiaoparish" },
      },
    ],
  },
  {
    id: "carranglan",
    name: "Carranglan",
    type: "municipality",
    description: "A mountainous municipality offering pristine rivers, forests, and adventure opportunities in the Sierra Madre foothills.",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    coordinates: { latitude: 15.9167, longitude: 121.1333 },
    places: [
      {
        id: "car-1",
        name: "Dupinga River",
        description: "A pristine river surrounded by lush forests and mountains. Perfect for adventure seekers and nature lovers.",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
        images: [
          "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        ],
        category: "adventure",
        coordinates: { latitude: 15.9167, longitude: 121.1333 },
        contact: "+63 989 012 3456",
      },
      {
        id: "car-2",
        name: "Carranglan Eco Park",
        description: "An eco-tourism destination offering nature trails, camping, and breathtaking mountain views.",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
        images: [
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
          "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
        ],
        category: "adventure",
        coordinates: { latitude: 15.9200, longitude: 121.1350 },
      },
      {
        id: "car-3",
        name: "Dandin Resort",
        description: "A relaxing resort in the heart of Carranglan offering comfortable accommodations, swimming pools, and scenic mountain views.",
        image: require('@/assets/images/Municipal-Images/Carrangalan/HOTEL AND RESORT/Dandin Resort/Dandin Resort.jpg'),
        images: [
          require('@/assets/images/Municipal-Images/Carrangalan/HOTEL AND RESORT/Dandin Resort/Dandin Resort.jpg'),
        ],
        category: "fun",
        coordinates: { latitude: 15.9180, longitude: 121.1340 },
      },
      {
        id: "car-4",
        name: "Highland Hotel & Resort",
        description: "A premier highland resort offering breathtaking mountain views, comfortable rooms, and a refreshing escape from the city.",
        image: require('@/assets/images/Municipal-Images/Carrangalan/HOTEL AND RESORT/Highland Hotel & Resort/Highland Hotel & Resort.jpg'),
        images: [
          require('@/assets/images/Municipal-Images/Carrangalan/HOTEL AND RESORT/Highland Hotel & Resort/Highland Hotel & Resort.jpg'),
        ],
        category: "fun",
        coordinates: { latitude: 15.9190, longitude: 121.1320 },
      },
      {
        id: "car-5",
        name: "M&S Venue & Private Pool",
        description: "A private venue and pool perfect for events, celebrations, and family gatherings in a serene Carranglan setting.",
        image: require('@/assets/images/Municipal-Images/Carrangalan/HOTEL AND RESORT/M_S Venue & Private Pool/M_s Venue & Private Pool.jpg'),
        images: [
          require('@/assets/images/Municipal-Images/Carrangalan/HOTEL AND RESORT/M_S Venue & Private Pool/M_s Venue & Private Pool.jpg'),
        ],
        category: "fun",
        coordinates: { latitude: 15.9175, longitude: 121.1355 },
      },
      {
        id: "car-6",
        name: "MBA Nature Resort",
        description: "A nature-themed resort surrounded by lush greenery, offering a peaceful retreat with swimming pools and outdoor activities.",
        image: require('@/assets/images/Municipal-Images/Carrangalan/HOTEL AND RESORT/MBA Nature Resort/MBA Nature Resort.jpg'),
        images: [
          require('@/assets/images/Municipal-Images/Carrangalan/HOTEL AND RESORT/MBA Nature Resort/MBA Nature Resort.jpg'),
        ],
        category: "fun",
        coordinates: { latitude: 15.9195, longitude: 121.1310 },
      },
      {
        id: "car-7",
        name: "7-27 Cafe",
        description: "A cozy cafe in Carranglan serving freshly brewed coffee, pastries, and light meals in a welcoming atmosphere.",
        image: require('@/assets/images/Municipal-Images/Carrangalan/RESTAURANT/7-27 Cafe/7_27 Cafe.jpg'),
        images: [
          require('@/assets/images/Municipal-Images/Carrangalan/RESTAURANT/7-27 Cafe/7_27 Cafe.jpg'),
        ],
        category: "food",
        coordinates: { latitude: 15.9160, longitude: 121.1345 },
      },
      {
        id: "car-8",
        name: "Fragata Restaurant",
        description: "A popular dining spot in Carranglan known for its delicious Filipino cuisine and generous servings in a warm, family-friendly setting.",
        image: require('@/assets/images/Municipal-Images/Carrangalan/RESTAURANT/Fragata Restaurant/Fragata Restaurant.jpg'),
        images: [
          require('@/assets/images/Municipal-Images/Carrangalan/RESTAURANT/Fragata Restaurant/Fragata Restaurant.jpg'),
        ],
        category: "food",
        coordinates: { latitude: 15.9155, longitude: 121.1350 },
      },
      {
        id: "car-9",
        name: "Highland RestoBar",
        description: "A restaurant and bar offering great food and drinks with a laid-back highland vibe, perfect for unwinding after a day of adventure.",
        image: require('@/assets/images/Municipal-Images/Carrangalan/RESTAURANT/Highland RestoBar/Highland RestoBar.jpg'),
        images: [
          require('@/assets/images/Municipal-Images/Carrangalan/RESTAURANT/Highland RestoBar/Highland RestoBar.jpg'),
        ],
        category: "food",
        coordinates: { latitude: 15.9165, longitude: 121.1330 },
      },
      {
        id: "car-10",
        name: "Lola Mommy's Eatery",
        description: "A charming home-style eatery serving traditional Filipino comfort food with recipes passed down through generations.",
        image: require('@/assets/images/Municipal-Images/Carrangalan/RESTAURANT/Lola Mommy_s Eatery/Lola Mommy_s Eatery.jpg'),
        images: [
          require('@/assets/images/Municipal-Images/Carrangalan/RESTAURANT/Lola Mommy_s Eatery/Lola Mommy_s Eatery.jpg'),
        ],
        category: "food",
        coordinates: { latitude: 15.9170, longitude: 121.1325 },
      },
      {
        id: "car-11",
        name: "Roadtrip Cafe and Resto",
        description: "A roadside cafe and restaurant perfect for travelers, offering hearty meals, refreshing drinks, and a cozy stopover experience.",
        image: require('@/assets/images/Municipal-Images/Carrangalan/RESTAURANT/Roadtrip Cafe and Resto/Roadtrip Cafe and Resto.jpg'),
        images: [
          require('@/assets/images/Municipal-Images/Carrangalan/RESTAURANT/Roadtrip Cafe and Resto/Roadtrip Cafe and Resto.jpg'),
        ],
        category: "food",
        coordinates: { latitude: 15.9150, longitude: 121.1360 },
      },
    ],
  },
  {
    id: "cuyapo",
    name: "Cuyapo",
    type: "municipality",
    description: "An agricultural town in the northern part of Nueva Ecija known for its rice production and rural charm.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    coordinates: { latitude: 15.7833, longitude: 120.6667 },
    places: [
      {
        id: "cuy-1",
        name: "Cuyapo Rice Terraces",
        description: "Scenic rice terraces that showcase the agricultural beauty of Nueva Ecija's countryside.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        images: [
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
          "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
        ],
        category: "agritourism",
        coordinates: { latitude: 15.7850, longitude: 120.6680 },
      },
    ],
  },
  {
    id: "gabaldon",
    name: "Gabaldon",
    type: "municipality",
    description: "A nature-rich municipality nestled in the Sierra Madre mountains, home to stunning waterfalls and caves.",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
    coordinates: { latitude: 15.5667, longitude: 121.3333 },
    places: [
      {
        id: "gab-1",
        name: "Gabaldon Falls",
        description: "A hidden gem featuring multiple waterfalls cascading into natural pools. Surrounded by lush forest.",
        image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
        images: [
          "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        ],
        category: "adventure",
        coordinates: { latitude: 15.5667, longitude: 121.3333 },
        contact: "+63 934 567 8901",
        socialMedia: { instagram: "https://instagram.com/gabaldonfalls" },
      },
      {
        id: "gab-2",
        name: "Imugan Falls",
        description: "A majestic multi-tiered waterfall deep in the mountains, offering a challenging but rewarding trek.",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
        images: [
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
          "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
        ],
        category: "adventure",
        coordinates: { latitude: 15.5700, longitude: 121.3400 },
      },
    ],
  },
  {
    id: "gen-natividad",
    name: "General Mamerto Natividad",
    type: "municipality",
    description: "A quiet agricultural municipality with scenic landscapes and friendly local communities.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
    coordinates: { latitude: 15.6000, longitude: 120.8667 },
    places: [
      {
        id: "gn-1",
        name: "Natividad Town Plaza",
        description: "A charming town plaza serving as the social center with gardens and local heritage markers.",
        image: "https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=800",
        images: [
          "https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=800",
        ],
        category: "historical",
        coordinates: { latitude: 15.6010, longitude: 120.8670 },
      },
    ],
  },
  {
    id: "gen-tinio",
    name: "General Tinio",
    type: "municipality",
    description: "Home to the famous Minalungao National Park and adventure destinations along the Peñaranda River.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    coordinates: { latitude: 15.3611, longitude: 121.0514 },
    places: [
      {
        id: "gt-1",
        name: "Minalungao National Park",
        description: "A stunning natural park featuring limestone formations, crystal-clear waters, and lush greenery. Perfect for swimming, kayaking, and nature photography.",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
        images: [
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
          "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
        ],
        category: "adventure",
        coordinates: { latitude: 15.3611, longitude: 121.0514 },
        contact: "+63 912 345 6789",
        socialMedia: { facebook: "https://facebook.com/minalungao", instagram: "https://instagram.com/minalungao" },
      },
      {
        id: "gt-2",
        name: "Hilltop Adventure",
        description: "An adventure park offering zipline, wall climbing, ATV rides, and other outdoor activities for thrill-seekers.",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
        images: [
          "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
          "https://images.unsplash.com/photo-1542978709-b7d3e32d2ff6?w=800",
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
        ],
        category: "fun",
        coordinates: { latitude: 15.3500, longitude: 121.0400 },
        contact: "+63 956 789 0234",
        socialMedia: { facebook: "https://facebook.com/hilltopadventurene" },
      },
    ],
  },
  {
    id: "guimba",
    name: "Guimba",
    type: "municipality",
    description: "One of the largest municipalities in Nueva Ecija, known for its rich agricultural heritage and lively fiestas.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    coordinates: { latitude: 15.6667, longitude: 120.7667 },
    places: [
      {
        id: "gui-1",
        name: "Guimba Church",
        description: "A prominent parish church with historical significance and beautiful interior design.",
        image: "https://images.unsplash.com/photo-1605128410556-61b9fc44c0e7?w=800",
        images: [
          "https://images.unsplash.com/photo-1605128410556-61b9fc44c0e7?w=800",
          "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
        ],
        category: "faith",
        coordinates: { latitude: 15.6670, longitude: 120.7670 },
      },
      {
        id: "gui-2",
        name: "Guimba Town Plaza",
        description: "A well-maintained plaza that serves as the heart of the community with monuments and green spaces.",
        image: "https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=800",
        images: [
          "https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=800",
        ],
        category: "historical",
        coordinates: { latitude: 15.6680, longitude: 120.7680 },
      },
    ],
  },
  {
    id: "jaen",
    name: "Jaen",
    type: "municipality",
    description: "A historic town known for its Spanish-era churches and vibrant local festivals.",
    image: "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
    coordinates: { latitude: 15.3167, longitude: 120.9000 },
    places: [
      {
        id: "jae-1",
        name: "Jaen Church (Immaculate Conception Parish)",
        description: "One of the most beautiful churches in Nueva Ecija with well-preserved Spanish colonial architecture.",
        image: "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
        images: [
          "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
          "https://images.unsplash.com/photo-1606502709776-04c9d8d78b39?w=800",
        ],
        category: "faith",
        coordinates: { latitude: 15.3170, longitude: 120.9010 },
      },
    ],
  },
  {
    id: "laur",
    name: "Laur",
    type: "municipality",
    description: "A municipality at the foothills of the Sierra Madre, offering nature trips and scenic mountain views.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    coordinates: { latitude: 15.5833, longitude: 121.2000 },
    places: [
      {
        id: "lau-1",
        name: "Laur Hot Springs",
        description: "Natural hot springs nestled in the mountains, providing a relaxing getaway amid lush tropical surroundings.",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
        images: [
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
        ],
        category: "adventure",
        coordinates: { latitude: 15.5850, longitude: 121.2020 },
      },
    ],
  },
  {
    id: "licab",
    name: "Licab",
    type: "municipality",
    description: "A small, serene municipality known for its quiet rural atmosphere and agricultural way of life.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    coordinates: { latitude: 15.5500, longitude: 120.7667 },
    places: [
      {
        id: "lic-1",
        name: "Licab Rice Paddies",
        description: "Expansive golden rice fields offering picturesque views, especially during harvest season.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        images: [
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        ],
        category: "agritourism",
        coordinates: { latitude: 15.5510, longitude: 120.7670 },
      },
    ],
  },
  {
    id: "llanera",
    name: "Llanera",
    type: "municipality",
    description: "A growing municipality known for its proximity to Cabanatuan and developing commercial areas.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
    coordinates: { latitude: 15.5667, longitude: 120.9500 },
    places: [
      {
        id: "lla-1",
        name: "Llanera Eco Farm",
        description: "A community-based eco farm showcasing sustainable farming practices and organic produce.",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
        images: [
          "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
        ],
        category: "agritourism",
        coordinates: { latitude: 15.5680, longitude: 120.9510 },
      },
    ],
  },
  {
    id: "lupao",
    name: "Lupao",
    type: "municipality",
    description: "An upland municipality offering scenic mountain landscapes and indigenous cultural heritage.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    coordinates: { latitude: 15.8167, longitude: 120.8833 },
    places: [
      {
        id: "lup-1",
        name: "Lupao Mountain Trail",
        description: "A scenic hiking trail through the mountains offering panoramic views of the Nueva Ecija valley below.",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
        images: [
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        ],
        category: "adventure",
        coordinates: { latitude: 15.8180, longitude: 120.8850 },
      },
    ],
  },
  {
    id: "nampicuan",
    name: "Nampicuan",
    type: "municipality",
    description: "The smallest municipality in Nueva Ecija, a peaceful and close-knit community.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    coordinates: { latitude: 15.7333, longitude: 120.6500 },
    places: [
      {
        id: "nam-1",
        name: "Nampicuan Parish Church",
        description: "A quaint parish church that serves as the spiritual center of this small community.",
        image: "https://images.unsplash.com/photo-1606502709776-04c9d8d78b39?w=800",
        images: [
          "https://images.unsplash.com/photo-1606502709776-04c9d8d78b39?w=800",
        ],
        category: "faith",
        coordinates: { latitude: 15.7340, longitude: 120.6510 },
      },
    ],
  },
  {
    id: "pantabangan",
    name: "Pantabangan",
    type: "municipality",
    description: "Home to the famous Pantabangan Dam and lake, a top destination for water sports and eco-tourism.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    coordinates: { latitude: 15.8167, longitude: 121.1167 },
    places: [
      {
        id: "pan-1",
        name: "Pantabangan Lake",
        description: "The largest man-made lake in Southeast Asia, offering serene views, island hopping, and water activities.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
          "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
        ],
        category: "adventure",
        coordinates: { latitude: 15.8167, longitude: 121.1167 },
        contact: "+63 923 456 7890",
        socialMedia: { facebook: "https://facebook.com/pantabanganlake" },
      },
      {
        id: "pan-2",
        name: "Pantabangan Dam",
        description: "A massive hydroelectric dam providing irrigation and power. The dam viewpoint offers spectacular panoramic views.",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
        images: [
          "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        ],
        category: "adventure",
        coordinates: { latitude: 15.8200, longitude: 121.1200 },
      },
    ],
  },
  {
    id: "penaranda",
    name: "Peñaranda",
    type: "municipality",
    description: "A charming municipality known for its historic sites and traditional Filipino culture.",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800",
    coordinates: { latitude: 15.3500, longitude: 121.0000 },
    places: [
      {
        id: "pen-1",
        name: "Peñaranda Church",
        description: "A heritage church with colonial-era architecture and religious artifacts from the Spanish period.",
        image: "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
        images: [
          "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
        ],
        category: "faith",
        coordinates: { latitude: 15.3510, longitude: 121.0010 },
      },
    ],
  },
  {
    id: "quezon",
    name: "Quezon",
    type: "municipality",
    description: "A municipality rich in natural attractions including caves and mountain trails in the Sierra Madre range.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    coordinates: { latitude: 15.5000, longitude: 121.2000 },
    places: [
      {
        id: "que-1",
        name: "Quezon Caves",
        description: "A network of caves offering spelunking adventures and a glimpse into the geological history of the region.",
        image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800",
        images: [
          "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800",
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
        ],
        category: "adventure",
        coordinates: { latitude: 15.5020, longitude: 121.2020 },
      },
    ],
  },
  {
    id: "rizal",
    name: "Rizal",
    type: "municipality",
    description: "A municipality offering natural springs and eco-tourism destinations in the eastern part of Nueva Ecija.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    coordinates: { latitude: 15.5333, longitude: 121.2333 },
    places: [
      {
        id: "riz-1",
        name: "Rizal Natural Springs",
        description: "Crystal-clear natural springs perfect for swimming and relaxation, surrounded by tropical greenery.",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
        images: [
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
        ],
        category: "adventure",
        coordinates: { latitude: 15.5340, longitude: 121.2340 },
      },
    ],
  },
  {
    id: "san-antonio",
    name: "San Antonio",
    type: "municipality",
    description: "A riverside municipality known for its iconic bridge and scenic waterways.",
    image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800",
    coordinates: { latitude: 15.2500, longitude: 121.0167 },
    places: [
      {
        id: "sa-1",
        name: "Cabu Bridge",
        description: "An iconic landmark bridge offering scenic views of the river below. A popular spot for photography and sightseeing.",
        image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800",
        images: [
          "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800",
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
          "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
        ],
        category: "adventure",
        coordinates: { latitude: 15.2500, longitude: 121.0167 },
        contact: "+63 990 123 4567",
      },
    ],
  },
  {
    id: "san-isidro",
    name: "San Isidro",
    type: "municipality",
    description: "A heritage-rich municipality with well-preserved churches and traditional Filipino town atmosphere.",
    image: "https://images.unsplash.com/photo-1605128410556-61b9fc44c0e7?w=800",
    coordinates: { latitude: 15.4000, longitude: 120.9500 },
    places: [
      {
        id: "si-1",
        name: "Our Lady of Purification Church",
        description: "A beautiful heritage church with stunning architecture and deep religious significance to the local community.",
        image: "https://images.unsplash.com/photo-1605128410556-61b9fc44c0e7?w=800",
        images: [
          "https://images.unsplash.com/photo-1605128410556-61b9fc44c0e7?w=800",
          "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
          "https://images.unsplash.com/photo-1606502709776-04c9d8d78b39?w=800",
        ],
        category: "faith",
        coordinates: { latitude: 15.4000, longitude: 120.9500 },
        contact: "+63 901 234 5678",
        socialMedia: { facebook: "https://facebook.com/sanisidroparish" },
      },
    ],
  },
  {
    id: "san-leonardo",
    name: "San Leonardo",
    type: "municipality",
    description: "A progressive municipality serving as a gateway to the eastern part of Nueva Ecija.",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800",
    coordinates: { latitude: 15.3667, longitude: 120.9667 },
    places: [
      {
        id: "sl-1",
        name: "San Leonardo Church",
        description: "A well-maintained parish church with modern and traditional architectural elements.",
        image: "https://images.unsplash.com/photo-1605128410556-61b9fc44c0e7?w=800",
        images: [
          "https://images.unsplash.com/photo-1605128410556-61b9fc44c0e7?w=800",
        ],
        category: "faith",
        coordinates: { latitude: 15.3670, longitude: 120.9670 },
      },
    ],
  },
  {
    id: "santa-rosa",
    name: "Santa Rosa",
    type: "municipality",
    description: "An agricultural town known for its peaceful countryside and traditional farming communities.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
    coordinates: { latitude: 15.4333, longitude: 120.9167 },
    places: [
      {
        id: "sr-1",
        name: "Santa Rosa Farm Tours",
        description: "Guided tours of local farms showcasing traditional rice farming and organic vegetable cultivation.",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
        images: [
          "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        ],
        category: "agritourism",
        coordinates: { latitude: 15.4340, longitude: 120.9170 },
      },
    ],
  },
  {
    id: "santo-domingo",
    name: "Santo Domingo",
    type: "municipality",
    description: "A vibrant municipality known for its community celebrations and agricultural productivity.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    coordinates: { latitude: 15.5667, longitude: 120.8667 },
    places: [
      {
        id: "sd-1",
        name: "Santo Domingo Parish Church",
        description: "A historic church dedicated to Santo Domingo de Guzman with colonial-era architecture.",
        image: "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
        images: [
          "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
        ],
        category: "faith",
        coordinates: { latitude: 15.5670, longitude: 120.8670 },
      },
    ],
  },
  {
    id: "talavera",
    name: "Talavera",
    type: "municipality",
    description: "A growing municipality famous for Aqua Planet water park and its strategic location along major highways.",
    image: "https://images.unsplash.com/photo-1542978709-b7d3e32d2ff6?w=800",
    coordinates: { latitude: 15.5833, longitude: 120.9167 },
    places: [
      {
        id: "tal-1",
        name: "Aqua Planet",
        description: "A fun-filled water park perfect for families, featuring exciting water slides, wave pools, and relaxation areas.",
        image: "https://images.unsplash.com/photo-1542978709-b7d3e32d2ff6?w=800",
        images: [
          "https://images.unsplash.com/photo-1542978709-b7d3e32d2ff6?w=800",
          "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800",
        ],
        category: "fun",
        coordinates: { latitude: 15.5833, longitude: 120.9167 },
        contact: "+63 945 678 9023",
        website: "https://aquaplanet.com.ph",
        socialMedia: { facebook: "https://facebook.com/aquaplanetph", instagram: "https://instagram.com/aquaplanetph" },
      },
    ],
  },
  {
    id: "talugtug",
    name: "Talugtug",
    type: "municipality",
    description: "A remote upland municipality offering untouched natural beauty and indigenous cultural experiences.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    coordinates: { latitude: 15.8667, longitude: 120.8167 },
    places: [
      {
        id: "tlg-1",
        name: "Talugtug Mountain Views",
        description: "Panoramic mountain viewpoints offering breathtaking vistas of the Nueva Ecija valley and surrounding ranges.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
        ],
        category: "adventure",
        coordinates: { latitude: 15.8680, longitude: 120.8180 },
      },
    ],
  },
  {
    id: "zaragoza",
    name: "Zaragoza",
    type: "municipality",
    description: "A historic municipality with well-preserved Spanish colonial heritage and vibrant local traditions.",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800",
    coordinates: { latitude: 15.4500, longitude: 120.7833 },
    places: [
      {
        id: "zar-1",
        name: "Zaragoza Church",
        description: "An old Spanish-era church with beautiful stone architecture and a peaceful courtyard.",
        image: "https://images.unsplash.com/photo-1606502709776-04c9d8d78b39?w=800",
        images: [
          "https://images.unsplash.com/photo-1606502709776-04c9d8d78b39?w=800",
          "https://images.unsplash.com/photo-1548625149-720da048769e?w=800",
        ],
        category: "faith",
        coordinates: { latitude: 15.4510, longitude: 120.7840 },
      },
      {
        id: "zar-2",
        name: "Zaragoza Heritage Walk",
        description: "A walking tour through the old town featuring ancestral houses, heritage markers, and local artisan shops.",
        image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800",
        images: [
          "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800",
        ],
        category: "historical",
        coordinates: { latitude: 15.4520, longitude: 120.7850 },
      },
    ],
  },
];
