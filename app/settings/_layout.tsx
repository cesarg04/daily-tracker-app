import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { IconButton } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

const SettingsLayout = () => {
  return (
    <Stack
      screenOptions={({ route, navigation }) => ({
        headerLeft: () => (
          <IconButton
            style={{ position: 'absolute' }}
            onPress={() => navigation.goBack()}
            icon={() => <Ionicons name="chevron-back" size={40} />}
          />
        ),
        headerTitleStyle: {
          fontSize: 25,
        },
      })}
    >
      <Stack.Screen
        options={{
          title: 'Ajustes',
        }}
        name="index"
      />
      <Stack.Screen
        options={{
          title: 'Editar perfil',
        }}
        name="edit-profile"
      />
    </Stack>
  );
};

export default SettingsLayout;

const styles = StyleSheet.create({});
