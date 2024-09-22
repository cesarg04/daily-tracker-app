import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import useAuthStore from "@/shared/store/auth/auth.store";
import { userServices } from "@/shared/services/user/user.services";
import { Avatar, Button } from "react-native-paper";
import Box from "@/shared/components/box/Box";
import CustomSwitch from "@/shared/components/switch/Switch";
import * as SecureStorage from "expo-secure-store";
import theme from "@/shared/theme/theme";
import useAlert from "@/shared/hooks/useAlert";
import { authServices } from "@/shared/services/auth/auth.services";
import { useRouter } from "expo-router";

const settings = () => {
  const { useGetUser } = userServices();
  const { data } = useGetUser();
  const { user, logout } = useAuthStore();
  const { alert } = useAlert();
  const { useLogut } = authServices();
  const router = useRouter();
  const [isNotificationsPushEnabled, setisNotificationsPushEnabled] =
    useState(false);

  const initialLetter = useMemo(
    () => data?.data?.full_name?.charAt(0).toUpperCase(),
    [data?.data?.full_name]
  );

  const toggleNotificationPush = async (value: boolean) => {
    if (value) {
      await SecureStorage.setItemAsync("notificationsPush", "true");
    } else {
      await SecureStorage.setItemAsync("notificationsPush", "false");
    }
    setisNotificationsPushEnabled(value);
  };

  const onLogout = () => {
    alert({
      message: "Esta seguro(a) que desea cerrar sesion?",
      type: "info",
      confirmBtnMessage: "Si",
      declineBtnMessage: "No",
    }).then(async (res) => {
      if (res.type === "confirm") {
        const { error } = await useLogut.mutateAsync();
        if (!error) {
          logout();
          router.replace("/(auth)/sign-in");
        }
      }
    });
  };

  useEffect(() => {
    const getNotificationStatus = async () => {
      const value = await SecureStorage.getItemAsync("notificationsPush");
      if (value === "true") {
        setisNotificationsPushEnabled(true);
      }
    };

    getNotificationStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Box>
        <Text style={styles.accountTitle}>Cuenta</Text>
        <View style={styles.userContainer}>
          {data?.data?.avatar_url ? (
            <Avatar.Image source={{ uri: data.data.avatar_url }} />
          ) : (
            <Avatar.Text label={initialLetter ?? ""} />
          )}
          <View>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              {data?.data?.full_name}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "600", color: "gray" }}>
              {user?.email}
            </Text>
          </View>
          <View style={{ width: "100%" }}>
            <Button
              mode="contained"
              labelStyle={{ fontSize: 20 }}
              style={{ borderRadius: 15 }}
              onPress={() => {
                router.navigate("/settings/edit-profile");
              }}
            >
              Editar perfil
            </Button>
          </View>
        </View>
      </Box>

      <Box>
        <Text style={styles.accountTitle}>Notificaciones</Text>
        <View style={styles.notificationContainer}>
          <Text style={{ fontSize: 23, fontWeight: "500" }}>
            Notificaciones push
          </Text>
          <CustomSwitch
            value={isNotificationsPushEnabled}
            onValueChange={(value) => toggleNotificationPush(value)}
          />
        </View>
      </Box>

      <View style={{ flex: 1 }} />

      <Button
        mode="contained"
        labelStyle={{ fontSize: 20, alignItems: "center" }}
        style={{
          borderRadius: 15,
          height: 60,
          display: "flex",
          justifyContent: "center",
        }}
        buttonColor={theme.colors.error}
        onPress={onLogout}
      >
        Cerrar Sesion
      </Button>
    </View>
  );
};

export default settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    display: "flex",
    gap: 30,
  },
  accountView: {
    minHeight: 200,
    borderColor: "#ccc",
    borderWidth: 3,
    borderRadius: 20,
    padding: 20,
    gap: 10,
  },
  accountTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 5,
  },
  nameContainer: {
    display: "flex",
  },
  notificationContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
});
