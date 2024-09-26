import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { incomesServices } from "@/shared/services/incomes/incomes.services";
import Loading from "@/shared/components/loading/Loading";
import ErrorComponent from "@/shared/components/error/ErrorComponent";
import { getIncomesAdapter } from "@/shared/services/incomes/adapters/get-incomes.adapter";
import Totalncomes from "@/shared/components/incomes/Totalncomes";
import Transactions from "@/shared/components/incomes/Transactions";
import CustomSelect from "@/shared/components/incomes/CustomSelect";

const Monthly = () => {
  const { useGetIncomesOfTheMonth } = incomesServices();

  const { data, error, isLoading, isRefetching } = useGetIncomesOfTheMonth();

  if (isLoading || !data) {
    <Loading />;
  }

  if (error && !data) {
    return <ErrorComponent />;
  }

  useEffect(() => {
    
  }, [data, isRefetching])
  


  const adapted = getIncomesAdapter(data!);

  return (
    <ScrollView>

    <View style={styles.container}>
      <CustomSelect/>
      <Totalncomes
        amount={adapted.totalIncomes}
        title="Ingresos totales del mes"
        date={adapted.totalDates}
      />
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
