import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button as ButtonPaper, ButtonProps } from "react-native-paper";
import theme from "@/shared/theme/theme";

interface IButtonProps extends ButtonProps {}

const PrimaryButton = (props: IButtonProps) => {
  const config: IButtonProps = {
    ...props,
    mode: "contained",
    style: styles.button,
    labelStyle: {
      fontWeight: "600",
      fontSize: 22,
      alignItems: "center",
    },
  };

  return <ButtonPaper {...config} />;
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.accent,
    height: 70,
    fontSize: 10,
    display: "flex",
    justifyContent: "center",
    borderRadius: 20,
  },
});
