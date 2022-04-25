import React, { useEffect, useRef } from "react";
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";

export default function FadeIn (props: any) {
  const fadeAinm = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAinm, {
      toValue: 100,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAinm]);

  return (
    <View >
      <Animated.View
        style={{
          ...props,
          transform: [
              {translateX: fadeAinm},
              {rotate: fadeAinm.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0deg', '360deg']
              })}
            ],
          opacity: fadeAinm.interpolate({
              inputRange: [25, 50, 100],
              outputRange: [0, 1, 0],
              extrapolate: 'clamp'
          })
        }}
      >
        <TouchableOpacity
            style={{
              backgroundColor: "blue",
              width: 100,
              height: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>FADEIN</Text>
          </TouchableOpacity>

      </Animated.View>
    </View>
  );
};


