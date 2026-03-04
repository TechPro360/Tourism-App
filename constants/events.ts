export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  venue: string;
  image: string;
  category: "festival" | "cultural" | "sports" | "community" | "music" | "food";
  isFeatured?: boolean;
  organizer: string;
  contact?: string;
  price?: string;
}

export const upcomingEvents: Event[] = [
  {
    id: "evt-1",
    title: "Taong Putik Festival",
    description:
      "The famous 'Mud People' festival in Aliaga celebrates the feast of St. John the Baptist. Devotees cover themselves in mud and dried banana leaves as they parade through the streets in a unique and colorful tradition that dates back centuries. This vibrant celebration showcases the deep faith and cultural heritage of the people of Nueva Ecija.",
    date: "2026-06-24",
    time: "06:00 AM",
    endTime: "06:00 PM",
    location: "Aliaga, Nueva Ecija",
    venue: "Municipal Grounds, Aliaga",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    category: "festival",
    isFeatured: true,
    organizer: "Municipality of Aliaga",
    contact: "+63 912 345 6789",
    price: "Free",
  },
  {
    id: "evt-2",
    title: "Kalabaw Festival",
    description:
      "A grand celebration honoring the carabao, the farmer's best friend. The festival features a parade of beautifully decorated carabaos, street dancing, agricultural exhibits, and various competitions. It highlights Nueva Ecija's identity as the Rice Granary of the Philippines.",
    date: "2026-05-15",
    time: "08:00 AM",
    endTime: "05:00 PM",
    location: "Palayan City, Nueva Ecija",
    venue: "Provincial Capitol Grounds",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    category: "cultural",
    isFeatured: true,
    organizer: "Provincial Government of Nueva Ecija",
    contact: "+63 923 456 7890",
    price: "Free",
  },
  {
    id: "evt-3",
    title: "Rice Festival & Harvest Thanksgiving",
    description:
      "An annual celebration of the bountiful rice harvest in Nueva Ecija. Features rice cooking competitions, farm-to-table experiences, agricultural trade fairs, and cultural performances celebrating the province's agricultural heritage.",
    date: "2026-04-12",
    time: "07:00 AM",
    endTime: "09:00 PM",
    location: "Cabanatuan City, Nueva Ecija",
    venue: "Cabanatuan City Plaza",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800",
    category: "food",
    isFeatured: true,
    organizer: "City Government of Cabanatuan",
    contact: "+63 934 567 8901",
    price: "Free Entry",
  },
  {
    id: "evt-4",
    title: "Nueva Ecija Marathon 2026",
    description:
      "Join hundreds of runners in this annual marathon event that takes you through the scenic landscapes of Nueva Ecija. Categories include 5K, 10K, 21K, and full marathon. Registration includes race kit, finisher medal, and refreshments.",
    date: "2026-03-22",
    time: "04:00 AM",
    endTime: "12:00 PM",
    location: "Science City of Muñoz, Nueva Ecija",
    venue: "CLSU Main Campus",
    image: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800",
    category: "sports",
    organizer: "NE Runners Club",
    contact: "+63 945 678 9012",
    price: "₱500 - ₱1,500",
  },
  {
    id: "evt-5",
    title: "Pista ng Bagong Ecijano",
    description:
      "A week-long celebration of Nueva Ecija's founding anniversary featuring cultural shows, beauty pageants, trade fairs, band competitions, and fireworks displays. The festival brings together all municipalities in a grand showcase of talent and culture.",
    date: "2026-08-19",
    time: "09:00 AM",
    endTime: "10:00 PM",
    location: "Palayan City, Nueva Ecija",
    venue: "Provincial Capitol Complex",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    category: "festival",
    isFeatured: true,
    organizer: "Provincial Government of Nueva Ecija",
    contact: "+63 956 789 0123",
    price: "Free",
  },
  {
    id: "evt-6",
    title: "Acoustic Night at Pantabangan",
    description:
      "An intimate acoustic music night by the beautiful Pantabangan Lake. Enjoy live performances from local artists while taking in the serene lakeside atmosphere. Food stalls and craft vendors will also be present.",
    date: "2026-04-05",
    time: "05:00 PM",
    endTime: "11:00 PM",
    location: "Pantabangan, Nueva Ecija",
    venue: "Pantabangan Lake View Deck",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    category: "music",
    organizer: "Pantabangan Tourism Office",
    contact: "+63 967 890 1234",
    price: "₱150",
  },
  {
    id: "evt-7",
    title: "Kakanin Cook-Off Competition",
    description:
      "A delicious cook-off competition featuring the best kakanin makers from across Nueva Ecija. Watch master cooks prepare traditional rice cakes and sample the delicious entries. Categories include puto, suman, bibingka, and more.",
    date: "2026-05-03",
    time: "09:00 AM",
    endTime: "04:00 PM",
    location: "Cabanatuan City, Nueva Ecija",
    venue: "SM City Cabanatuan Events Hall",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
    category: "food",
    organizer: "NE Culinary Association",
    contact: "+63 978 901 2345",
    price: "₱100",
  },
  {
    id: "evt-8",
    title: "Heritage Walking Tour - Gapan",
    description:
      "Explore the historic streets of Gapan City, one of the oldest towns in Nueva Ecija. Visit centuries-old churches, heritage houses, and learn about the city's role in Philippine history. Guided tour with refreshments included.",
    date: "2026-03-29",
    time: "07:00 AM",
    endTime: "12:00 PM",
    location: "Gapan City, Nueva Ecija",
    venue: "Gapan City Hall",
    image: "https://images.unsplash.com/photo-1569880153113-76e33fc52b5f?w=800",
    category: "cultural",
    organizer: "Gapan Heritage Foundation",
    contact: "+63 989 012 3456",
    price: "₱200",
  },
];

export const eventCategoryColors: Record<string, { bg: string; text: string }> = {
  festival: { bg: "#FFF3E0", text: "#E65100" },
  cultural: { bg: "#E8F5E9", text: "#2E7D32" },
  sports: { bg: "#E3F2FD", text: "#1565C0" },
  community: { bg: "#F3E5F5", text: "#7B1FA2" },
  music: { bg: "#FCE4EC", text: "#C62828" },
  food: { bg: "#FFF8E1", text: "#F57F17" },
};
