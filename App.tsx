import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import DrawerNavigator from "./src/navigators/DrawerNavigator";
import RoutineDetailScreen from "./src/screens/RoutineDetailScreen";
import AddRoutineScreen from "./src/screens/AddRoutineScreen";
import { RoutineProvider } from "./src/context/RoutineContext";

// Tipado de las rutas principales del Stack
export type RootStackParamList = {
  MainDrawer: undefined;
  ChestDetail: { id: string };
  AddRoutine: { id?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <RoutineProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainDrawer">
          <Stack.Screen
            name="MainDrawer"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChestDetail"
            component={RoutineDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddRoutine"
            component={AddRoutineScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RoutineProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
