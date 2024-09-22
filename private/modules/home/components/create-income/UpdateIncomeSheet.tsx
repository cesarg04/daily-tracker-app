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

const UpdateIncomeSheet = (props: SheetProps<"edit-income-sheet">) => {
  const actionRef = useRef<ActionSheetRef>(null);
//   const { useGetIncomeById } = incomesServices();


//   const incomes = useGetIncomeById(props.payload?.id);

//   const onSubmit = async (values: TCreateIncomeFormType) => {};

//   const adapted = incomes.data ? incomesPatchAdapter(incomes.data) : undefined;


    useEffect(() => {
        actionRef.current?.show()
    }, [])
    
  return (
    <ActionSheet
      ref={actionRef}
    //   id={props.sheetId}
      containerStyle={BorderStyles.borders}
    >
      {/* {incomes.isLoading && !incomes.data && <ActivityIndicator />}

      {adapted && (
        <IncomesFormLayout
          actionRef={actionRef}
          initialValues={adapted}
          onSubmit={onSubmit}
        />
      )} */}
      <Text>Hola mundo</Text>
    </ActionSheet>
  );
};

export default UpdateIncomeSheet;

const styles = StyleSheet.create({});
