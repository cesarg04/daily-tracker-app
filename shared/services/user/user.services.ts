import useAuthStore from '@/shared/store/auth/auth.store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { USER_KEYS } from './keys/user.keys';
import { supabase } from '@/shared/lib/supabase';
import { TUpdateProfileFormType } from '@/private/modules/settings/util/update-profile.schema';
import { Buffer } from 'buffer';
import { decode } from 'base64-arraybuffer';

export const userServices = () => {
  const { user } = useAuthStore();

  const useGetUser = () => {
    return useQuery({
      queryKey: [USER_KEYS.GET_CURRENT_USER],
      queryFn: async () => {
        return await supabase
          .from('profiles')
          .select('*')
          .eq('id', user?.id!)
          .single();
      },
    });
  };

  const useUpdateUser = useMutation({
    mutationKey: [USER_KEYS.UPDATE_USER],
    mutationFn: async (values: any) => {
      const avatarUrl = await supabase.storage
        .from('avatars')
        .upload(values.filePath, values.uri, {
          contentType: values.contentType,
        });
      return avatarUrl;
    },
  });

  return {
    useGetUser,
    useUpdateUser,
  };
};
