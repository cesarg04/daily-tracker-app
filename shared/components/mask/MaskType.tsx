import { forwardRef } from "react";
import { RenderProps } from "react-native-paper/lib/typescript/components/TextInput/types";
import TextInputMask from "react-native-mask-input";

export type ITextFieldMaskType = {
  mask: "phoneNumber";
};

interface MaskTypeProps extends RenderProps, ITextFieldMaskType {}

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

    return null;
  }
);
