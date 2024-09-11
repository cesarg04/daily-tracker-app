import { useMutation } from "@tanstack/react-query";
import { INCOMES_KEYS } from "./keys/incomes.keys";
import useSupabase from "@/shared/hooks/useSupabase";

export const incomesServices = () => {
  const supabase = useSupabase();

  const useInsertWeeklyIncome = useMutation({
    mutationKey: [INCOMES_KEYS.INSERT_WEEKLY_INCOME],
    mutationFn: async () => {
      return await supabase.rpc("insert_weekly_income");
    },
    onSuccess(data, variables, context) {
      console.log(data);
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });

  const useInsertMonthlyIncome = useMutation({
    mutationKey: [INCOMES_KEYS.INSERT_MONTHLY_INCOME],
    mutationFn: async () => {
      return await supabase.rpc("insert_monthly_income");
    },
    onSuccess(data, variables, context) {
      console.log(data);
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });

  const useInsertIncome = useMutation({
    mutationKey: [INCOMES_KEYS.INSERT_INCOME],
    mutationFn: async () => {
    //   return await supabase.from("daily_income").insert([{ 

    //    }]);
    },
  });

  return {
    useInsertMonthlyIncome,
    useInsertWeeklyIncome,
  };
};
