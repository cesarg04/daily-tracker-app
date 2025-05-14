import React, { useEffect } from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import theme from '@/shared/theme/theme';
import { useFormControlContext } from '../form-control/FormControl';

interface IFormLabelProps {
  children: React.ReactNode;
  color?: string;
}

const FormLabel = (props: IFormLabelProps) => {
  const {
    fieldState: { error },
  } = useFormControlContext();
  return (
    <Text
      style={{
        color: !!error
          ? theme.colors.error
          : props.color
            ? props.color
            : theme.colors.primary,
        ...styles.text,
      }}
    >
      {props.children}
    </Text>
  );
};

export default FormLabel;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
