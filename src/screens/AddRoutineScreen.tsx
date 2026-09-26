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
      Alert.alert("CAMPOS INCOMPLETOS", "Por favor completa todos los campos.");
      return;
    }

    const durationNumber = parseFloat(durationString);
    if (isNaN(durationNumber) || durationNumber <= 0) {
      Alert.alert(
        "DURACIÓN INVÁLIDA",
        "Ingresa una duración numérica mayor a 0.",
      );
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
        <Text style={styles.headerTitle}>
          {idToEdit ? "EDITAR RUTINA" : "NUEVA RUTINA"}
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
          <View style={styles.formCard}>
            {/* Campo Nombre */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>NOMBRE DE LA RUTINA</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Ej. Espalda y Biceps Heavy"
                placeholderTextColor="#475569"
              />
            </View>

            {/* Campo Grupo Muscular */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>GRUPO MUSCULAR</Text>
              <TextInput
                style={styles.input}
                value={muscleGroup}
                onChangeText={setMuscleGroup}
                placeholder="Ej. Espalda / Tríceps"
                placeholderTextColor="#475569"
              />
            </View>

            {/* Campo Duración */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>DURACIÓN ESTIMADA (MINUTOS)</Text>
              <TextInput
                style={styles.input}
                value={durationString}
                onChangeText={setDurationString}
                keyboardType="numeric"
                placeholder="Ej. 60"
                placeholderTextColor="#475569"
              />
            </View>
          </View>

          {/* Botón Principal */}
          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.85}
            onPress={handleSave}
          >
            <Ionicons
              name={idToEdit ? "checkmark-circle" : "flash"}
              size={20}
              color="#0B0F17"
            />
            <Text style={styles.saveButtonText}>
              {idToEdit ? "GUARDAR CAMBIOS" : "CREAR RUTINA"}
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
    fontSize: 16,
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
    gap: 22,
  },
  formCard: {
    backgroundColor: "#151C28",
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: "#263346",
    gap: 18,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#0B0F17",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#263346",
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: "600",
    color: "#F8FAFC",
  },
  saveButton: {
    backgroundColor: "#D2FF00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#D2FF00",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  saveButtonText: {
    color: "#0B0F17",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },
});
