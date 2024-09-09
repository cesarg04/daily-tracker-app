import { useNavigation, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {

  const router = useRouter()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen. rapa t</Text>
      <Button mode="contained" onPress={() => router.navigate('/sign-in')} >
        Hello word
      </Button>
    </View>
  );
}
