import React from "react";
import { StyleSheet, Text, Button, View } from "react-native";
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
