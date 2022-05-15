import { View, StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FadeIn from './animations/FadeIn';
import Header from './animations/HeaderAnimation'
import Header2 from './animations/FlatListHeaderAnimation'
import BottomSheets from './animations/BottomSheet/BottomSheets';
import FadeIn2 from './animations/FadeIn_Reanimated';
import BoxGesture from './animations/Gesture&Reanimated'


export default function App() {
  return (
    <View>
      <BoxGesture />
    </View>
  );
}

 