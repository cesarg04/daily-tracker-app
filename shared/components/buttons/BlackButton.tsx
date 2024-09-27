import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, ButtonProps } from "react-native-paper";

interface IBackButtonProps extends ButtonProps {
  width?: string | number;
  isSelected?: boolean;
}
interface IConfigProps extends Omit<ButtonProps, "children"> {}

const BlackButton = (props: IBackButtonProps) => {
  const { isSelected } = props;

  const config: IConfigProps = {
    ...props,
    mode: isSelected ? "contained" : "outlined",
    textColor: isSelected ? "white" : "black",
    buttonColor: isSelected ? "black" : "white",
    style: [
      props.style,
      {
        borderRadius: 10,
        height: 60,
      },
    ],
    labelStyle: {
      fontSize: 20,
      height: "100%",
      fontWeight: "bold",
      paddingTop: 20,
    },
    contentStyle: {},
  };

  return <Button {...config} children={props.children} />;
};

export default BlackButton;

const styles = StyleSheet.create({});
