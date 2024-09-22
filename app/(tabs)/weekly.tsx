import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { incomesServices } from "@/shared/services/incomes/incomes.services";
import Loading from "@/shared/components/loading/Loading";
import { getIncomesAdapter } from "@/shared/services/incomes/adapters/get-incomes.adapter";
import Totalncomes from "@/shared/components/incomes/Totalncomes";
import Transactions from "@/shared/components/incomes/Transactions";
import ErrorComponent from "@/shared/components/error/ErrorComponent";

const Weekly = () => {
  const { useGetIncomesOfTheWeek } = incomesServices();
  const incomes = useGetIncomesOfTheWeek();
  
    useEffect(() => {
    
    }, [incomes])

  if (incomes.isLoading) {
    <Loading />;
  }

  if (incomes.error) {
    return (
      <ErrorComponent/>
    )
  }
  


  const adapted = getIncomesAdapter(incomes.data!);
  return (
    <View style={styles.container}>
      <Totalncomes
        amount={adapted.totalIncomes}
        title="Ingresos totales de la semana"
        date={adapted.totalDates}
      />
      <Transactions data={adapted.pureData} />
    </View>
  );
};

export default Weekly;

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
