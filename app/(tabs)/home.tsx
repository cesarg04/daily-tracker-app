import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { incomesServices } from "@/shared/services/incomes/incomes.services";
import { getIncomesAdapter } from "@/shared/services/incomes/adapters/get-incomes.adapter";
import Totalncomes from "@/shared/components/incomes/Totalncomes";
import Transactions from "@/shared/components/incomes/Transactions";
import { ActivityIndicator } from "react-native-paper";

const Home = () => {
  const { useGetIncomes } = incomesServices();

  const { data, isLoading } = useGetIncomes({});

  useEffect(() => {
    console.log(data?.data?.map((item) => item.description).join(" - "));
  }, [data]);


  if (isLoading && !data) {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  const adapted = getIncomesAdapter(data!);

  return (
    <View style={styles.container}>
      <Totalncomes
        amount={adapted.totalIncomes}
        title="Ingresos totales"
        date={adapted.totalDates}
      />
      <Transactions data={adapted.pureData} />
    </View>
  );
};

export default Home;

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
