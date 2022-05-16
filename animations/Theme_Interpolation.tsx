import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions, Platform, Text, Switch } from 'react-native';
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

const { height, width } = Dimensions.get(Platform.OS === 'android' ? 'screen' : 'window');
const Colors = {
  dark: {
    background: '#1E1E1E',
    circle: '#252525',
    text: '#F8F8F8',
  },
  light: {
    background: '#F8F8F8',
    circle: '#FFF',
    text: '#1E1E1E',
  },
};

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256, 0, 256, 0.2)',
  false: 'rgba(0,0,0,0.1)',
};

type Theme = 'light' | 'dark';

export default function Theme() {

    const [theme, setTheme] = useState<Theme>('light')

    const themeValue = useDerivedValue(() => {
        return theme === 'dark' ? withTiming(1) : withTiming(0)
    }, [theme])

    const rStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            themeValue.value,
            [0, 1],
            [Colors.light.background, Colors.dark.background]
        )
        return {
            backgroundColor,
        };
    })
    const textStyle = useAnimatedStyle(() => {
        const color = interpolateColor(
            themeValue.value,
            [0, 1],
            [Colors.dark.background, Colors.light.background ]
        )
        return {
            color,
        };
    })

    return (
        <Animated.View style={[styles.container, rStyle]}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            <Animated.Text style={[styles.text, textStyle]}>THEME</Animated.Text>
            <Animated.View style={[styles.circle, rStyle]}>
                <Switch 
                    value={theme === 'dark'} 
                    onValueChange={(toggled) => {
                        setTheme(toggled ? 'dark' : 'light')
                    }} 
                    thumbColor = {'blue'}
                    trackColor = {SWITCH_TRACK_COLOR}
                />
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        height,
        width,
        backgroundColor:'#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle: {
        height: width * 0.7,
        width: width * 0.7,
        backgroundColor: "#fff",
        borderRadius:150,
        elevation: 10,
        shadowOffset:{
            width: 0,
            height: 20
        },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 35
    }

})