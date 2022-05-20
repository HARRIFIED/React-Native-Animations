import React from 'react';
import { View, StyleSheet, Platform, Dimensions, Image, Text } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

type PropType = {
  translateY: Animated.SharedValue<number>
};

const {height, width} = Dimensions.get(Platform.OS === 'android' ? 'screen' : 'window')
const HEADER_HEIGHT = height * 0.5
const FINAL = height * .4
const offSet = HEADER_HEIGHT - FINAL

const Header: React.FC<PropType> = ({ translateY }) => {
    
    const headerStyle = useAnimatedStyle(() => {
        const translateYStyle = interpolate(
            translateY.value,
            [0, offSet],
            [0, -offSet],
            Extrapolate.CLAMP
        )
        return{transform: [{translateY: translateYStyle}]} 
    })

    const imgStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            translateY.value,
            [0, offSet],
            [1, 0],
        )
        return {transform: [{scale: scale}]}
    })

    return (
        <Animated.View style={[styles.container, headerStyle]}>
            <View style={[styles.header]}>
                <View style={[styles.iconView]}>
                    <FontAwesome5 name={"arrow-left"} size={20} color="#aeb3b5" style={[styles.arrow]}/>
                    <FontAwesome5 name={'ellipsis-v'} size={20} color="#aeb3b5" style={[styles.trash]}/>
                </View>
            </View>
            <View>
                <Image source={require('../../assets/images/Harri.png')} style={[styles.img]}/>
            </View>
            <View style={[styles.text]}>
                <Text style={{color: '#aeb3b5', fontWeight: '700', fontSize: 30, letterSpacing: 1.5}}>Harrified</Text>
            </View>
            <View style={[styles.text]}>
                <Text style={{color: '#8f9394',  fontSize: 20}}>+234 9038466961</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}>
                <FontAwesome5 name={'phone-alt'} size={20} color="#128C7E" style={{left: '180%'}}/>
                <FontAwesome5 name={'video'} size={20} color="#128C7E" style={{}}/>
                <FontAwesome5 name={'search'} size={20} color="#128C7E" style={{right: '180%'}}/>
            </View>
        </Animated.View>
    );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        height: HEADER_HEIGHT,
        width,
        backgroundColor: '#01141a',
        top: 0
    },
    header: {
        height: HEADER_HEIGHT * 0.3,
        
    },
    iconView: {
        flexDirection: 'row',
        top: '15%',
        justifyContent: 'space-between',
    },
    img: {
        width: HEADER_HEIGHT * 0.3,
        height: HEADER_HEIGHT * 0.3,
        left: '35%',
        top: '-60%',
        borderRadius:HEADER_HEIGHT / 2,
        resizeMode: 'cover'
    }, 
    arrow: {
        left: '90%',
    },
    trash: {
        right: '90%',
    },
    text: {
        alignItems: 'center',
        top: '-11%'
    }
})