import { View, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import theme from '@/shared/theme/theme';
import { useForm } from 'react-hook-form';
import {
  createIncomeFormDefaultValues,
  TCreateIncomeFormType,
} from '../../util/create-income-schema.util';
import { incomesServices } from '@/shared/services/incomes/incomes.services';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { BorderStyles } from '@/shared/components/sheet/Sheets';
import IncomesFormLayout from './IncomesFormLayout';

const CreateIncomeSheet = (props: SheetProps<'create-income-sheet'>) => {
  const actionRef = useRef<ActionSheetRef>(null);
  const { useInsertIncome } = incomesServices();
  const { snackBar } = useSnackbar();

  const onSubmit = async (values: TCreateIncomeFormType) => {
    const { error, status } = await useInsertIncome.mutateAsync(values);
    if (status === 201) {
      snackBar({
        message: 'El gasto ha sido creado satsifactoriamente.',
        type: 'success',
      });
      actionRef.current?.hide();
    }
    if (error) {
      snackBar({
        message: 'Ha ocurido un error al crear el gasto, intente nuevamente.',
        type: 'error',
      });
    }
  };

  useEffect(() => {}, []);

  return (
    <ActionSheet ref={actionRef} containerStyle={BorderStyles.borders}>
      <IncomesFormLayout
        actionRef={actionRef}
        initialValues={createIncomeFormDefaultValues}
        onSubmit={onSubmit}
      />
    </ActionSheet>
  );
};

export default CreateIncomeSheet;
