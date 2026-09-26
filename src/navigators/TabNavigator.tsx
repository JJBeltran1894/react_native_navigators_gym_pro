import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProgressListScreen from "../screens/ProgressListScreen";
import RoutineListScreen from "../screens/RoutineListScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = "barbell";
          if (route.name === "ProgressTab") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "RoutineTab") {
            iconName = focused ? "flash" : "flash-outline";
          }
          return <Ionicons name={iconName} size={size ?? 22} color={color} />;
        },
        tabBarActiveTintColor: "#D2FF00", // Volt Neon
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: {
          backgroundColor: "#151C28",
          borderTopColor: "rgba(255,255,255,0.06)",
          borderTopWidth: 1,
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          letterSpacing: 0.5,
        },
      })}
    >
      <Tab.Screen
        name="RoutineTab"
        component={RoutineListScreen}
        options={{ title: "RUTINAS", headerShown: false }}
      />
      <Tab.Screen
        name="ProgressTab"
        component={ProgressListScreen}
        options={{ title: "PROGRESO", headerShown: false }}
      />
    </Tab.Navigator>
  );
}
