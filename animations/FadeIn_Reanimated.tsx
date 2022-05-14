import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

const SIZE = 100
export default function FadeIn2() {

    const ANIMATED_VALUE = useSharedValue(0);
    const scale = useSharedValue(0);

    useEffect(() => {
        ANIMATED_VALUE.value = withTiming(1, {duration: 1000})
        scale.value = withTiming(1, {duration: 1000})
    })

    const reanimatedStyle = useAnimatedStyle(() => {
        return { 
            opacity: ANIMATED_VALUE.value,
            transform:[
                {scale: scale.value}
            ]
        }
    }, [])
    return (
        <View style={[styles.container]}>
            <Animated.View style={[styles.box, reanimatedStyle]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: "center",
        justifyContent: "center",
    },
    box: {
        width: SIZE,
        height: SIZE,
        backgroundColor: "blue",
        position: 'absolute',
        top: 300
        
    }
})