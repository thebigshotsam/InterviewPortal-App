/* eslint-disable prettier/prettier */
import React, { memo, useMemo } from 'react';
import { Image, Text, View, Pressable, StyleSheet, ToastAndroid } from 'react-native';
import { SCREEN_CONSTANT } from '../utils/constants';

const {width,height} = SCREEN_CONSTANT.dimensions;
const NewUser = ( props ) => {
    const Add = () => {
        if (props.added.length === 2){
            ToastAndroid.show('You cannot add more than 2 users',ToastAndroid.LONG)
            return
        }
        
        const newArr = [...props.added,props.item.id]
        console.log('new',newArr)
        props.setAdded((arr)=>newArr)
        
      }
      const Remove = () => {
        const newArr = props.added.filter(item => item !== props.item.id);
        console.log('new',newArr)
        props.setAdded((arr)=>newArr)
         
      }
    
  return (
    <View style= {
        {
        backgroundColor:'white',
        elevation:5,
        shadowColor:'black',
        shadowOffset:{height:5,width:5},
        shadowOpacity:5,
        borderRadius:6,
        marginBottom:'5%',
        width: SCREEN_CONSTANT.dimensions.width * 0.95,padding:'2.5%'}
      }>
        <View style={{flexDirection:'row',alignItems:'flex-start'}}>
            <View style={{
                    width: width * 0.1,
                    height: width * 0.1,
                }}>
                <Image
                source={require('../assets/user.png')}
                style={{width:'100%',height:'100%'}}
                resizeMode="contain"
                />
            </View>

            <View style={{
                    width: width * 0.65,
                    marginLeft: width * 0.06,
                    height: height*.06,
                    justifyContent: 'space-between',
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
             
            
        <View style={{
            flexDirection:'row',
            width:'100%',
            alignItems:'center',
            marginTop:'1%',
            justifyContent:'flex-end'}}>            
           

            {props.added.includes(props.item.id) === false?<Pressable
            onPress={Add}
            style={{
                borderRadius:5,
                backgroundColor:'#D83842',
                justifyContent:'center',
                alignItems:'center',
                width:'20%',
                height:height*0.05,
                }}>
                <Text style={{
                    color:'white',
                    fontSize:13          
                    }}>
                    Add
                </Text>
            </Pressable>:
            <Pressable
            onPress={Remove}
            style={{
                borderRadius:5,
                backgroundColor:'#F5F5F5',
                justifyContent:'center',
                alignItems:'center',
                width:'20%',
                borderWidth:1,
                
                height:height*0.05
                }}>
                <Text style={{
                    color:'#2E2E2E',
                    fontSize:13          
                    }}>
                    Remove
                </Text>
            </Pressable>}


        </View>
    
    </View>
  );
}



export default memo(NewUser);
