import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import { IPureData } from "@/shared/services/incomes/adapters/get-incomes.adapter";
import { Avatar, Tooltip } from "react-native-paper";

interface ITreansactionItemsProps {
  item: IPureData;
}

const TreansactionItems = (props: ITreansactionItemsProps) => {
  const truncateText = useCallback(
    (text: string, maxLength: number = 6): string => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },
    []
  );

  const initialLetter = useMemo(
    () => props.item.description.charAt(0).toUpperCase(),
    [props.item.description]
  );

  return (
    <View style={styles.container}>
      <Avatar.Text size={50} label={initialLetter} />
      <Tooltip title={props.item.description}>
        <Text style={styles.description}>{props.item.description}</Text>
      </Tooltip>
      <Text style={styles.amount}>{truncateText(props.item.amount)}</Text>
    </View>
  );
};

export default TreansactionItems;

const styles = StyleSheet.create({
  container: {
    height: 80,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    display: "flex",
    justifyContent: "space-between",
    // alignContent: 'center',
    alignItems: "center",
    flexDirection: "row",
  },
  description: {
    fontSize: 25,
    fontWeight: "600",
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
