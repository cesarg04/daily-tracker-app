import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useEffect, useRef } from "react";
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from "react-native-actions-sheet";
import { IconButton } from "react-native-paper";
import XIcon from "@/assets/icons/circle-x.svg";
import theme from "@/shared/theme/theme";
import { fontFamilies } from "@/shared/constants/fonts/fonts.conts";
import KeyboardAvoidingContainer from "@/shared/components/keyboard-avoing-container/KeyboardAvoingContainer";
import { FormProvider, useForm } from "react-hook-form";
import { createIncomeFormDefaultValues, createIncomeSchema, TCreateIncomeFormType } from "../../util/create-income-schema.util";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@/shared/components/form/form-control/FormControl";
import TextField from "@/shared/components/form/form-text-fields/TextField";

const CreateIncomeSheet = (props: SheetProps<"create-income-sheet">) => {
  const actionRef = useRef<ActionSheetRef>(null);

  useEffect(() => {
    console.log(props.payload);
    if (actionRef.current?.ev.unsubscribe) {
    }
  }, []);

  const handleClose = (key: string = "cancel") => {
    props.payload;
  };

  const formConfig = useForm<TCreateIncomeFormType>({
    defaultValues: createIncomeFormDefaultValues,
    resolver: yupResolver(createIncomeSchema),
  });


  return (
    <ActionSheet ref={actionRef}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Crear gasto</Text>
          <IconButton
            icon={() => <XIcon width={30} height={30} color={theme.colors.primary} />}
          />
        </View>
        <KeyboardAvoidingContainer>
          <FormProvider { ...formConfig } >
            <FormControl name="amount" >
              <TextField/>
            </FormControl>
          </FormProvider>
        </KeyboardAvoidingContainer>
        {/* <Text>SheetIos</Text> */}
      </View>
    </ActionSheet>
  );
};

export default CreateIncomeSheet;

const styles = StyleSheet.create({
  container: {
    height: 300,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 25,
    fontFamily: fontFamilies.Medium,
    // fontWeight: 'bold'
  },
});
