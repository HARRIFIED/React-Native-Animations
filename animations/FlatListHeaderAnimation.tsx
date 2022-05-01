import React from "react";
import { FlatList, View, Text, Platform, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Header() {
  const HEADER_HEIGHT = Platform.OS === "ios" ? 100 : 80;
  const [data, setData] = React.useState();
  const getPosts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    }
  };


  React.useEffect(() => {
    getPosts();
  }, [getPosts]);

  const scrollY = React.useRef(new Animated.Value(0)).current
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT)
  const HeaderY = diffClampScrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: "clamp"
  })

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
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 30,
          transform: [{ translateY: HeaderY}]
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
                            y: scrollY
                        }
                    }
                },
            ],
            {useNativeDriver: true}
        )}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
            <View style={{
                paddingTop: HEADER_HEIGHT
            }}>
                <Text>{item.title}</Text>
            </View>
        )}
      />
    </View>
  );
}
