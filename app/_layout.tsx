import theme from "@/shared/theme/theme";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            // header: () => <Header/>
            headerShown: false,
          }}
          initialRouteName="home"
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </SafeAreaView>
  );
}
