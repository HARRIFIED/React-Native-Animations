import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import BottomSheet from "./BottomSheet";

export default function BottomSheets() {
  return (
    <View style={{ backgroundColor: "#111", height: "100%" }}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <BottomSheet />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0
  },
});
