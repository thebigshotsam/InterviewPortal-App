/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, Text, View, Pressable, StyleSheet } from 'react-native';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { SCREEN_CONSTANT } from '../utils/constants';

const {width,height} = SCREEN_CONSTANT.dimensions;
function Upcoming( {Remove,Edit,item, navigation}) {
    

  return (
    <View style= {
        {
        backgroundColor:'white',
        elevation:5,
        shadowColor:'black',
        shadowOffset:{height:5,width:5},
        shadowOpacity:5,
        borderRadius:6,
        marginBottom:'3%',
        width: SCREEN_CONSTANT.dimensions.width * 0.95,padding:'3.5%'}
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
                    {item.users.user2.name} {' <> '} {item.users.user1.name}
                </Text>
                <Text style={{
                    color:'#979797',
                    fontSize:13          
                    }}>
                    {item.title}
                </Text>        
            </View>
      </View>
      <View style={{width:'100%',height:0.3,backgroundColor:'#F6F6F6',marginVertical:'3%'}}/>
        <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
        }}>
            <View style={{
            flexDirection:'row',
            alignItems:'center',            
            }}>
                <View style={{
                    width: width * 0.06,
                    height: width * 0.06,
                }}>
                    <Image
                    source={require('../assets/calendar.png')}
                    style={{width:'100%',height:'100%',tintColor:'#D83842'}}
                    resizeMode="contain"
                    />
                </View>
                <Text style={{
                    color:'#2E2E2E',
                    fontSize:15,
                    fontWeight:'bold',
                    marginLeft:width*0.04          
                    }}>
                    {item.date.toISOString().substring(0,10).replaceAll('-','/')}
                </Text>

            </View>
            <View style={{
            flexDirection:'row',
            alignItems:'center',            
            }}>
                <View style={{
                    width: width * 0.06,
                    height: width * 0.06,
                }}>
                    <Image
                    source={ require('../assets/time.png') }
                    style={{width:'100%',height:'100%',tintColor:'#D83842'}}
                    resizeMode="contain"
                    />
                </View>
                <Text style={{
                    color:'#2E2E2E',
                    fontSize:15,
                    marginLeft:width*0.04,
                    fontWeight:'bold'       
                    }}>
                    {item.selectedTime}
                </Text>

            </View>

        </View>
        <View style={{
            flexDirection:'row',
            width:'100%',
            alignItems:'center',
            marginTop:'8%',
            justifyContent:'space-between'}}>
            
            <Pressable
            onPress={Remove}
            style={{
                borderRadius:5,
                backgroundColor:'#F5F5F5',
                justifyContent:'center',
                alignItems:'center',
                elevation:2,
                shadowColor:'black',
                shadowOffset:{height:5,width:5},
                shadowOpacity:5,
                width:'40%',
                height:height*0.06
                }}>
                <Text style={{
                    color:'#2E2E2E',
                    fontSize:15          
                    }}>
                    Cancel
                </Text>
            </Pressable>

            <Pressable
            onPress={Edit}
            style={{
                borderRadius:5,
                backgroundColor:'#D83842',
                justifyContent:'center',
                alignItems:'center',
                width:'40%',
                height:height*0.06
                }}>
                <Text style={{
                    color:'white',
                    fontSize:15          
                    }}>
                    Edit
                </Text>
            </Pressable>

        </View>
    
    </View>
  );
}



export default Upcoming;
