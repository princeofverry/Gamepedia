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

const GameScreen = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchGames = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const gameTypes = ["console-game", "pc", "review", "e-sport"];

      const randomType =
        gameTypes[Math.floor(Math.random() * gameTypes.length)];
      const response = await axios.get(
        `https://the-lazy-media-api.vercel.app/api/games/${randomType}?page=${page}`
      );

      setGames((prevGames) => [...prevGames, ...response.data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const renderGameItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailGame", { key: item.key })}
      style={styles.gameItem}
    >
      <Image
        source={{ uri: item.thumb }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.gameTextContainer}>
        <Text style={styles.gameTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.gameSubtitle} numberOfLines={1}>
          {item.subtitle || "Game Info"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={games}
      renderItem={renderGameItem}
      keyExtractor={(item) => item.key}
      onEndReached={fetchGames}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? (
          <View style={styles.loadingContainer}>
            <Text>Loading more games...</Text>
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  gameItem: {
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  thumbnail: {
    width: 120,
    height: 120,
  },
  gameTextContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  gameSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
});

export default GameScreen;
