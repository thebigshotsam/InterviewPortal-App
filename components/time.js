/* eslint-disable prettier/prettier */
import React from "react";

import { Image, Text, View, Pressable, StyleSheet, ToastAndroid } from 'react-native';
import { SCREEN_CONSTANT } from '../utils/constants';

const {width,height} = SCREEN_CONSTANT.dimensions;

const Time = (props) => {
    const onPress = () => {
        props.setSelectedTime(props.time)
    }
    return props.selectedTime === props.time?
    <Pressable onPress={onPress} style={{backgroundColor:'#D83842',paddingHorizontal:'4%',paddingVertical:'2%',borderRadius:3,margin:'2%'}} >
        <Text style={{color:'white',fontSize:13,fontWeight:'bold'}}>
            {props.time}
        </Text>
    </Pressable>:
    <Pressable onPress={onPress} style={{backgroundColor:'#FEF4F4',paddingHorizontal:'4%',paddingVertical:'2%',borderRadius:3,margin:'2%'}} >
        <Text style={{color:'black',fontSize:13,fontWeight:'bold'}}>
            {props.time}
        </Text>
    </Pressable>
    
}

export default Time