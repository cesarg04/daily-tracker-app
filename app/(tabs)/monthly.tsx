import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { incomesServices } from "@/shared/services/incomes/incomes.services";
import Loading from "@/shared/components/loading/Loading";
import ErrorComponent from "@/shared/components/error/ErrorComponent";
import { getIncomesAdapter } from "@/shared/services/incomes/adapters/get-incomes.adapter";
import Totalncomes from "@/shared/components/incomes/Totalncomes";
import Transactions from "@/shared/components/incomes/Transactions";
import CustomSelect from "@/shared/components/incomes/CustomSelect";
import { O_MONTHS_YEARS_OBJ, TMonthValue } from "@/shared/constants/months/months.const";
import dayjs from "dayjs";

const Monthly = () => {
  const { useGetIncomesOfTheMonth } = incomesServices();
  const [monthSelected, setMonthSelected] = useState<TMonthValue>(
    dayjs().format("MM").toString() as TMonthValue
  );
  const { data, error, isLoading, isRefetching, refetch } =
    useGetIncomesOfTheMonth({
      end: O_MONTHS_YEARS_OBJ[monthSelected].endDate,
      start: O_MONTHS_YEARS_OBJ[monthSelected].startDate,
    });

  const onChangeParams = (date: TMonthValue) => {
    console.log('setted')
    setMonthSelected(date)
  };

  useEffect(() => {
    
    console.log('is refetching', isLoading)
    
  }, [isRefetching])
  

  const onRefresh = () => {
    refetch();
  };

  if (isLoading || !data) {
    <Loading />;
  }
  if (error && !data) {
    return <ErrorComponent />;
  }
  const adapted = getIncomesAdapter(data!);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoading || isRefetching}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.container}>
        <Totalncomes
          amount={adapted.totalIncomes}
          title="Ingresos totales del mes"
          date={adapted.totalDates}
        />
        <CustomSelect onChangeDates={setMonthSelected} />
        <Transactions data={adapted.pureData} />
      </View>
    </ScrollView>
  );
};

export default Monthly;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
});
