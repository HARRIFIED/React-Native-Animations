import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Page from "./Page";

const WORDS = ["Hello Yo!!", "My", "Name", "is", "Harri"];

export default function Scroll() {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      style={styles.container}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      {WORDS.map((title, index) => {
        return (
          <Page
            key={index.toString()}
            title={title}
            index={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
