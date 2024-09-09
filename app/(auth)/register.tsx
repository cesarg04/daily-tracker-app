import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  registerFormDefaultValues,
  registerFormSchema,
  RegisterFormType,
} from "@/public/modules/register/util/register-schema.util";
import { yupResolver } from "@hookform/resolvers/yup";
import KeyboardAvoidingContainer from "@/shared/components/keyboard-avoing-container/KeyboardAvoingContainer";
import FormLabel from "@/shared/components/form/form-label/FormLabel";
import TextField from "@/shared/components/form/form-text-fields/TextField";
import FormError from "@/shared/components/form/form-error/FormError";
import { useRouter } from "expo-router";
import { Button } from "react-native-paper";
import theme from "@/shared/theme/theme";
import PrimaryButton from "@/shared/components/buttons/PrimaryButton";
import { supabase } from "@/shared/lib/supabase";
import Logo from '@/assets/images/logo/logo-app.svg'
import FormControl from "@/shared/components/form/form-control/FormControl";

const Register = () => {
  const router = useRouter();
  const formConfig = useForm<RegisterFormType>({
    defaultValues: registerFormDefaultValues,
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit = async (values: RegisterFormType) => {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    // const { data: data1 } = await supabase.channel()

    // console.log(data1, error);

    // Alert.alert(JSON.stringify(values))
  };

  return (
    <FormProvider {...formConfig}>
      <KeyboardAvoidingContainer>
        <View style={styles.container}>
          <View>
          <Logo width={400} height={200} />
          </View>

          <FormControl name="name">
            <FormLabel>Nombre completo</FormLabel>
            <TextField />
            <FormError />
          </FormControl>
          <FormControl name="username">
            <FormLabel>Usuario</FormLabel>
            <TextField />
            <FormError />
          </FormControl>
          <FormControl name="email">
            <FormLabel>Correo electronico</FormLabel>
            <TextField />
            <FormError />
          </FormControl>

          <FormControl name="password">
            <FormLabel>Contraseña</FormLabel>
            <TextField type="pass" />
            <FormError />
          </FormControl>

          <PrimaryButton onPress={formConfig.handleSubmit(onSubmit)} disabled={formConfig.formState.isSubmitting} >
            Registrarse
          </PrimaryButton>

          <View style={{ marginTop: 20 }}>
            <Button onPress={() => router.replace("/sign-in")}>
              Iniciar sesion
            </Button>
          </View>
        </View>
      </KeyboardAvoidingContainer>
    </FormProvider>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    gap: 5,
    marginBottom: 100
  },
  containerTitle: {},
  title: {
    fontSize: 50,
    color: theme.colors.primary,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
});
