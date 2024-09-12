import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  createIncomeFormDefaultValues,
  createIncomeSchema,
  TCreateIncomeFormType,
} from "../../util/create-income-schema.util";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@/shared/components/form/form-control/FormControl";
import TextField from "@/shared/components/form/form-text-fields/TextField";
import FormError from "@/shared/components/form/form-error/FormError";
import FormLabel from "@/shared/components/form/form-label/FormLabel";

const CreateIncomeTemplate = () => {
  const formConfig = useForm<TCreateIncomeFormType>({
    defaultValues: createIncomeFormDefaultValues,
    resolver: yupResolver(createIncomeSchema),
  });

  return (
    <FormProvider {...formConfig}>
      <View style={styles.container}>

        <View>
            <Text style={styles.title} >
                Crear Gasto
            </Text>
        </View>

        <FormControl name="amount">
            <FormLabel>Nombre del ingreso</FormLabel>
            <TextField keyboardType="numeric" mask="money" />
            <FormError/>

        </FormControl>
      </View>
    </FormProvider>
  );
};

export default CreateIncomeTemplate;

const styles = StyleSheet.create({
  container: {
    height: 400,
    paddingVertical: 30,
    paddingHorizontal: 10
  },
  titleContainer: {

  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold'
  }
});
