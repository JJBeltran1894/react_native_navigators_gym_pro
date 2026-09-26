import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "../context/RoutineContext";

export default function RoutineListScreen({ navigation }: any) {
  const { routines, deleteRoutine } = useRoutines();

  const handleDelete = (id: string, name: string) => {
    Alert.alert("ELIMINAR RUTINA", `¿Confirmas la eliminación de "${name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteRoutine(id),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F17" />

      {/* Encabezado */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerBadge}>WORKOUT LOG</Text>
          <Text style={styles.headerTitle}>Mis Rutinas</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("AddRoutine")}
        >
          <Ionicons name="add" size={26} color="#0B0F17" />
        </TouchableOpacity>
      </View>

      {/* Lista Dinámica */}
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="barbell-outline" size={48} color="#D2FF00" />
            </View>
            <Text style={styles.emptyTitle}>SIN RUTINAS ACTIVAS</Text>
            <Text style={styles.emptySubtext}>
              Presiona el botón "+" para diseñar tu primer plan de
              entrenamiento.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardMain}>
              <Text style={styles.routineName} numberOfLines={1}>
                {item.name}
              </Text>

              <View style={styles.badgeRow}>
                <View style={styles.muscleBadge}>
                  <Text style={styles.muscleText}>
                    {item.muscleGroup.toUpperCase()}
                  </Text>
                </View>

                <View style={styles.durationBadge}>
                  <Ionicons name="time" size={13} color="#D2FF00" />
                  <Text style={styles.durationText}>{item.duration} MIN</Text>
                </View>
              </View>
            </View>

            {/* Botones de Acción */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("ChestDetail", { id: item.id })
                }
              >
                <Ionicons name="eye-outline" size={18} color="#00E5FF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("AddRoutine", { id: item.id })
                }
              >
                <Ionicons name="pencil-outline" size={18} color="#FFB800" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.7}
                onPress={() => handleDelete(item.id, item.name)}
              >
                <Ionicons name="trash-outline" size={18} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  headerBadge: {
    color: "#D2FF00",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  addButton: {
    backgroundColor: "#D2FF00",
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D2FF00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  listContainer: {
    paddingHorizontal: 22,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#151C28",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#263346",
  },
  cardMain: {
    flex: 1,
    marginRight: 12,
  },
  routineName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#F8FAFC",
    marginBottom: 10,
    textTransform: "capitalize",
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  muscleBadge: {
    backgroundColor: "#0B0F17",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#263346",
  },
  muscleText: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  durationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(210, 255, 0, 0.08)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(210, 255, 0, 0.2)",
  },
  durationText: {
    color: "#D2FF00",
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 0.5,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 6,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#0B0F17",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#263346",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#151C28",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#263346",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#F8FAFC",
    letterSpacing: 1,
  },
  emptySubtext: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 6,
    textAlign: "center",
    maxWidth: 260,
  },
});
