import Header from "@/shared/components/Header";
import theme from "@/shared/theme/theme";
import { Stack } from "expo-router";
import {
  Provider as PaperProvider,
} from "react-native-paper";
export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          header: () => <Header/>
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </PaperProvider>
  );
}
