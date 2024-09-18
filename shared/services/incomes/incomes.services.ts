import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { INCOMES_KEYS } from "./keys/incomes.keys";
import useSupabase from "@/shared/hooks/useSupabase";
import { TCreateIncomeFormType } from "@/private/modules/home/util/create-income-schema.util";
import useAuthStore from "@/shared/store/auth/auth.store";
import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DD');
export const incomesServices = () => {
  const supabase = useSupabase();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const useInsertWeeklyIncome = useMutation({
    mutationKey: [INCOMES_KEYS.INSERT_WEEKLY_INCOME],
    mutationFn: async () => {
      return await supabase.rpc("insert_weekly_income");
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
      return await supabase.from("daily_income").insert([
        {
          amount: Number(values.amount),
          description: values.description,
          date: today,
          user_id: user?.id,
        },
      ]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCOMES_KEYS.GET_INCOMES] });
    },
  });

  const useGetIncomes = (options: { page?: number; pageLimit?: number }) => {
    const { page = 1, pageLimit = 10 } = options;

    const from = (page - 1) * pageLimit;
    const to = from + pageLimit - 1;

    return useQuery({
      queryKey: [INCOMES_KEYS.GET_INCOMES, page, pageLimit],
      queryFn: async () => {
        return await supabase
          .from("daily_income")
          .select("*")
          .eq("user_id", user?.id!)
          .eq("date", today)
          // .order("", { ascending: true })
      },
      staleTime: 5000,
      enabled: user?.id !== undefined,
    });
  };

  return {
    useInsertMonthlyIncome,
    useInsertWeeklyIncome,
    useInsertIncome,
    useGetIncomes,
  };
};
