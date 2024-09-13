import Header from "@/shared/components/header/Header";
import theme from "@/shared/theme/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        header: () => <Header />,
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          height: 65,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={focused ? "white" : "#ccc"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="monthly"
        options={{
          title: "Monthly",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name="calendar-clear"
              size={size}
              color={focused ? "white" : "#ccc"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="weekly"
        options={{
          title: "Monthly",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name="file-tray-stacked-sharp"
              size={size}
              color={focused ? "white" : "#ccc"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
