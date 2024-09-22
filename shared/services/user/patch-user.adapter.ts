import { TUpdateProfileFormType } from "@/private/modules/settings/util/update-profile.schema";
import { PostgrestSingleResponse, User } from "@supabase/supabase-js";

export const patchAdapterUser = (
  res: IPatchAdapter
): TUpdateProfileFormType => {
  return {
    avatar: res?.userData.data?.avatar_url ?? "",
    email: res.userStore.email ?? "",
    name: res.userData.data?.full_name ?? "",
    phoneNumber: res.userStore.phone ?? "",
    username: res.userData.data?.username ?? "",
  };
};

interface IPatchAdapter {
  userData:PostgrestSingleResponse<{
    avatar_url: string | null;
    full_name: string | null;
    id: string;
    updated_at: string | null;
    username: string | null;
    website: string | null;
}>
  userStore: User;
}
