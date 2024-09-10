import {
  signInFormDefaultValues,
  signInFormSchema,
  SignInFormType,
} from "@/public/modules/sign-in/util/sign-in-schema.util";
import KeyboardAvoidingContainer from "@/shared/components/keyboard-avoing-container/KeyboardAvoingContainer";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View, Image, Alert } from "react-native";
import { Button, Text } from "react-native-paper";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@/shared/components/form/form-text-fields/TextField";
import FormLabel from "@/shared/components/form/form-label/FormLabel";
import FormError from "@/shared/components/form/form-error/FormError";
import PrimaryButton from "@/shared/components/buttons/PrimaryButton";
import theme from "@/shared/theme/theme";
import { useRouter } from "expo-router";
import { supabase } from "@/shared/lib/supabase";
import Logo from "@/assets/images/logo/logo-app.svg";
import FormControl from "@/shared/components/form/form-control/FormControl";

const SignIn = () => {
  const router = useRouter();
  const formConfig = useForm<SignInFormType>({
    defaultValues: signInFormDefaultValues,
    resolver: yupResolver(signInFormSchema),
  });

  const onSubmit = async (values: SignInFormType) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      ...values,
    });
    if (error) {
      Alert.alert("", error.message);
    }
  };

  return (
    <FormProvider {...formConfig}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Logo width={400} height={200} />
        </View>
        <FormControl name="email">
          <FormLabel>Correo/usuario</FormLabel>
          <TextField />
          <FormError />
        </FormControl>

        <FormControl name="password">
          <FormLabel>Contraseña</FormLabel>
          <TextField type="pass" />
          <FormError />
        </FormControl>
        <PrimaryButton 
          onPress={formConfig.handleSubmit(onSubmit)}
          disabled={formConfig.formState.isSubmitting}
          loading={formConfig.formState.isSubmitting}
          >
          Iniciar sesion
        </PrimaryButton>

        <View style={{ marginTop: 20 }}>
          <Button onPress={() => router.replace("/register")}>
            Registrarse
          </Button>
        </View>
      </View>
    </FormProvider>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    gap: 5,
  },
  title: {
    textAlign: "center",
    fontSize: 60,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  titleContainer: {
    // marginBottom: 50,
    display: "flex",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
});
