import { View, StyleSheet, Platform } from "react-native";
import React, { useEffect, useRef } from "react";
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from "react-native-actions-sheet";
import { Button, IconButton } from "react-native-paper";
import XIcon from "@/assets/icons/circle-x.svg";
import theme from "@/shared/theme/theme";
import { FormProvider, useForm } from "react-hook-form";
import {
  createIncomeFormDefaultValues,
  createIncomeSchema,
  TCreateIncomeFormType,
} from "../../util/create-income-schema.util";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@/shared/components/form/form-control/FormControl";
import TextField from "@/shared/components/form/form-text-fields/TextField";
import { Text } from "react-native-paper";
import FormError from "@/shared/components/form/form-error/FormError";
import PrimaryButton from "@/shared/components/buttons/PrimaryButton";
import { incomesServices } from "@/shared/services/incomes/incomes.services";
import useSnackbar from "@/shared/hooks/useSnackbar";
import { BorderStyles } from "@/shared/components/sheet/Sheets";

const CreateIncomeSheet = (props: SheetProps<"create-income-sheet">) => {
  const actionRef = useRef<ActionSheetRef>(null);
  const { useInsertIncome } = incomesServices();
  const { snackBar } = useSnackbar();

  const formConfig = useForm<TCreateIncomeFormType>({
    defaultValues: createIncomeFormDefaultValues,
    resolver: yupResolver(createIncomeSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values: TCreateIncomeFormType) => {
    const { data, error, status } = await useInsertIncome.mutateAsync(values);
    if (status === 201) {
      snackBar({
        message: "El gasto ha sido creado satsifactoriamente.",
        type: "success",
      });
      formConfig.reset();
      actionRef.current?.hide();
    }
    if (error) {
      snackBar({
        message: "Ha ocurido un error al crear el gasto, intente nuevamente.",
        type: "error",
      });
    }
  };

  const values = formConfig.getFieldState('amount')

  useEffect(() => {
    console.log(values)
  }, [values]);

  return (
    <ActionSheet ref={actionRef} containerStyle={BorderStyles.borders}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Agregar Ingreso</Text>
          <IconButton
            icon={() => (
              <XIcon width={30} height={30} color={theme.colors.text} />
            )}
            onPress={() => actionRef.current?.hide()}
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
              onPress={formConfig.handleSubmit(onSubmit)}
              loading={formConfig.formState.isSubmitting}
              disabled={formConfig.formState.isSubmitting}
            >
              Insertar
            </PrimaryButton>
          </FormProvider>
        </View>
      </View>
    </ActionSheet>
  );
};

export default CreateIncomeSheet;

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
