import useSupabase from "@/shared/hooks/useSupabase";
import { authServices } from "@/shared/services/auth/auth.services";
import useAuthStore from "@/shared/store/auth.store";
import theme from "@/shared/theme/theme";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const { useGetStatusSession } = authServices();
  const router = useRouter();

  const { login } = useAuthStore();

  useEffect(() => {
    const getStatus = async () => {
      const {
        data: { session },
        error,
      } = await useGetStatusSession.mutateAsync();
      if (session) {
        login(session?.user, session?.access_token);
        router.replace("/home");
        return;
      }
      router.replace("/sign-in");
    };

    getStatus();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        animating={true}
        size={200}
        color={theme.colors.primary}
      />
    </View>
  );
}
