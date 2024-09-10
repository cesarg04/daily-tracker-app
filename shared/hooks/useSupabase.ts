import { useMemo } from 'react';
import { supabase } from '../lib/supabase';

 
function useSupabase() {
  return useMemo( () => supabase, []);
}
 
export default useSupabase;