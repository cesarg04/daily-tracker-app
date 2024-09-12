import { View, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Dialog, Text } from "react-native-paper";
import { stylesMap } from "@/shared/constants/alerts/alerts-colors.const";
import theme from "@/shared/theme/theme";
export interface ICustomAlertTemplateProps {
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

      <Dialog.Actions>
        {!showButtonDecline && (
          <Button
            textColor={
              !showButtonDecline ? stylesType.iconColor : theme.colors.primary
            }
            onPress={() => props?.onClose?.()}
          >
            {props.declineBtnMessage ? props.declineBtnMessage : "Cancel"}
          </Button>
        )}
        <Button
          textColor={
            stylesType.iconColor
          }
          onPress={() => props.onConfirm?.()}
        >
          {props.confirmBtnMessage ? props.confirmBtnMessage : "Ok"}
        </Button>
      </Dialog.Actions>
    </>
  );
};

export default CustomAlertTemplate;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
