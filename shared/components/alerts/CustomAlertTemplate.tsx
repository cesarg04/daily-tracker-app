import { View, StyleSheet } from "react-native";
import React, { useEffect, useMemo } from "react";
import { Dialog, Text } from "react-native-paper";
import { stylesMap } from "@/shared/constants/alerts/alerts-colors.const";

interface ICustomAlertTemplateProps {
  type: "success" | "error" | "warning" | "info" | "default";
  message: string;
  declineBtnMessage?: string;
  confirmBtnMessage?: string;
  onClose?: () => void;
  onConfirm?: () => void;
}

const CustomAlertTemplate = (props: ICustomAlertTemplateProps) => {
  const stylesType = stylesMap[props.type];

  const showButtonDecline = useMemo(() => {
    return (
      props.type === "default" ||
      props.type === "info" ||
      props.type === "warning"
    );
  }, [props.type]);

  useEffect(() => {}, []);

  return (
    <>
      <Dialog.Icon
        icon={stylesType.icon}
        color={stylesType.iconColor}
        size={50}
      />
      {/* <Dialog.Title style={styles.title}>{ props. }</Dialog.Title> */}
      <Dialog.Content>
        <Text
          variant="titleLarge"
          style={{
            color: stylesType.iconColor,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          This is simple dialog
        </Text>
      </Dialog.Content>
    </>
  );
};

export default CustomAlertTemplate;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
