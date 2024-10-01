import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { INCOMES_KEYS } from "./keys/incomes.keys";
import useSupabase from "@/shared/hooks/useSupabase";
import { TCreateIncomeFormType } from "@/private/modules/home/util/create-income-schema.util";
import useAuthStore from "@/shared/store/auth/auth.store";
import dayjs from "dayjs";

const today = dayjs().format("YYYY-MM-DD");

const todayBits = dayjs();

const startOfWeek = todayBits.startOf("week");
const endOfWeek = todayBits.endOf("week");

const startOfMonth = todayBits.startOf("month");
const endOfMonth = todayBits.endOf("month");

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
      queryClient.invalidateQueries({
        queryKey: [INCOMES_KEYS.INCOMES_MONTLY],
      });
      queryClient.invalidateQueries({
        queryKey: [INCOMES_KEYS.INCOMES_WEEKLY],
      });
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
          .order("created_at", { ascending: false });
      },
      staleTime: 5000,
      enabled: user?.id !== undefined,
    });
  };

  const useGetIncomeById = (id?: string) => {
    return useQuery({
      queryKey: [INCOMES_KEYS.GET_INCOME_BY_ID, id],
      queryFn: async () => {
        return await supabase
          .from("daily_income")
          .select("*")
          .eq("user_id", user?.id!)
          .eq("id", id!)
          .single();
      },
      enabled: user?.id !== undefined && id !== undefined,
    });
  };

  const useDeleteById = useMutation({
    mutationKey: [INCOMES_KEYS.DELETE_INCOME],
    mutationFn: async (id: string) => {
      return await supabase
        .from("daily_income")
        .delete() // Método delete
        .eq("id", id) // Filtra por el id
        .eq("user_id", user?.id!);
    },
    onSuccess: () => {
      Object.values(INCOMES_KEYS)
        .filter(
          (item) =>
            item === INCOMES_KEYS.INCOMES_MONTLY ||
            item === INCOMES_KEYS.INCOMES_MONTLY ||
            item === INCOMES_KEYS.INCOMES_WEEKLY
        )
        .forEach((item) => {
          queryClient.invalidateQueries({
            queryKey: [item],
          });
        });
    },
  });

  const useUpdateIncomes = useMutation({
    mutationKey: [INCOMES_KEYS.UPDATE_INCOME],
    mutationFn: async (data: {
      id: string;
      formData: TCreateIncomeFormType;
    }) => {
      return await supabase
        .from("daily_income")
        .update({
          ...data.formData,
          amount: data.formData.amount
            ? Number(data.formData.amount)
            : undefined,
        })
        .eq("id", data.id)
        .eq("user_id", user?.id!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INCOMES_KEYS.GET_INCOMES] });
      queryClient.invalidateQueries({
        queryKey: [INCOMES_KEYS.INCOMES_MONTLY],
      });
      queryClient.invalidateQueries({
        queryKey: [INCOMES_KEYS.INCOMES_WEEKLY],
      });
      queryClient.invalidateQueries({
        queryKey: [INCOMES_KEYS.GET_INCOME_BY_ID],
      });
    },
  });

  const useGetIncomesOfTheWeek = () => {
    return useQuery({
      queryKey: [INCOMES_KEYS.INCOMES_WEEKLY],
      queryFn: async () => {
        return await supabase
          .from("daily_income")
          .select("*")
          .eq("user_id", user?.id!)
          .gte("date", startOfWeek.format("YYYY-MM-DD"))
          .lte("date", endOfWeek.format("YYYY-MM-DD"))
          .order("created_at", { ascending: false });
      },
      enabled: user?.id !== undefined,
    });
  };

  const useGetIncomesOfTheMonth = (options?: {
    start?: string;
    end?: string;
  }) => {
    return useQuery({
      queryKey: [INCOMES_KEYS.INCOMES_MONTLY, options?.start, options?.end],
      queryFn: async () => {
        return await supabase
          .from("daily_income")
          .select("*")
          .eq("user_id", user?.id!)
          .gte("date", options?.start ?? startOfMonth.format("YYYY-MM-DD"))
          .lte("date", options?.end ?? endOfMonth.format("YYYY-MM-DD"))
          .order("created_at", { ascending: false });
      },
      enabled: user?.id !== undefined,
    });
  };

  const useGetMonthsActivity = () => {
    return useQuery({
      queryKey: [INCOMES_KEYS.MONTH_ACTIVITY],
      queryFn: async () => {
        return await supabase.rpc("get_active_months");
      },
    });
  };

  const useGetWeekActivity = () => {
    return useQuery({
      queryKey: [INCOMES_KEYS.WEEK_ACTIVITY],
      queryFn: async () => {
        return await supabase.rpc("get_active_weeks_of_months");
      },
    });
  };

  return {
    useInsertMonthlyIncome,
    useInsertWeeklyIncome,
    useInsertIncome,
    useGetIncomes,
    useGetIncomeById,
    useDeleteById,
    useUpdateIncomes,
    useGetIncomesOfTheWeek,
    useGetIncomesOfTheMonth,
    useGetMonthsActivity,
    useGetWeekActivity,
  };
};
