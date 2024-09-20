import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { IPureData } from "@/shared/services/incomes/adapters/get-incomes.adapter";
import TreansactionItems from "./TreansactionItems";
import { useSearch } from "@/shared/hooks/useSearch";
import { IconButton } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchField from "../field/SearchField";

interface ITransactionsProps {
  data: IPureData[];
}

const Transactions = (props: ITransactionsProps) => {
  const [search, setSearch] = useState("");
  const [isSearchMode, setisSearchMode] = useState(false);
  const data = useSearch(props.data, ["amount", "description", "id"], search);
  const dimentions = useWindowDimensions();


  return (
    <View style={[styles.conteiner, { height: dimentions.height - 480 }]}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Transacciones</Text>
        <IconButton
          icon={() => (
            <Ionicons
              size={40}
              name="search"
              onPress={() => setisSearchMode(!isSearchMode)}
            />
          )}
        />
      </View>
      {isSearchMode && <SearchField value={search} onChangeText={setSearch} />}

      <FlatList
        data={data}
        renderItem={({ item }) => <TreansactionItems item={item} />}
        keyExtractor={({ id }) => id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // ListEmptyComponent={() =>  }
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
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
