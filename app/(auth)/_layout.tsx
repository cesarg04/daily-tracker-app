import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import theme from '@/shared/theme/theme';

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white',
        },
        header: () => <></>,
      }}
    >
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="register" />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
