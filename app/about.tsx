import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react-native";
import { Linking } from "react-native";

export default function AboutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [expandedSections, setExpandedSections] = React.useState<{ [key: string]: boolean }>({
    intro: true,
    governor: false,
    tourism: false,
    vision: false,
    mission: false,
    contact: false,
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

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
          <Text style={styles.title}>About</Text>
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
          <View style={styles.introSection}>
            <Text style={styles.introParagraph}>
              The Nueva Ecija Tourism App is developed by the Provincial Government of Nueva Ecija through the Provincial Tourism Office.
            </Text>
            <Text style={[styles.introParagraph, { marginTop: 12 }]}>
              The Tourism App provides for a comprehensive and convenient guide to tourists visiting the Province of Nueva Ecija.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.collapsibleHeader}
            onPress={() => toggleSection("intro")}
            activeOpacity={0.7}
          >
            <Text style={styles.collapsibleTitle}>Introduction</Text>
            {expandedSections.intro ? (
              <ChevronUp size={24} color="#117A7A" />
            ) : (
              <ChevronDown size={24} color="#117A7A" />
            )}
          </TouchableOpacity>
          {expandedSections.intro && (
            <View style={styles.collapsibleContent}>
              <Text style={styles.paragraph}>
                Known as the "Rice Granary of the Philippines" and the "Dairy Capital of Luzon", Nueva Ecija is a rising tourism province in North and Central Luzon.
              </Text>
              <Text style={[styles.paragraph, { marginTop: 12 }]}>
                Nueva Ecija is the largest province in Central Luzon and is composed of 5 Cities and 27 Municipalities. The Province is bordered on the east by the Province of Aurora, north east by the Province of Nueva Vizcaya, south by the Province of Bulacan, southeast by the Province of Pampanga, west by the Province of Tarlac and northwest by the Province of Pangasinan.
              </Text>
              <Text style={[styles.paragraph, { marginTop: 12 }]}>
                Nueva Ecija is known for its flagship tourism destinations, namely the Minalungao National Park, Fort Magsaysay and the Pantabangan Dam.
              </Text>
              <Text style={[styles.paragraph, { marginTop: 12 }]}>
                Experience Never Ending Fun, Adventure, Learning, Faith and Food only here in Nueva Ecija!
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.collapsibleHeader}
            onPress={() => toggleSection("governor")}
            activeOpacity={0.7}
          >
            <Text style={styles.collapsibleTitle}>Office of the Governor</Text>
            {expandedSections.governor ? (
              <ChevronUp size={24} color="#117A7A" />
            ) : (
              <ChevronDown size={24} color="#117A7A" />
            )}
          </TouchableOpacity>
          {expandedSections.governor && (
            <View style={styles.collapsibleContent}>
              <View style={styles.governorSection}>
                <Image
                  source={{ uri: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/76fb5lq64n788u3cfeews" }}
                  style={styles.governorImage}
                  resizeMode="cover"
                />
                <Text style={styles.governorText}>
                  Hon. Governor Aurelio "Oyie" M. Umali is the youngest ever elected Governor of Nueva Ecija. A lawyer by profession, Governor Oyie began his political career when he ran and won as a Congressman for the 3rd District of Nueva Ecija in 2001. In 2007, at age 41, he became the Governor of Nueva Ecija.
                </Text>
                <Text style={[styles.governorText, { marginTop: 12 }]}>
                  Governor Oyie's administration can be described by his slogan Malasakit para sa Novo Ecijano wherein the programs, policies and projects of the Provincial Government are all directed towards uplifting the lives and wellbeing of Novo Ecijanos, especially the marginalized sector.
                </Text>
                <Text style={[styles.governorText, { marginTop: 12 }]}>
                  A staunch supporter of the Tourism of Nueva Ecija, this Nueva Ecija Tourism App is one of the primary tourism projects of his administration to promote the tourism sites and establishments in the entire Province.
                </Text>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.collapsibleHeader}
            onPress={() => toggleSection("tourism")}
            activeOpacity={0.7}
          >
            <Text style={styles.collapsibleTitle}>Provincial Tourism Office</Text>
            {expandedSections.tourism ? (
              <ChevronUp size={24} color="#117A7A" />
            ) : (
              <ChevronDown size={24} color="#117A7A" />
            )}
          </TouchableOpacity>
          {expandedSections.tourism && (
            <View style={styles.collapsibleContent}>
              <Text style={styles.paragraph}>
                The Provincial Tourism Office is a Department of the Provincial Government of Nueva Ecija. It has the mandate to lead in the tourism promotions and development of the Province. The Office is led by Atty. Jose Maria Ceasar C. San Pedro, Provincial Tourism Officer.
              </Text>
              <Text style={[styles.staffSectionTitle, { marginTop: 20 }]}>Nueva Ecija Tourism Office Staffs</Text>
              <View style={styles.staffGrid}>
                <View style={styles.staffMember}>
                  <Image
                    source={{ uri: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/epa3ms6c7bw5jsm1pyahg" }}
                    style={styles.staffPhoto}
                    resizeMode="cover"
                  />
                  <Text style={styles.staffName}>Atty. Jose Maria Ceasar C. San Pedro</Text>
                  <Text style={styles.staffPosition}>Provincial Tourism Officer</Text>
                </View>
                <View style={styles.staffMember}>
                  <Image
                    source={{ uri: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/03rqkio7zidsw918m5qu6" }}
                    style={styles.staffPhoto}
                    resizeMode="cover"
                  />
                  <Text style={styles.staffName}>Mary Grace Irabagon</Text>
                  <Text style={styles.staffPosition}>Supervising Tourism Operations Officer</Text>
                </View>
                <View style={styles.staffMember}>
                  <Image
                    source={{ uri: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/ad77kae9f0qxxifdp6pa5" }}
                    style={styles.staffPhoto}
                    resizeMode="cover"
                  />
                  <Text style={styles.staffName}>Ethel Ruiz</Text>
                  <Text style={styles.staffPosition}>Senior Tourism Operations Officer</Text>
                </View>
                <View style={styles.staffMember}>
                  <Image
                    source={{ uri: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/pp80q6aem6034kyajhctm" }}
                    style={styles.staffPhoto}
                    resizeMode="cover"
                  />
                  <Text style={styles.staffName}>Aimie Jung</Text>
                  <Text style={styles.staffPosition}>Tourism Operations Officer I</Text>
                </View>
                <View style={styles.staffMember}>
                  <Image
                    source={{ uri: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/uie7uxtojajyri5cm5zxj" }}
                    style={styles.staffPhoto}
                    resizeMode="cover"
                  />
                  <Text style={styles.staffName}>Patricia Manuel</Text>
                  <Text style={styles.staffPosition}>Administrative Operations Officer I</Text>
                </View>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.collapsibleHeader}
            onPress={() => toggleSection("vision")}
            activeOpacity={0.7}
          >
            <Text style={styles.collapsibleTitle}>Vision</Text>
            {expandedSections.vision ? (
              <ChevronUp size={24} color="#117A7A" />
            ) : (
              <ChevronDown size={24} color="#117A7A" />
            )}
          </TouchableOpacity>
          {expandedSections.vision && (
            <View style={styles.collapsibleContent}>
              <Text style={styles.paragraph}>
                By 2030, Nueva Ecija will be a "word-class" and sustainable eco-adventure, cultural, historical and farm tourism destination in the Philippines.
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.collapsibleHeader}
            onPress={() => toggleSection("mission")}
            activeOpacity={0.7}
          >
            <Text style={styles.collapsibleTitle}>Mission</Text>
            {expandedSections.mission ? (
              <ChevronUp size={24} color="#117A7A" />
            ) : (
              <ChevronDown size={24} color="#117A7A" />
            )}
          </TouchableOpacity>
          {expandedSections.mission && (
            <View style={styles.collapsibleContent}>
              <Text style={styles.paragraph}>
                To develop and enhance the culture of tourism of Novo Ecijanos through community development and empowerment, branding and promotion of tourism products and services, creation of sustainable and inclusive tourism related opportunities and the realization of the tourism potential of Nueva Ecija.
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.collapsibleHeader}
            onPress={() => toggleSection("contact")}
            activeOpacity={0.7}
          >
            <Text style={styles.collapsibleTitle}>Contact Us</Text>
            {expandedSections.contact ? (
              <ChevronUp size={24} color="#117A7A" />
            ) : (
              <ChevronDown size={24} color="#117A7A" />
            )}
          </TouchableOpacity>
          {expandedSections.contact && (
            <View style={styles.collapsibleContent}>
              <Text style={styles.paragraph}>Email: nuevaecijatourism@gmail.com</Text>
              <Text style={[styles.paragraph, { marginTop: 8 }]}>
                For Communications, Reports and Statistics: ptonuevaecija@gmail.com
              </Text>
              <Text style={[styles.paragraph, { marginTop: 8 }]}>
                For events: Nueva Ecija Tourism
              </Text>
            </View>
          )}

          <View style={styles.versionSection}>
            <Text style={styles.versionText}>NUEVA ECIJA TOURISM @ 2023</Text>
            <Text style={styles.versionNumber}>Version: 2.1.2</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerTitle}>Powered by:</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.techpro360solutions.com")}
              activeOpacity={0.7}
            >
              <Text style={styles.footerCompany}>TechPro 360 Solutions</Text>
            </TouchableOpacity>
          </View>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
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
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800" as const,
    color: "#117A7A",
    letterSpacing: 0.5,
  },
  content: {
    paddingTop: 8,
  },
  introSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#117A7A",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  introParagraph: {
    fontSize: 15,
    fontWeight: "400" as const,
    color: "#4A4A4A",
    lineHeight: 22,
    textAlign: "center",
  },
  collapsibleHeader: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#117A7A",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  collapsibleTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    letterSpacing: 0.3,
  },
  collapsibleContent: {
    backgroundColor: "#F8FFFE",
    padding: 20,
    marginBottom: 12,
    borderRadius: 12,
  },
  paragraph: {
    fontSize: 15,
    fontWeight: "400" as const,
    color: "#4A4A4A",
    lineHeight: 22,
  },
  governorSection: {
    alignItems: "center",
  },
  governorImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  governorText: {
    fontSize: 15,
    fontWeight: "400" as const,
    color: "#4A4A4A",
    lineHeight: 22,
    textAlign: "justify",
  },
  staffSectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#117A7A",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  staffGrid: {
    marginTop: 16,
    gap: 16,
  },
  staffMember: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  staffPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  staffName: {
    fontSize: 15,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 4,
  },
  staffPosition: {
    fontSize: 13,
    fontWeight: "400" as const,
    color: "#666666",
    textAlign: "center",
  },
  versionSection: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  versionText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#117A7A",
    letterSpacing: 0.5,
  },
  versionNumber: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "#117A7A",
    marginTop: 4,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  footerTitle: {
    fontSize: 13,
    color: "#999999",
    marginBottom: 6,
  },
  footerCompany: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#117A7A",
    letterSpacing: 0.3,
  },
});
