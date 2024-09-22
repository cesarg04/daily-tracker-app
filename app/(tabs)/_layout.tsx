import Header from "@/shared/components/header/Header";
import theme from "@/shared/theme/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IconButton } from "react-native-paper";
import { SheetManager } from "react-native-actions-sheet";

export default function TabLayout() {
  const onOpenCreate = () => {
    SheetManager.show("create-income-sheet").then((res) => {});
  };

  return (
    <>
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
            fontWeight: "bold",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Inicio",
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
          name="weekly"
          options={{
            title: "Senamal",
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name="file-tray-stacked-sharp"
                size={size}
                color={focused ? "white" : "#ccc"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="monthly"
          options={{
            title: "Mensual",
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name="calendar-clear"
                size={size}
                color={focused ? "white" : "#ccc"}
              />
            ),
          }}
        />
      </Tabs>
      <IconButton
        size={45}
        onPress={onOpenCreate}
        mode="contained"
        style={{
          position: "absolute",
          bottom: 70,
          right: 10,
          backgroundColor: theme.colors.primary,
        }}
        icon={() => <Ionicons size={40} name="add" color={"white"} />}
      />
    </>
  );
}
