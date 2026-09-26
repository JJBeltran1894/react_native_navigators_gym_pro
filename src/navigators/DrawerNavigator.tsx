import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import SettingsScreen from "../screens/SettingsScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Acceso a Configuración">
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
