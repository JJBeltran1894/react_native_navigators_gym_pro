import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "../context/RoutineContext";

export default function RoutineDetailScreen({ route, navigation }: any) {
  const idToView = route.params?.id;
  const { routines } = useRoutines();

  const routine = routines.find((r) => r.id === idToView);

  if (!routine) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0B0F17" />
        <View style={styles.notFoundContainer}>
          <Ionicons name="alert-circle" size={60} color="#FF3B30" />
          <Text style={styles.notFoundTitle}>RUTINA NO ENCONTRADA</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>VOLVER</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F17" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#F8FAFC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DETALLES DE RUTINA</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Tarjeta Hero */}
        <View style={styles.heroCard}>
          <Text style={styles.routineTitle}>{routine.name}</Text>

          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Ionicons name="time" size={18} color="#D2FF00" />
              <View>
                <Text style={styles.metricValue}>{routine.duration} MIN</Text>
                <Text style={styles.metricLabel}>DURACIÓN</Text>
              </View>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Ionicons name="calendar" size={18} color="#00E5FF" />
              <View>
                <Text style={styles.metricValue}>{routine.createdAt}</Text>
                <Text style={styles.metricLabel}>CREADO</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>GRUPO MUSCULAR PRINCIPAL</Text>
            <View style={styles.musclePill}>
              <Ionicons name="fitness-outline" size={18} color="#D2FF00" />
              <Text style={styles.musclePillText}>
                {routine.muscleGroup.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* Botón Editar */}
        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("AddRoutine", { id: routine.id })}
        >
          <Ionicons name="pencil" size={18} color="#0B0F17" />
          <Text style={styles.editButtonText}>EDITAR CONFIGURACIÓN</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F17",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#151C28",
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#F8FAFC",
    letterSpacing: 1.2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#151C28",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#263346",
  },
  content: {
    padding: 22,
    gap: 18,
  },
  heroCard: {
    backgroundColor: "#151C28",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#263346",
  },
  routineTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#F8FAFC",
    marginBottom: 20,
    textTransform: "capitalize",
  },
  metricsGrid: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0B0F17",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#263346",
  },
  metricItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  metricValue: {
    color: "#F8FAFC",
    fontSize: 15,
    fontWeight: "800",
  },
  metricLabel: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  metricDivider: {
    width: 1,
    height: 28,
    backgroundColor: "#263346",
    marginHorizontal: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#263346",
    marginVertical: 20,
  },
  section: {
    gap: 10,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#D2FF00",
    letterSpacing: 1,
  },
  musclePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#0B0F17",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#263346",
  },
  musclePillText: {
    color: "#F8FAFC",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  editButton: {
    backgroundColor: "#D2FF00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#D2FF00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  editButtonText: {
    color: "#0B0F17",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
  notFoundTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#F8FAFC",
    letterSpacing: 1,
  },
  backButtonText: {
    color: "#F8FAFC",
    fontWeight: "800",
    fontSize: 14,
  },
});
