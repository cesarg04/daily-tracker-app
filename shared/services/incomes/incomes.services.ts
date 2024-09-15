import { useMutation } from "@tanstack/react-query";
import { INCOMES_KEYS } from "./keys/incomes.keys";
import useSupabase from "@/shared/hooks/useSupabase";
import { TCreateIncomeFormType } from "@/private/modules/home/util/create-income-schema.util";
import useAuthStore from "@/shared/store/auth/auth.store";

export const incomesServices = () => {
  const supabase = useSupabase();
  const { user } = useAuthStore()

  const useInsertWeeklyIncome = useMutation({
    mutationKey: [INCOMES_KEYS.INSERT_WEEKLY_INCOME],
    mutationFn: async () => {
      return await supabase.rpc("insert_weekly_income");
    },
    onSuccess(data, variables, context) {},
    onError(error, variables, context) {
    },
  });

  const useInsertMonthlyIncome = useMutation({
    mutationKey: [INCOMES_KEYS.INSERT_MONTHLY_INCOME],
    mutationFn: async () => {
      return await supabase.rpc("insert_monthly_income");
    },
    onSuccess(data, variables, context) {},
    onError(error, variables, context) {},
  });

  const useInsertIncome = useMutation({
    mutationKey: [INCOMES_KEYS.INSERT_INCOME],
    mutationFn: async (values: TCreateIncomeFormType) => {
      console.log(values)
        return await supabase.from("daily_income").insert([{
          amount: Number(values.amount),
          description: values.description,
          date:  new Date().toISOString(),
          user_id: user?.id
         }]);
    },
  });

  return {
    useInsertMonthlyIncome,
    useInsertWeeklyIncome,
    useInsertIncome
  };
};
