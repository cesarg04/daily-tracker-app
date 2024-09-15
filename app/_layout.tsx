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
import {
  MPLUSRounded1c_100Thin,
  MPLUSRounded1c_300Light,
  MPLUSRounded1c_400Regular,
  MPLUSRounded1c_500Medium,
  MPLUSRounded1c_800ExtraBold,
  MPLUSRounded1c_900Black,
  useFonts,
} from "@expo-google-fonts/m-plus-rounded-1c";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { SheetProvider } from "react-native-actions-sheet";
// import { useFonts } from 'expo-font';
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';

const queryClient = new QueryClient();

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  let [loaded, error] = useFonts({
    MPLUSRounded1c_100Thin,
    MPLUSRounded1c_300Light,
    MPLUSRounded1c_400Regular,
    "MplusMedium": MPLUSRounded1c_500Medium,
    MPLUSRounded1c_800ExtraBold,
    MPLUSRounded1c_900Black,
  });

  useEffect(() => {
    console.log("loader", loaded);
    console.log("error", error);

    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <AppLoading/>;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <SheetProvider>
          <StatusBar backgroundColor={theme.colors.primary} />
          <PaperProvider
            theme={theme}
            settings={{
              icon: ({ name, ...props }) => (
                <Ionicons name={name as any} {...props} />
              ),
            }}
          >
            <ModalContext>
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
            </ModalContext>
          </PaperProvider>
        </SheetProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
