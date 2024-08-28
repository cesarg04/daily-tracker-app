import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button as ButtonPaper, ButtonProps } from "react-native-paper";
import theme from "@/shared/theme/theme";

interface IButtonPropsConfig extends Omit<ButtonProps, "children"> {}

interface IButtonProps extends ButtonProps {}

const PrimaryButton = (props: IButtonProps) => {

  const config: ButtonProps = {
    
  }

  return <ButtonPaper  mode="contained" style={styles.button} {...props} />;
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.accent

  },
});
