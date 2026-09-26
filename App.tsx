import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import DrawerNavigator from "./src/navigators/DrawerNavigator";
import ChestDetailScreen from "./src/screens/ChestDetailScreen";
import { RoutineProvider } from "./src/context/RoutineContext";

export type RootStackParamList = {
  MainDrawer: undefined;
  ChestDetail: undefined;
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
            component={ChestDetailScreen}
            options={{ title: "Detalles Rutina de Pecho" }}
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
