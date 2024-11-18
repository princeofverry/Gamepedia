// screens/ProfileScreen.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/faisal.jpg")} style={styles.image} />
      <Text style={styles.name}>Faisal Akbar</Text>
      <Text style={styles.major}>Teknik Komputer 2022</Text>
      <Text style={styles.title}>Tentang Gamepedia</Text>
      <Text style={styles.description}>
        Gamepedia adalah aplikasi informasi terkini seputar game dan teknologi,
        yang menyediakan berita terbaru, review, dan informasi mendalam dari
        berbagai sumber.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  major: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
  },
});

export default ProfileScreen;
