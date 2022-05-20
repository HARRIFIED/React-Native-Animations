import { View, StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FadeIn from './animations/FadeIn';
import Header from './animations/HeaderAnimation'
import Header2 from './animations/FlatListHeaderAnimation'
import BottomSheets from './animations/BottomSheet/BottomSheets';
import FadeIn2 from './animations/FadeIn_Reanimated';
import BoxGesture from './animations/Gesture&Reanimated'
import Scroll from './animations/ScrollView&Interpolation/ScrollView&Interpolation';
import Theme from './animations/Theme_Interpolation';
import Swipe from './animations/SwipeToDelete/SwipeToDelete';
import WhatsappHeader from './animations/Scrollview-whatsappHeader/WhatsappHeader'

//Add any components from the imports to see animations
export default function App() {
  return (
    <View>
      <WhatsappHeader />
    </View>
  );
}

 