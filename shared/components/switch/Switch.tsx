import React from "react";
import { Switch, SwitchProps } from "react-native-paper";

interface ICustomSwitchProps extends SwitchProps {}

const CustomSwitch = (props: ICustomSwitchProps) => {
  return <Switch {...props} />;
};

export default CustomSwitch;
