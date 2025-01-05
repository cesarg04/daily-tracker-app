import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { IPureData } from './get-incomes.adapter';
import { formatCurrency } from '@/shared/helpers/parse-money.helper';
import formatDateDescription from '@/shared/helpers/parse-date.helper';

export const getIncomeById = (
  resp: PostgrestSingleResponse<{
    amount: number;
    created_at: string;
    date: string | null;
    description: string | null;
    id: string;
    source: string | null;
    user_id: string | null;
  }>
): IPureData => {
  const { data } = resp;

  return {
    amount: formatCurrency(data?.amount ?? 0),
    date: formatDateDescription(data?.date ?? ''),
    description: data?.description ?? '',
    id: data?.id ?? '',
    source: data?.source ?? '',
    user_id: data?.user_id ?? '',
  };
};
