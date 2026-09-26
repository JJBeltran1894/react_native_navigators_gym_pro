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
          let iconName: any = "list";
          if (route.name === "ProgressTab") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "RoutineTab") {
            iconName = focused ? "barbell" : "barbell-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#f36e21",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="ProgressTab"
        component={ProgressListScreen}
        options={{ title: "Progreso", headerShown: false }}
      />
      <Tab.Screen
        name="RoutineTab"
        component={RoutineListScreen}
        options={{ title: "Rutinas", headerShown: false }}
      />
    </Tab.Navigator>
  );
}
