import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

// Screens
import NewsScreen from "./screens/NewsScreen";
import GameScreen from "./screens/GameScreen";
import DetailScreen from "./screens/DetailScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // Tambahkan ini untuk menyembunyikan header
    }}
  >
    <Stack.Screen
      name="HomeList"
      component={HomeScreen}
      options={{ title: "Home" }}
    />
    <Stack.Screen
      name="DetailNews"
      component={DetailScreen}
      options={{ title: "Detail Berita" }}
    />
  </Stack.Navigator>
);

const NewsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // Tambahkan ini untuk menyembunyikan header
    }}
  >
    <Stack.Screen
      name="NewsList"
      component={NewsScreen}
      options={{ title: "Berita Game" }}
    />
    <Stack.Screen
      name="DetailNews"
      component={DetailScreen}
      options={{ title: "Detail Berita" }}
    />
  </Stack.Navigator>
);

const GameStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // Tambahkan ini untuk menyembunyikan header
    }}
  >
    <Stack.Screen
      name="GameList"
      component={GameScreen}
      options={{ title: "Game" }}
    />
    <Stack.Screen
      name="DetailGame"
      component={DetailScreen}
      options={{ title: "Detail Game" }}
    />
  </Stack.Navigator>
);

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "News") {
          iconName = focused ? "newspaper" : "newspaper-outline";
        } else if (route.name === "Games") {
          iconName = focused ? "game-controller" : "game-controller-outline";
        } else if (route.name === "Profile") {
          iconName = focused ? "person" : "person-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="News" component={NewsStack} />
    <Tab.Screen name="Games" component={GameStack} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
