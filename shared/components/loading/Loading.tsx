import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

interface ILoadingProps {
  loadingSize?: number;
}

const Loading = (props: ILoadingProps) => {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={props.loadingSize} />
    </View>
  );
};

export default Loading;
