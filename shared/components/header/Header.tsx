import { StatusBar, StyleSheet, View, Text } from "react-native";
import theme from "../../theme/theme";
import { IconButton } from "react-native-paper";
import { useRouter } from "expo-router";
import { fontFamilies } from "@/shared/constants/fonts/fonts.conts";

const Header = () => {

  const router = useRouter()
  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary}/>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <IconButton icon="calendar" size={30} iconColor="white" />
          <Text style={styles.title}>Daily Tracker</Text>
        </View>
        <View>
          <IconButton
            icon="cog"
            size={30}
            iconColor="#FFFFFF"
            onPress={() => router.navigate({ pathname: '/register'})}
          />
        </View>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: theme.colors.primary,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    // paddingTop: 30,
  },
  title: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontFamily: 'Inter_900Black'
  },
});
