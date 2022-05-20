import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, ScrollView, StyleSheet, Platform, Dimensions } from 'react-native';
import Animated,{ useSharedValue, useAnimatedScrollHandler, } from 'react-native-reanimated';
import Header from './Header';


const {height, width} = Dimensions.get(Platform.OS === 'android' ? 'screen' : 'window')

const view = [1, 2, ,3 ,4, 5, ,6,7]

export default function WhatsappHeader() {
    const translateY = useSharedValue(0)
    const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });
    return (
        <View style={[styles.container]}>
            <StatusBar style="light" backgroundColor="#052630" />
            <Header translateY={translateY}/>
            <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
                
                {view.map((v, index) => (
                    <View key={index} style={{
                    marginTop: 20,
                    height: height * 0.2,
                    backgroundColor: '#01141a'
                }}
                />
                ))}
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height,
        width,
        backgroundColor: '#000a0d'
    }
})