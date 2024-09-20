import { SignInFormType } from "@/public/modules/sign-in/util/sign-in-schema.util";
import useSupabase from "@/shared/hooks/useSupabase";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { AUTH_KEYS } from "./keys/auth.keys";
import { supabase } from "@/shared/lib/supabase";

export const authServices = () => {
  const client = useSupabase();

  const useRegister = useMutation({
    mutationFn: (values: SignUpWithPasswordCredentials) => {
      return client.auth.signUp(values);
    },
    mutationKey: [AUTH_KEYS.REGISTER_MUTATION]
  });

  const useLogin = useMutation({
    mutationFn: (values: SignInFormType) => {
        return client.auth.signInWithPassword({
            ...values
        })
    },
    mutationKey: [AUTH_KEYS.LOGIN_MUTATION]
  })

  const useGetStatusSession = useMutation({
    mutationFn: () => {
        return client.auth.getSession()
    },
  })

  const useLogut = useMutation({
    mutationFn: async() => {
      return await client.auth.signOut()
    },
    mutationKey: [AUTH_KEYS.LOGOUT_MUTATION]
  })

  return {
    useRegister,
    useLogin,
    useGetStatusSession,
    useLogut
  };
};
