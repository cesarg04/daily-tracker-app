import CreateIncomeSheet from "@/private/modules/home/components/create-income/CreateIncomeSheet";
import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import DetailIncome from "../incomes/DetailIncome";
import { StyleSheet } from "react-native";
import UpdateIncomeSheet from "@/private/modules/home/components/create-income/UpdateIncomeSheet";

registerSheet("edit-income-sheet", UpdateIncomeSheet);
registerSheet("create-income-sheet", CreateIncomeSheet);
registerSheet("detail-income-sheet", DetailIncome);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.

declare module "react-native-actions-sheet" {
  interface Sheets {
    "create-income-sheet": SheetDefinition<{
      returnValue: {
        onCreate?: (mode: "success" | "cancel") => void;
      };
    }>;
    "detail-income-sheet": SheetDefinition<{
      payload: {
        id: string;
      };
    }>;
    "edit-income-sheet": SheetDefinition<{
      payload: {
        id: string;
      };
    }>;
  }
}

export {};

export const BorderStyles = StyleSheet.create({
  borders: {
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopStartRadius: 20,
  },
});
