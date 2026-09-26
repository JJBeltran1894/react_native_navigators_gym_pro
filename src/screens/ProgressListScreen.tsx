// ProgressListScreen.tsx
import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function ProgressListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F17" />
      <View style={styles.iconCircle}>
        <Ionicons name="stats-chart" size={40} color="#D2FF00" />
      </View>
      <Text style={styles.title}>PROGRESO Y MÉTRICAS</Text>
      <Text style={styles.subtitle}>
        Registra tus cargas y monitorea tus récords personales.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F17",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#151C28",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#263346",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    color: "#F8FAFC",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 6,
    textAlign: "center",
  },
});
