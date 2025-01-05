import { formatCurrency } from '@/shared/helpers/parse-money.helper';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

export const getIncomesAdapter = (
  resp: PostgrestSingleResponse<
    {
      amount: number;
      created_at: string;
      date: string | null;
      description: string | null;
      id: string;
      source: string | null;
      user_id: string | null;
    }[]
  >
): IGetIncomesData => {
  const totalAmount = resp?.data?.reduce(
    (total, current) => total + current.amount,
    0
  );
  return {
    totalIncomes: formatCurrency(totalAmount ?? 0),
    totalDates: dayjs().format('D MMMM YYYY'),
    pureData:
      resp?.data?.map((item) => ({
        amount: formatCurrency(item.amount),
        date: item.date ?? '',
        description: item.description ?? '',
        id: item.id ?? '',
        source: item.source ?? '',
        user_id: item.user_id ?? '',
      })) ?? [],
  };
};

export interface IGetIncomesData {
  totalIncomes: string;
  totalDates: string;
  pureData: IPureData[];
}

export interface IPureData {
  amount: string;
  description: string;
  id: string;
  user_id: string;
  date: string;
  source: string | null;
}
