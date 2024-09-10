import {
  View,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleProp,
  TextStyle,
  ViewStyle,
  Platform,
} from "react-native";
import React, { forwardRef, useState } from "react";
import { shadow, TextInput, TextInputProps } from "react-native-paper";
import { useFormControlContext } from "../form-control/FormControl";
import theme from "../../../theme/theme";
import TextInputMask from "react-native-mask-input";
import { RenderProps } from "react-native-paper/lib/typescript/components/TextInput/types";
import { ITextFieldMaskType, MaskType } from "../../mask/MaskType";



interface ITextFieldProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
  otulineStyles?: StyleProp<ViewStyle>;
  type?: "pass" | "normal";
  mask?: ITextFieldMaskType['mask']

}

const TextField = (props: ITextFieldProps) => {
  const {
    field,
    fieldState: { error },
  } = useFormControlContext();
  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    field.onChange(e.nativeEvent.text);
  };
  const [isShowPass, setIsShowPass] = useState(true);
  
  const config: TextInputProps = {
    ...props,
    ...field,
    mode: "outlined",
    error: !!error?.message,
    onChange: handleChange,
    ref: field.ref,
    onBlur: field.onBlur,
    textColor: "black",
    style: {
      backgroundColor: theme.colors.surface,
      height: 70,
      fontSize: 20,
    },
    outlineStyle: {
      borderRadius: 20,
      borderColor: '#ccc',
      borderWidth: 3
    },
    placeholderTextColor: "#ccc",
    right: props.right ? (
      props.right
    ) : props.type === "pass" ? (
      <TextInput.Icon
        icon="eye"
        color={!!error ? theme.colors.error : "black"}
        onPress={() => setIsShowPass(!isShowPass)}
      />
    ) : undefined,
    secureTextEntry: props.secureTextEntry
      ? props.secureTextEntry
      : props.type === "pass"
      ? isShowPass
      : false,
    render: !!props.mask ? (renderProps) => (
      <MaskType mask={props.mask!} { ...renderProps } />
    ) : undefined,
  };

  return <TextInput {...config} />;
};

export default TextField;
