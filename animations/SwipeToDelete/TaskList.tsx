import React from "react";
import { View, StyleSheet, Text, Dimensions, Platform } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler";
import { TaskInterface } from "./SwipeToDelete";
import Animated, {
  DerivedValue,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "./SwipeToDelete";

interface TaskProps
  extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  task: TaskInterface;
  onDismiss?: (task: TaskInterface) => void;
  themeValue: DerivedValue<number>;
}
const { width } = Dimensions.get(
  Platform.OS === "android" ? "screen" : "window"
);
const taskHeight = 70;
const translateX_Theshold = -width * 0.3;

const TaskList: React.FC<TaskProps> = ({
  task,
  onDismiss,
  simultaneousHandlers,
  themeValue,
}) => {
  const translateX = useSharedValue(0);
  const layout = useSharedValue(taskHeight);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);
  const gestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>(
    {
      onActive: (event) => {
        translateX.value = event.translationX;
      },
      onEnd: () => {
        const shouldDismiss = translateX.value < translateX_Theshold;
        if (shouldDismiss) {
          translateX.value = withTiming(-width);
          layout.value = withTiming(0);
          marginVertical.value = withTiming(0);
          opacity.value = withTiming(0, undefined, (finished) => {
            if (finished && onDismiss) {
              runOnJS(onDismiss)(task);
            }
          });
        } else {
          translateX.value = withTiming(0);
        }
      },
    }
  );

  const opacityStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < translateX_Theshold ? 1 : 0);
    return { opacity };
  });

  const r2Style = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const taskContainerStyle = useAnimatedStyle(() => {
    return {
      height: layout.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      themeValue.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );
    return { backgroundColor };
  });

  const textColorStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      themeValue.value,
      [0, 1],
      [Colors.dark.background, Colors.light.background]
    );
    return { color };
  });

  return (
    <Animated.View style={[styles.container, taskContainerStyle]}>
      <PanGestureHandler
        onGestureEvent={gestureEvent}
        simultaneousHandlers={simultaneousHandlers}
      >
        <Animated.View style={[styles.task, r2Style, backgroundColorStyle]}>
          <Animated.Text style={[styles.text, textColorStyle]}>
            {task.title}
          </Animated.Text>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[styles.icon, opacityStyle]}>
        <FontAwesome5 name={"trash-alt"} size={taskHeight * 0.4} color="red" />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  task: {
    backgroundColor: "#fff",
    width: "90%",
    height: taskHeight,
    borderRadius: 10,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    justifyContent: "center",
    paddingLeft: 20,
  },
  text: {
    fontSize: 17,
  },
  icon: {
    height: taskHeight,
    width: taskHeight,
    position: "absolute",
    right: "4%",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default TaskList;
