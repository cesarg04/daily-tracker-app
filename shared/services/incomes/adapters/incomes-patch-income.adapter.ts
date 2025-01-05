import { TCreateIncomeFormType } from '@/private/modules/home/util/create-income-schema.util';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const incomesPatchAdapter = (
  resp: PostgrestSingleResponse<{
    amount: number;
    created_at: string;
    date: string | null;
    description: string | null;
    id: string;
    source: string | null;
    user_id: string | null;
  }>
): TCreateIncomeFormType => {
  return {
    amount: resp.data?.amount.toString() ?? '',
    description: resp.data?.description ?? '',
  };
};
