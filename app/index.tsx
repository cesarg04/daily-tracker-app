import useSupabase from '@/shared/hooks/useSupabase';
import { authServices } from '@/shared/services/auth/auth.services';
import useAuthStore from '@/shared/store/auth/auth.store';
import theme from '@/shared/theme/theme';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Logo from '@/assets/images/logo/logo-app.svg';
import { incomesServices } from '@/shared/services/incomes/incomes.services';

export default function Index() {
  const { useGetStatusSession } = authServices();
  const router = useRouter();
  const { useInsertMonthlyIncome, useInsertWeeklyIncome } = incomesServices();

  const { login } = useAuthStore();

  useEffect(() => {
    const getStatus = async () => {
      const {
        data: { session },
        error,
      } = await useGetStatusSession.mutateAsync();
      if (session) {
        login(session?.user, session?.access_token);
        router.replace('/home');
        return;
        // useInsertMonthlyIncome.mutate()
        // useInsertWeeklyIncome.mutate()
      }
      router.replace('/sign-in');
    };

    getStatus();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Logo width={400} height={200} />
      <ActivityIndicator size={100} />
    </View>
  );
}
