import {
  signInFormDefaultValues,
  signInFormSchema,
  SignInFormType,
} from "@/public/modules/sign-in/util/sign-in-schema.util";
import KeyboardAvoidingContainer from "@/shared/components/keyboard-avoing-container/KeyboardAvoingContainer";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@/shared/components/form-control/FormControl";
import TextField from "@/shared/components/text-fields/TextField";
import FormLabel from "@/shared/components/form-label/FormLabel";
import FormError from "@/shared/components/form-error/FormError";
import PrimaryButton from "@/shared/components/buttons/PrimaryButton";

const SignIn = () => {
  const formConfig = useForm<SignInFormType>({
    defaultValues: signInFormDefaultValues,
    resolver: yupResolver(signInFormSchema),
  });

  return (
    <FormProvider {...formConfig}>
      <KeyboardAvoidingContainer>
        <View style={styles.container}>
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
          <PrimaryButton>
            Iniciar sesion
          </PrimaryButton>
        </View>
      </KeyboardAvoidingContainer>
    </FormProvider>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
