import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import * as Font from "expo-font";
import Home from "./components/Home"; 
import UserDayScreen from "./components/UserDayScreen";
import Today from "./components/Today";
import Calendar from "./components/Calendar";
import CalendarDay from "./components/CalendarDay";

// Load custom fonts
const loadFonts = async () => {
  await Font.loadAsync({
    kindergarten: require("./assets/fonts/kindergarten.ttf"), // Ensure correct path
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Calendar />
      {/* <UserDayScreen /> */}
    </View>
  );
}

// CustomText component for reusability
export const CustomText = ({ children, style }) => (
  <Text style={[{ fontFamily: "kindergarten" }, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
});
