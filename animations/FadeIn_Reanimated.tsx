import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const SIZE = 100.0;
export default function FadeIn2() {

  const ANIMATED_VALUE = useSharedValue(0);
  const scale = useSharedValue(0);
  const border = useSharedValue(50);
  const rotation = useSharedValue('0deg');

  useEffect(() => {
    ANIMATED_VALUE.value = withRepeat(withSpring(1), -1, true);
    scale.value = withRepeat(withSpring(2), -1, true)
    border.value = withRepeat(withSpring(10), -1, true)
    rotation.value = withRepeat(withSpring('360deg'), -1, true)
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: ANIMATED_VALUE.value,
      borderRadius: border.value,
      transform: [
        { scale: scale.value },
        {rotate: rotation.value}
      ],
    };
  }, []);
  return (
    <View style={[styles.container]}>
      <Animated.View style={[styles.box, reanimatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "blue",
    position: "absolute",
    top: 300,
  },
});
