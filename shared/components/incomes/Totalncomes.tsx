import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import theme from '@/shared/theme/theme';

interface ITotalncomesProps {
  amount: string;
  title: string;
  date: string;
}

const Totalncomes = (props: ITotalncomesProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.amount}>{props.amount}</Text>
      <Text style={styles.subtitle}>{props.date}</Text>
    </View>
  );
};

export default Totalncomes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    display: 'flex',
    padding: 20,
    flexDirection: 'column',
    gap: 20,
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
});
