import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Flatlist,
  Animated,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
// import Animated from 'react-native-reanimated'

const windowWidth = Dimensions.get("window").width;

export default function Header2() {
  const [data, setData] = useState([]);

  const HEADER_HEIGHT = Platform.OS === "ios" ? 100 : 80;
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  const HeaderY = diffClampScrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  const posts = [
    { id: 1, uri: require("../assets/images/burger.png") },
    { id: 2, uri: require("../assets/images/man.png") },
    { id: 3, uri: require("../assets/images/empty_cart.jpeg") },
    { id: 4, uri: require("../assets/images/softdrinks.png") },
    { id: 5, uri: require("../assets/images/burger.png") },
    { id: 6, uri: require("../assets/images/softdrinks.png") },
    { id: 7, uri: require("../assets/images/burger.png") },
    { id: 8, uri: require("../assets/images/softdrinks.png") },
    { id: 9, uri: require("../assets/images/burger.png") },
    { id: 10, uri: require("../assets/images/softdrinks.png") },
    { id: 11, uri: require("../assets/images/burger.png") },
  ];

  return (
    <View>
      <StatusBar style="light" backgroundColor="tomato" />
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT,
          backgroundColor: "tomato",
          zIndex: 1000,
          elevation: 1000,
          transform: [{ translateY: HeaderY }],
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 30,
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>YUHUB</Text>
      </Animated.View>
      <Animated.FlatList
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
                contentInset: {
                    
                }
              },
            },
          ],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        bounces={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
            //   paddingTop: HEADER_HEIGHT,
              height: 400,
              margin: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={item.uri}
              style={{ flex: 1, width: 400, height: 600, borderRadius: 10 }}
            />
            <View
              style={{
                height: 6,
                width: windowWidth / 0.8,
                backgroundColor: "grey",
                marginTop: 15,
              }}
            ></View>
          </View>
        )}
      />
    </View>
  );
}
