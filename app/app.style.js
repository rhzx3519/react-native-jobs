import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: (insets) => ({
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  }),
});

export default styles;