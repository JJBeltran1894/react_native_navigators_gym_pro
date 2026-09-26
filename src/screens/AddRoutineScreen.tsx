import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "../context/RoutineContext";

export default function AddRoutineScreen({ navigation, route }: any) {
  const { addRoutine, updateRoutine, routines } = useRoutines();
  const idToEdit = route.params?.id;

  const [name, setName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [durationString, setDurationString] = useState("");

  // Efecto para pre-llenar los inputs si estamos en modo edición
  useEffect(() => {
    if (idToEdit) {
      const routineFound = routines.find((r) => r.id === idToEdit);
      if (routineFound) {
        setName(routineFound.name);
        setDurationString(routineFound.duration.toString());
        setMuscleGroup(routineFound.muscleGroup);
      }
    }
  }, [idToEdit, routines]);

  const handleSave = () => {
    if (!name.trim() || !durationString.trim() || !muscleGroup.trim()) {
      Alert.alert("Error", "Todos los campos obligatorios (*) son requeridos");
      return;
    }

    const durationNumber = parseFloat(durationString);
    if (isNaN(durationNumber) || durationNumber <= 0) {
      Alert.alert("Error", "La duración debe ser un número válido mayor a 0");
      return;
    }

    if (idToEdit) {
      updateRoutine(idToEdit, {
        name: name.trim(),
        duration: durationNumber,
        muscleGroup: muscleGroup.trim(),
      });
    } else {
      addRoutine({
        name: name.trim(),
        duration: durationNumber,
        muscleGroup: muscleGroup.trim(),
      });
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Encabezado Superior */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIconButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#f8fafc" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {idToEdit ? "Editar Rutina" : "Nueva Rutina"}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Tarjeta de Formulario */}
          <View style={styles.formCard}>
            {/* Campo: Nombre de la Rutina */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre de la Rutina *</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Ej. Pecho y Tríceps"
                placeholderTextColor="#64748b"
              />
            </View>

            {/* Campo: Grupo Muscular */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Grupo Muscular *</Text>
              <TextInput
                style={styles.input}
                value={muscleGroup}
                onChangeText={setMuscleGroup}
                placeholder="Ej. Pecho / Brazos / Espalda"
                placeholderTextColor="#64748b"
              />
            </View>

            {/* Campo: Duración */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Duración (minutos) *</Text>
              <TextInput
                style={styles.input}
                value={durationString}
                onChangeText={setDurationString}
                keyboardType="numeric"
                placeholder="Ej. 45"
                placeholderTextColor="#64748b"
              />
            </View>
          </View>

          {/* Botón de Acción */}
          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.8}
            onPress={handleSave}
          >
            <Ionicons
              name={idToEdit ? "save-outline" : "add-circle-outline"}
              size={22}
              color="#ffffff"
            />
            <Text style={styles.saveButtonText}>
              {idToEdit ? "Actualizar Rutina" : "Guardar Rutina"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f8fafc",
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
    gap: 20,
  },
  formCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#94a3b8",
  },
  input: {
    backgroundColor: "#0f172a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#f8fafc",
  },
  saveButton: {
    backgroundColor: "#6366f1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
    elevation: 4,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
