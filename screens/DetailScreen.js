import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import axios from "axios";

const DetailScreen = ({ route }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { key } = route.params;

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(
          `https://the-lazy-media-api.vercel.app/api/detail/${key}`
        );
        console.log(response.data); // Debug untuk cek data yang diterima
        setDetail(response.data.results); // Ambil 'results' dari response.data
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [key]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!detail) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error fetching detail. Please try again later.</Text>
      </View>
    );
  }

  // Menggabungkan array `content` menjadi string dengan newline
  const content = Array.isArray(detail.content)
    ? detail.content.join("\n\n")
    : "Content is not available.";
  const authorName = detail.author || "Unknown Author";

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{detail.title}</Text>
      {detail.content[0] && (
        <Image source={{ uri: detail.content[0] }} style={styles.image} />
      )}
      <Text style={styles.author}>By {authorName}</Text>
      <Text style={styles.time}>{detail.date}</Text>
      <Text style={styles.content}>{content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  author: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 5,
    color: "#555",
  },
  time: {
    fontSize: 14,
    color: "#888",
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DetailScreen;
