import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "../context/RoutineContext";

export default function RoutineListScreen({ route, navigation }: any) {
  const { routines, deleteRoutine } = useRoutines();

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      "Eliminar Rutina",
      `¿Estás seguro de que deseas eliminar "${name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteRoutine(id),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      {/* Encabezado */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Mis Rutinas</Text>
          <Text style={styles.headerSubtitle}>
            cd ..
            {routines.length} {routines.length === 1 ? "rutina" : "rutinas"}{" "}
            registradas
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("AddRoutine")}
        >
          <Ionicons name="add" size={26} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* FlatList con Renderizado Dinámico */}
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="barbell-outline" size={64} color="#475569" />
            <Text style={styles.emptyTitle}>Sin rutinas registradas</Text>
            <Text style={styles.emptySubtext}>
              Presiona el botón "+" para agregar tu primera rutina.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Información de la Tarjeta */}
            <View style={styles.cardInfo}>
              <Text style={styles.routineName} numberOfLines={1}>
                {item.name}
              </Text>

              <View style={styles.badgeRow}>
                <View style={styles.muscleBadge}>
                  <Text style={styles.muscleText}>{item.muscleGroup}</Text>
                </View>

                <View style={styles.durationBadge}>
                  <Ionicons name="time-outline" size={14} color="#10b981" />
                  <Text style={styles.durationText}>{item.duration} mins</Text>
                </View>
              </View>
            </View>

            {/* Acciones: Ver Detalles, Editar y Eliminar */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.viewButton]}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("ChestDetail", { id: item.id })
                }
              >
                <Ionicons name="eye" size={18} color="#3b82f6" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("AddRoutine", { id: item.id })
                }
              >
                <Ionicons name="pencil" size={18} color="#f59e0b" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                activeOpacity={0.7}
                onPress={() => handleDelete(item.id, item.name)}
              >
                <Ionicons name="trash" size={18} color="#ef4444" />
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
    backgroundColor: "#0f172a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f8fafc",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 2,
  },
  addButton: {
    backgroundColor: "#6366f1",
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardInfo: {
    flex: 1,
    marginRight: 12,
  },
  routineName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f8fafc",
    marginBottom: 8,
    textTransform: "capitalize",
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  muscleBadge: {
    backgroundColor: "#0f172a",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  muscleText: {
    color: "#6366f1",
    fontSize: 13,
    fontWeight: "600",
  },
  durationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#0f172a",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  durationText: {
    color: "#10b981",
    fontWeight: "700",
    fontSize: 13,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  viewButton: {
    backgroundColor: "rgba(59, 130, 246, 0.15)",
  },
  editButton: {
    backgroundColor: "rgba(245, 158, 11, 0.15)",
  },
  deleteButton: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#64748b",
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#475569",
    marginTop: 4,
    textAlign: "center",
  },
});
