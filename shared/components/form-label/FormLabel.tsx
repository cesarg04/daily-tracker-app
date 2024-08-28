import React, { useEffect } from "react";
import { Text } from "react-native-paper";
import { Platform, StyleSheet } from "react-native";


interface IFormLabelProps {
  children: React.ReactNode;
}

const FormLabel = (props: IFormLabelProps) => {
  return (
    <Text
      style={{
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
  },
});