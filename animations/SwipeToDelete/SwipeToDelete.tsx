import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  Switch,
  Modal,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import TaskList from "./TaskList";

const TITLES = [
  "Record the dismissible tutorial 🎥",
  "Leave 👍🏼 to the video",
  "Check YouTube comments",
  "Subscribe to the channel 🚀",
  "Leave a ⭐️ on the GitHub Repo",
];

interface TaskInterface {
  title: string;
  index: number;
}

export const Colors = {
  dark: {
    background: "#1E1E1E",
    circle: "#252525",
    text: "#F8F8F8",
  },
  light: {
    background: "#F8F8F8",
    circle: "#FFF",
    text: "#1E1E1E",
  },
};

const SWITCH_TRACK_COLOR = {
  true: "rgba(256, 0, 256, 0.2)",
  false: "rgba(0,0,0,0.1)",
};

type Theme = "light" | "dark";

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));

const { height, width } = Dimensions.get(
  Platform.OS === "android" ? "screen" : "window"
);

export default function Swipe() {
  return (
    <>
      <GestureHandlerRootView>
        {Platform.OS === "ios" ? (
          <SafeAreaView style={styles.container1}>
            <App />
          </SafeAreaView>
        ) : (
          <View style={styles.container2}>
            <App />
          </View>
        )}
      </GestureHandlerRootView>
    </>
  );
}

function App() {
  const [tasks, setTasks] = useState(TASKS);
  // console.log(tasks)
  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks((tasks) => tasks.filter((item) => item.index !== task.index));
  }, []);

  const [theme, setTheme] = useState<Theme>("light");

  const scrollRef = useRef(null);

  const themeValue = useDerivedValue(() => {
    return theme === "dark" ? withTiming(1) : withTiming(0);
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      themeValue.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );
    return {
      backgroundColor,
    };
  });
  const textStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      themeValue.value,
      [0, 1],
      [Colors.dark.background, Colors.light.background]
    );
    return {
      color,
    };
  });

  return (
    <>
      <Animated.View style={[styles.header, rStyle]}>
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
        <Animated.Text style={[styles.title, textStyle]}>Tasks</Animated.Text>
        <Switch
          style={styles.switch}
          value={theme === "dark"}
          onValueChange={(toggled) => {
            setTheme(toggled ? "dark" : "light");
          }}
          thumbColor={"white"}
          trackColor={SWITCH_TRACK_COLOR}
        />
      </Animated.View>
      <Animated.ScrollView style={[{ flex: 1 }, rStyle]} ref={scrollRef}>
        {tasks.map((task) => (
          <TaskList
            key={task.index}
            task={task}
            onDismiss={onDismiss}
            themeValue={themeValue}
          />
        ))}
      </Animated.ScrollView>
    </>
  );
}

const BACKGROUND_COLOR = "#FAFBFF";

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  container2: {
    backgroundColor: BACKGROUND_COLOR,
    height,
    width,
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: "5%",
  },
  header: {},
  switch: {
    position: "absolute",
    right: "10%",
    top: "37%",
  },
});

export { TaskInterface };
