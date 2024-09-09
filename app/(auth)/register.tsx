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
import FormControl from "@/shared/components/form-control/FormControl";
import FormLabel from "@/shared/components/form-label/FormLabel";
import TextField from "@/shared/components/text-fields/TextField";
import FormError from "@/shared/components/form-error/FormError";
import { useRouter } from "expo-router";
import { Button } from "react-native-paper";
import theme from "@/shared/theme/theme";
import PrimaryButton from "@/shared/components/buttons/PrimaryButton";
import { supabase } from "@/shared/lib/supabase";

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
            <Text style={styles.title}>Daily Tracker</Text>
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
