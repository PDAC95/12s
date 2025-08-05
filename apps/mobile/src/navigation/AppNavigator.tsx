import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Simple navigation placeholder without React Navigation
const AppNavigator = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>12s Mobile App</Text>
      <Text style={styles.subtitle}>Navigation Ready</Text>
      <Text style={styles.info}>
        AuthStack, MainStack & TabNavigator structure prepared
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  info: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});

export default AppNavigator;
