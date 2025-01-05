import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import theme from '@/shared/theme/theme';

const ErrorComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Ups! Ah ocurrido un error, intente mas tarde.
      </Text>
      <Image
        source={require('@/assets/images/error/error.png')} // Ruta relativa al archivo
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default ErrorComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 250,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.primary,
  },
});
