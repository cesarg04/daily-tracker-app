import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { TRegisterFormType } from "../util/register-schema.util";

export const registerAdapter = (
  data: TRegisterFormType
): SignUpWithPasswordCredentials => {
  return {
    email: data.email,
    password: data.password,
    options: {
      data: {
        username: data.username,
        full_name: data.name,
      },
    },
  };
};
