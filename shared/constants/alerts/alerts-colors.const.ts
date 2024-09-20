import { Platform, StyleSheet } from "react-native";

const alertStyles = StyleSheet.create({
  successText: {
    color: "#E8F5E9",
    fontSize: 20,
  },
  warningText: {
    color: "#FF9900",
    fontSize: 20,
  },
  errorText: {
    color: "#FFEBEE",
    fontSize: 20,
  },
  infoText: {
    color: "#E3F2FD",
    fontSize: 20,
  },
  defaultText: {
    color: "#EDEDED",
    fontSize: 20,
  },
});

const stylesMap = {
  success: {
    text: alertStyles.successText,
    icon: "checkmark-circle",
    iconColor: "#4CAF50",
  },
  warning: {
    text: alertStyles.warningText,
    icon: "warning",
    iconColor: "#FF9900",
  },
  error: {
    text: alertStyles.errorText,
    icon: "warning",
    iconColor: "#D32F2F",
  },
  info: {
    text: alertStyles.infoText,
    icon: "information-circle",
    iconColor: "#2196F3",
  },
  default: {
    text: alertStyles.defaultText,
    icon: "notifications",
    iconColor: "#B8B8D0",
  },
};
export { alertStyles, stylesMap };
