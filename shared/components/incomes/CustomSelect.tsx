import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '../box/Box';
import { Button, IconButton } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  A_MONTHS_OF_YEARS,
  O_MONTHS_YEARS_OBJ,
  TMonthValue,
} from '@/shared/constants/months/months.const';
import BlackButton from '../buttons/BlackButton';
import dayjs from 'dayjs';

interface ICustomSelectProps {
  onChangeDates: (month: TMonthValue) => void;
}

const CustomSelect = (props: ICustomSelectProps) => {
  const [mode, setMode] = useState<'month' | 'year'>('month');
  const [monthSelected, setMonthSelected] = useState<TMonthValue>(
    dayjs().format('MM').toString() as TMonthValue
  );

  const getMonthComplete = useMemo(() => {
    return O_MONTHS_YEARS_OBJ[monthSelected].name;
  }, [monthSelected]);

  const onChangeMonth = (mode: 'increment' | 'decrement') => {
    const monthIndex = A_MONTHS_OF_YEARS.findIndex(
      (item) => item.value === monthSelected
    );
    if (
      (mode === 'decrement' && monthIndex === 0) ||
      (mode === 'increment' && monthIndex === 11)
    ) {
      return;
    }
    if (mode === 'increment') {
      setMonthSelected(A_MONTHS_OF_YEARS[monthIndex + 1].value);
      props.onChangeDates(A_MONTHS_OF_YEARS[monthIndex + 1].value);
    } else {
      setMonthSelected(A_MONTHS_OF_YEARS[monthIndex - 1].value);
      props.onChangeDates(A_MONTHS_OF_YEARS[monthIndex - 1].value);
    }
  };

  useEffect(() => {}, []);

  return (
    <Box>
      <Text style={styles.title}>Seleccionar periodo</Text>
      <View style={styles.buttonsContainer}>
        <IconButton
          size={40}
          style={styles.iconButton}
          icon={({ color, size }) => (
            <Ionicons size={30} color={color} name="chevron-back-outline" />
          )}
          onPress={() => onChangeMonth('decrement')}
        />
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
          }}
          contentStyle={{
            height: '100%',
          }}
        >
          {getMonthComplete}
        </Button>
        <IconButton
          size={40}
          style={styles.iconButton}
          icon={({ color, size }) => (
            <Ionicons size={30} name="chevron-forward-outline" color={color} />
          )}
          onPress={() => onChangeMonth('increment')}
        />
      </View>
      <View style={styles.monthsButtonContainer}>
        {A_MONTHS_OF_YEARS.map((item) => (
          <BlackButton
            style={{ width: '45%' }}
            key={item.value}
            isSelected={item.value === monthSelected}
            onPress={() => {
              setMonthSelected(item.value);
              props.onChangeDates(item.value);
            }}
          >
            {item.label}
          </BlackButton>
        ))}
      </View>
    </Box>
  );
};

export default CustomSelect;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  iconButton: {
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  button: {
    borderRadius: 10,
    height: 60,
    borderWidth: 3,
    borderColor: '#ccc',
    marginTop: 5,
    width: '60%',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  monthsButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 10,
    marginTop: 20,
  },
});
