import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Acceso a Configuración"
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
          let iconName: any = "list";
          if (route.name === "Acceso a Configuración") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Revisar mi entrenamiento") {
            iconName = focused ? "fitness" : "fitness-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        drawerActiveTintColor: "#b44a0d",
        drawerInactiveTintColor: "gray",
      })}
    >
      <Drawer.Screen
        name="Acceso a Configuración"
        component={SettingsScreen}
        options={{ title: "Configuración" }}
      />
      <Drawer.Screen
        name="Revisar mi entrenamiento"
        component={TabNavigator}
        options={{ title: "Mi Entrenamiento" }}
      />
    </Drawer.Navigator>
  );
}
