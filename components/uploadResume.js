/* eslint-disable prettier/prettier */
import React from "react";

import { Image, Text, View, Pressable, StyleSheet, ToastAndroid } from 'react-native';
import { SCREEN_CONSTANT } from '../utils/constants';

const {width,height} = SCREEN_CONSTANT.dimensions;

const UploadResumeBtn = (props) => {
    const onPress = () => {
        props.uploadResume()
    }
    return <Pressable onPress={onPress} 
    style={{
        borderColor:'#D83842',
        borderStyle:'solid',
        borderWidth:2,
        paddingHorizontal:'3%',
        paddingVertical:'2%',
        borderRadius:3,
        flexDirection:'row',
        alignItems:'center',
        marginTop:height*0.05}} >
        <Text style={{color:'#D83842',fontSize:12,fontWeight:'bold'}}>
            Upload Resume
        </Text>
    </Pressable>  
    
}

export default UploadResumeBtn