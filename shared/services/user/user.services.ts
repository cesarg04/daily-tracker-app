import useAuthStore from "@/shared/store/auth/auth.store"
import { useQuery } from "@tanstack/react-query"
import { USER_KEYS } from "./keys/user.keys"
import { supabase } from "@/shared/lib/supabase"

export const userServices = () => {
    const { user } = useAuthStore()

    const useGetUser = () => {
        return useQuery({
            queryKey: [USER_KEYS.GET_CURRENT_USER],
            queryFn: async() => {
                return await supabase
                .from("profiles")
                .select("*")
                .eq("id", user?.id!)
                .single()
            }
        })
    }




    return {
        useGetUser
    }


}

