import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Revisar mi entrenamiento"
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
          let iconName: any = "options";
          if (route.name === "Acceso a Configuración") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Revisar mi entrenamiento") {
            iconName = focused ? "fitness" : "fitness-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        drawerStyle: {
          backgroundColor: "#0B0F17",
          width: 280,
        },
        drawerActiveTintColor: "#D2FF00",
        drawerInactiveTintColor: "#94A3B8",
        drawerActiveBackgroundColor: "#151C28",
        drawerLabelStyle: {
          fontSize: 14,
          fontWeight: "700",
        },
        headerStyle: {
          backgroundColor: "#0B0F17",
          shadowColor: "transparent",
          elevation: 0,
        },
        headerTintColor: "#F8FAFC",
      })}
    >
      <Drawer.Screen
        name="Revisar mi entrenamiento"
        component={TabNavigator}
        options={{ title: "Mi Entrenamiento" }}
      />
      <Drawer.Screen
        name="Acceso a Configuración"
        component={SettingsScreen}
        options={{ title: "Configuración" }}
      />
    </Drawer.Navigator>
  );
}
