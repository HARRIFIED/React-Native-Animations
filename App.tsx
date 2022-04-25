import { View, StyleSheet } from 'react-native'
import FadeIn from './animations/FadeIn';

export default function App() {
  return (
    <View style={styles.container}>
      <FadeIn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});
 