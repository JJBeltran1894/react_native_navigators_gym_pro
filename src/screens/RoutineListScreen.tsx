import React from "react";
import { StyleSheet, Text, Button, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoutineListScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Lista de rutinas</Text>
      <Button
        title="Ver rutina de pecho"
        color="#be6532"
        onPress={() => navigation.navigate("ChestDetail")}
      />
      <Button
        title="Iniciar Rutina"
        color="#be6532"
        onPress={() => Alert.alert("Iniciando Rutina")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
