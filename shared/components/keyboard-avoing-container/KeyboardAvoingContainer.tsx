import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface IKeyboardAvoidingContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const KeyboardAvoidingContainer = ({
  children,
  style,
}: IKeyboardAvoidingContainerProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[style, styles.contentContainer]}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default KeyboardAvoidingContainer;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 50 : 50,
  },
});
