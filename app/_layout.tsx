import theme from "@/shared/theme/theme";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
