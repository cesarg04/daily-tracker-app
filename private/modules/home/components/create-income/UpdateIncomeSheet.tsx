import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from "react-native-actions-sheet";
import { incomesServices } from "@/shared/services/incomes/incomes.services";
import Loading from "@/shared/components/loading/Loading";
import { BorderStyles } from "@/shared/components/sheet/Sheets";
import IncomesFormLayout from "./IncomesFormLayout";
import { incomesPatchAdapter } from "@/shared/services/incomes/adapters/incomes-patch-income.adapter";
import { TCreateIncomeFormType } from "../../util/create-income-schema.util";
import ErrorComponent from "@/shared/components/error/ErrorComponent";
import { ActivityIndicator } from "react-native-paper";
import useSnackbar from "@/shared/hooks/useSnackbar";

const UpdateIncomeSheet = (props: SheetProps<"edit-income-sheet">) => {
  const actionRef = useRef<ActionSheetRef>(null);
  const { useGetIncomeById, useUpdateIncomes } = incomesServices();
  const { snackBar } = useSnackbar();
  const incomes = useGetIncomeById(props.payload?.id);

  const onSubmit = async (values: TCreateIncomeFormType) => {
    const { error, status } = await useUpdateIncomes.mutateAsync({
      id: props.payload?.id!,
      formData: values,
    });
    if (status === 204) {
      snackBar({
        message: "El gasto ha sido actualizado satsifactoriamente.",
        type: "success",
      });
      actionRef.current?.hide();
    }
    if (error) {
      snackBar({
        message:
          "Ha ocurido un error al actualizar el gasto, intente nuevamente.",
        type: "error",
      });
    }
  };

  const adapted = incomes.data ? incomesPatchAdapter(incomes.data) : undefined;

  useEffect(() => {
    // actionRef.current?.show();
  }, []);

  return (
    <ActionSheet
      ref={actionRef}
      id={props.sheetId}
      containerStyle={BorderStyles.borders}
    >
      {incomes.isLoading && !incomes.data && <ActivityIndicator />}

      {adapted && (
        <IncomesFormLayout
          actionRef={actionRef}
          initialValues={adapted}
          onSubmit={onSubmit}
        />
      )}
    </ActionSheet>
  );
};

export default UpdateIncomeSheet;

const styles = StyleSheet.create({});
