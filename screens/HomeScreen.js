import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (query) => {
    if (!query) return; // Prevent search if query is empty
    setLoading(true);
    try {
      const response = await axios.get(
        `https://the-lazy-media-api.vercel.app/api/search?search=${query}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Cari berita..."
        value={searchQuery}
        onChangeText={setSearchQuery} // Update searchQuery on text change
      />
      <ScrollView style={styles.resultsContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          searchResults.map((item) => (
            <TouchableOpacity
              key={item.key}
              onPress={() =>
                navigation.navigate("DetailNews", { key: item.key })
              }
              style={styles.contentItem}
            >
              <Image
                source={{ uri: item.thumb }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
              <View style={styles.contentTextContainer}>
                <Text style={styles.contentTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.contentSubtitle} numberOfLines={1}>
                  {item.subtitle || "Baca Selengkapnya"}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  resultsContainer: {
    flex: 1,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888",
  },
  contentItem: {
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
  contentTextContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contentSubtitle: {
    fontSize: 12,
    color: "#666",
  },
});

export default HomeScreen;
