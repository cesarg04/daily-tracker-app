import { forwardRef, useEffect, useState } from "react";
import { RenderProps } from "react-native-paper/lib/typescript/components/TextInput/types";
import TextInputMask from "react-native-mask-input";
import CurrencyInput, { CurrencyInputProps } from "react-native-currency-input";

export type ITextFieldMaskType = {
  mask: "phoneNumber" | "money";
};

interface MaskTypeProps extends RenderProps, ITextFieldMaskType {}

interface IMoneyConfigProps extends MaskTypeProps {}

export const MaskType = forwardRef<any, MaskTypeProps>(
  (props: MaskTypeProps, ref) => {
    if (props.mask === "phoneNumber") {
      return (
        <TextInputMask
          {...props}
          mask={[
            "(",
            /\d/,
            /\d/,
            /\d/,
            ")",
            "-",
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
          ref={ref}
          onChangeText={(masked, unmasked) => {
            props?.onChangeText?.(unmasked);
          }}
        />
      );
    }

    if (props.mask === "money") {
      return <MaskedMoney {...props} />;
    }

    return null;
  }
);

const MaskedMoney = (props: IMoneyConfigProps) => {
  const [values, setValues] = useState<number | null>(null);

  useEffect(() => {
    props.onChangeText?.('2323232')
  }, [])
  

  const moneyMaskConfig: CurrencyInputProps = {
    ...props,
    prefix: "$ ",
    delimiter: ",",
    separator: ",",
    precision: 0,
    minValue: 0,
    signPosition: "afterPrefix",
    onChangeValue(value) {
      props.onChangeText?.(value?.toString() ?? '')
      setValues(value);
    },
    value: values,
    onChangeText(text) {
      
    },
  };

  return <CurrencyInput {...moneyMaskConfig} />;
};
