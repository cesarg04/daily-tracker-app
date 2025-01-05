import { StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import { BorderStyles } from '../sheet/Sheets';
import { incomesServices } from '@/shared/services/incomes/incomes.services';
import { getIncomeById } from '@/shared/services/incomes/adapters/get-income-by-id.adapter';
import theme from '@/shared/theme/theme';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import XIcon from '@/assets/icons/circle-x.svg';

const DetailIncome = (props: SheetProps<'detail-income-sheet'>) => {
  const actionRef = useRef<ActionSheetRef>(null);

  const { useGetIncomeById } = incomesServices();

  const { data, error, isLoading } = useGetIncomeById(props.payload?.id);
  const adapted = data ? getIncomeById(data) : null;

  return (
    <ActionSheet
      ref={actionRef}
      containerStyle={{
        ...BorderStyles.borders,
        ...styles.sheet,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{adapted?.description}</Text>
        <IconButton
          icon={() => (
            <XIcon width={30} height={30} color={theme.colors.text} />
          )}
          onPress={() => actionRef.current?.hide()}
        />
      </View>

      {isLoading && !data && <ActivityIndicator size={30} />}
      {adapted && (
        <View style={styles.container}>
          <Text style={styles.amount}>{adapted.amount}</Text>
          <Text style={styles.date}>{adapted.date}</Text>
        </View>
      )}
    </ActionSheet>
  );
};

export default DetailIncome;

const styles = StyleSheet.create({
  sheet: {
    height: 300,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    gap: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 20,
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
