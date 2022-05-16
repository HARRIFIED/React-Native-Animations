import React, { useRef} from "react";
import { Dimensions, StyleSheet, Text, View, Animated, PanResponder } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function BottomSheet() {

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    }),
    
  ).current;

  
  return (
      <Animated.View 
        style={[styles.bottomSheetContainer, {
          transform: [{translateY: pan.y}],
        }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.line}/>
      </Animated.View>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT / 1.5,
    borderRadius: 25,
    zIndex: 100
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
});
