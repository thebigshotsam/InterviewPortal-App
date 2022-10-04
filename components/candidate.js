/* eslint-disable prettier/prettier */
import React, { memo, useMemo } from 'react';
import { Image, Text, View, Pressable, StyleSheet, ToastAndroid } from 'react-native';
import { SCREEN_CONSTANT } from '../utils/constants';

const {width,height} = SCREEN_CONSTANT.dimensions;
const Candidate = ( props ) => {    
    
  return (
    
        <View style={{alignItems:'center'}}>
            <View style={{
                    width: width * 0.15,
                    height: width * 0.15,
                }}>
                <Image
                source={require('../assets/user.png')}
                style={{width:'100%',height:'100%'}}
                resizeMode="contain"
                />
            </View>

            <View style={{
                    width: width * 0.65,
                    height: height*.06,
                    marginTop:'2%',
                    justifyContent: 'space-between',
                    alignItems:'center'
                }}>
                <Text style={{
                    color:'#2E2E2E',
                    fontSize:15          
                    }}>
                    {props.item.name}
                </Text>
                <Text style={{
                    color:'#979797',
                    fontSize:13          
                    }}>
                    {props.item.profile}
                </Text>        
            </View>
      </View>
      
  );
}



export default memo(Candidate);
