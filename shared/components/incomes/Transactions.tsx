import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { IPureData } from "@/shared/services/incomes/adapters/get-incomes.adapter";
import TreansactionItems from "./TreansactionItems";

interface ITransactionsProps {
  data: IPureData[];
}

const Transactions = (props: ITransactionsProps) => {
  const dimentions = useWindowDimensions();
  return (
    <View style={[styles.conteiner, { height: dimentions.height - 480 }]}>
      <Text style={styles.title}>Transacciones</Text>
      <FlatList
        data={props.data}
        renderItem={({ item }) => <TreansactionItems item={item} />}
        keyExtractor={({ id }) => id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  conteiner: {
    // minHeight: 300,
    borderRadius: 20,
    borderColor: "#ccc",
    padding: 20,
    borderWidth: 2,
    paddingTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
