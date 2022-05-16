import React from "react";
import { View, StyleSheet, Dimensions, Platform, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

type PropType = {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
};
const { height, width } = Dimensions.get(
  Platform.OS === "android" ? "screen" : "window"
);
const SIZE = width * 0.7;

const Page: React.FC<PropType> = ({ title, index, translateX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(translateX.value, inputRange, [0, 1, 0]);
    return {
      transform: [{ scale }],
      borderRadius,
      opacity,
    };
  });
  const textStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-1, 1, -1],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        {
          translateY,
        },
      ],
      opacity,
    };
  });
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgba(0,0,256,0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.box, rStyle]} />
      <Animated.View style={[{ position: "absolute" }, textStyle]}>
        <Text
          style={[
            {
              fontSize: 40,
              color: "white",
              fontWeight: "400",
              textTransform: "uppercase",
            },
          ]}
        >
          {title}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0, 0, 256, 0.4)",
  },
});

export default Page;
