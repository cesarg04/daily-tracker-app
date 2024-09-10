import React, { useEffect } from "react";
import { Text } from "react-native-paper";
import { Platform, StyleSheet } from "react-native";
import theme from "@/shared/theme/theme";
import { useFormControlContext } from "../form-control/FormControl";

interface IFormLabelProps {
  children: React.ReactNode;
}

const FormLabel = (props: IFormLabelProps) => {
  const {
    fieldState: { error },
  } = useFormControlContext();
  return (
    <Text
      style={{
        color: !!error ? theme.colors.error : theme.colors.primary,
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
    // color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    // color: theme.colors.primary
  },
});
