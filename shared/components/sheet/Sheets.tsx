import CreateIncomeSheet from "@/private/modules/home/components/create-income/CreateIncomeSheet";
import { registerSheet, SheetDefinition } from "react-native-actions-sheet";

registerSheet("create-income-sheet", CreateIncomeSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.

declare module "react-native-actions-sheet" {
  interface Sheets {
    "create-income-sheet": SheetDefinition<{
      returnValue: {
        onCreate?: (mode: 'success' | 'cancel') => void;
      };
    }>;
  }
}

export {};
