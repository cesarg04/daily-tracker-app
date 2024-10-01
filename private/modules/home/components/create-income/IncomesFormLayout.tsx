import { View, Text, StyleSheet } from "react-native";
import React, { RefObject, useEffect } from "react";
import { TCreateIncomeFormType } from "../../util/create-income-schema.util";
import theme from "@/shared/theme/theme";
import { ActionSheetRef } from "react-native-actions-sheet";
import { FormProvider, useForm } from "react-hook-form";
import TextField from "@/shared/components/form/form-text-fields/TextField";
import FormError from "@/shared/components/form/form-error/FormError";
import PrimaryButton from "@/shared/components/buttons/PrimaryButton";
import { IconButton } from "react-native-paper";
import XIcon from "@/assets/icons/circle-x.svg";
import {
  createIncomeSchema,
} from "../../util/create-income-schema.util";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@/shared/components/form/form-control/FormControl";

interface IIncomesFormLayoutProps {
  initialValues: TCreateIncomeFormType;
  onSubmit: (values: TCreateIncomeFormType) => Promise<void> | void;
  onCancel?: () => void;
  actionRef: RefObject<ActionSheetRef>;
}

const IncomesFormLayout = (props: IIncomesFormLayoutProps) => {
  const formConfig = useForm<TCreateIncomeFormType>({
    defaultValues: props.initialValues,
    resolver: yupResolver(createIncomeSchema),
    mode: "onTouched",
  });

  const handleSubmit = async (values: TCreateIncomeFormType) => {
    formConfig.reset();
    await props.onSubmit(values)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Agregar Ingreso</Text>
        <IconButton
          icon={() => (
            <XIcon width={30} height={30} color={theme.colors.text} />
          )}
          onPress={() => props.actionRef.current?.hide()}
        />
      </View>
      <View style={styles.containerForm}>
        <FormProvider {...formConfig}>
          <FormControl name="amount">
            <TextField mask="money" placeholder="Monto" />
            <FormError />
          </FormControl>

          <FormControl name="description">
            <TextField multiline placeholder="Descripcion" />
            <FormError />
          </FormControl>
          <PrimaryButton
            onPress={formConfig.handleSubmit(handleSubmit)}
            loading={formConfig.formState.isSubmitting}
            disabled={formConfig.formState.isSubmitting}
          >
            Insertar
          </PrimaryButton>
        </FormProvider>
      </View>
    </View>
  );
};

export default IncomesFormLayout;

const styles = StyleSheet.create({
  container: {
    // height: 300,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    // fontFamily: Platform.OS === "ios" ? "Asul_700Bold" : undefined,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  containerForm: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "column",
  },
});
