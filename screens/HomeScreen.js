/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import { fetchInterview, fetchUsers } from '../API/api';
import Modal from "react-native-modal";
import Upcoming from '../components/upcoming';

import { SCREEN_CONSTANT } from '../utils/constants';
import State1 from './state1';
import State2 from './state2';



function HomeScreen({ navigation }) {
    const [state,setState] = useState('Upcoming')
    const [interview,setInterview] = useState([])
    const [loading,setLoading] = useState(true)
    const [users,setUsers] = useState([])
    
    const fetchInterviewHelper = useCallback(async () => {
      await fetchInterview(setInterview)
    },[fetchInterview])

    const fetchUserHelper = useCallback(async () => {
      await fetchUsers(setUsers)
    },[fetchUsers])
    
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', async () => {
        await fetchInterviewHelper(setInterview);
        await fetchUserHelper(setUsers);
        setLoading(false)
      });
      return unsubscribe;
    }, [setInterview, navigation]);  
    
    
    
  return (
    <View
      style={{
        width: SCREEN_CONSTANT.dimensions.width,
        height: SCREEN_CONSTANT.dimensions.height,
        backgroundColor: '#F5F5F5',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
        <View style={{
            widht:SCREEN_CONSTANT.dimensions.width*0.45,
            marginTop:'6%',
            marginBottom:'3%',
            flexDirection:'row',
            backgroundColor:'#F5F5F5',
            elevation:5,
            shadowColor:'black',
            shadowOffset:{height:5,width:5},
            shadowOpacity:5,
            borderRadius:5,
            alignItems:'center'}}>
            <Pressable
            onPress={()=>setState('Upcoming')}
            style={{
                borderRadius:5,
                backgroundColor:state === 'Upcoming'?'#D83842':'#F5F5F5',
                justifyContent:'center',
                alignItems:'center',
                width:'45%',
                height:SCREEN_CONSTANT.dimensions.height*0.07
                }}>
                <Text style={{
                    color:state === 'Upcoming'?'white':'#2E2E2E',
                    fontSize:15          
                    }}>
                    Upcoming
                </Text>
            </Pressable>
            <Pressable 
            onPress={()=>setState('New')}
            style={{
                borderRadius:5,
                backgroundColor:state === 'New'?'#D83842':'#F5F5F5',
                justifyContent:'center',
                alignItems:'center',
                width:'45%',
                height:SCREEN_CONSTANT.dimensions.height*0.07
                }}>
                <Text style={{
                    color:state === 'New'?'white':'#2E2E2E',
                    fontSize:15          
                    }}>
                    New
                </Text>
            </Pressable>
        </View>

        {loading?
        <Modal isVisible={loading}>
          <View style={{
        backgroundColor:'white',
        elevation:5,
        shadowColor:'black',
        shadowOffset:{height:5,width:5},
        shadowOpacity:5,
        borderRadius:6,
        marginBottom:'5%',
        alignSelf:'center',
        width: SCREEN_CONSTANT.dimensions.width * 0.7,padding:'3.5%'
      }}>
            <ActivityIndicator color={'#D83842'} />
          </View>
        </Modal>
        :state === 'Upcoming'?<State1 users={users} interview={interview} navigation={navigation}/>:<State2 users={users} navigation={navigation}/>}
        

    </View>
  );
}



export default HomeScreen;
