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
          height: 70,
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
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={30} color={"white"} />
          ),
        }}
      />
      <Tabs.Screen
        name="monthly"
        options={{
          title: "Monthly",
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-clear" size={30} color={"white"} />
          ),
        }}
      />

      <Tabs.Screen
        name="weekly"
        options={{
          title: "Monthly",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="file-tray-stacked-sharp"
              size={30}
              color={"white"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
