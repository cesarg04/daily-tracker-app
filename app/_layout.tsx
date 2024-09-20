import theme from "@/shared/theme/theme";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import ModalContext from "@/shared/contexts/modal/ModalContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import "@/shared/components/sheet/Sheets";
// import {
//   useFonts,
//   MPLUSRounded1c_100Thin,
//   MPLUSRounded1c_300Light,
//   MPLUSRounded1c_400Regular,
//   MPLUSRounded1c_500Medium,
//   MPLUSRounded1c_700Bold,
//   MPLUSRounded1c_800ExtraBold,
//   MPLUSRounded1c_900Black,
// } from "@expo-google-fonts/m-plus-rounded-1c";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { SheetProvider } from "react-native-actions-sheet";
// import {  useFonts, Inter_900Black, Inter_600SemiBold } from '@expo-google-fonts/inter';
import {
  useFonts,
  Asul_400Regular,
  Asul_700Bold,
} from "@expo-google-fonts/asul";

const queryClient = new QueryClient();

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  let [loaded, error] = useFonts({
    Asul_400Regular,
    Asul_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={theme.colors.primary} barStyle={'light-content'} />
        <PaperProvider
          theme={theme}
          settings={{
            icon: ({ name, ...props }) => (
              <Ionicons name={name as any} {...props} />
            ),
          }}
        >
          <ModalContext>
            <SheetProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
                initialRouteName="home"
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </SheetProvider>
          </ModalContext>
        </PaperProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
