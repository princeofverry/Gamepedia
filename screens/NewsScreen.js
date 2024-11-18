import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";

const NewsScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://the-lazy-media-api.vercel.app/api/games?page=${page}`
      );

      setNews((prevNews) => [...prevNews, ...response.data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailNews", { key: item.key })}
      style={styles.newsItem}
    >
      <Image
        source={{ uri: item.thumb }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.newsTextContainer}>
        <Text style={styles.newsTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.newsSubtitle} numberOfLines={1}>
          {item.subtitle || "Read more"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={news}
      renderItem={renderNewsItem}
      keyExtractor={(item) => item.key}
      onEndReached={fetchNews}
      onEndReachedThreshold={0.5} // Memuat lebih banyak berita saat mendekati akhir daftar
      ListFooterComponent={
        loading ? (
          <View style={styles.loadingContainer}>
            <Text>Loading more news...</Text>
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  newsItem: {
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  newsTextContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  newsSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
});

export default NewsScreen;
