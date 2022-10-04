/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { AppState,Pressable,FlatList, StyleSheet,ActivityIndicator, Text, View, ToastAndroid, ScrollView } from 'react-native';
import { fetchUsers } from '../API/api';
import Modal from "react-native-modal";

import NewUser from '../components/newUser';
import Upcoming from '../components/upcoming';

import { SCREEN_CONSTANT } from '../utils/constants';

const {width,height} = SCREEN_CONSTANT.dimensions;


const State2 = ({ users, navigation }) => {
    
  const [refreshing,setRefreshing] = useState(false)
  const [added,setAdded] = useState([])
  
  const Add = (id) => {
    setRefreshing(true)
    if (added.length === 2){
        ToastAndroid.show('You cannot add more than 2 users',ToastAndroid.LONG)
        setRefreshing(false)
        
    }
    added.push(id);
    const newArr = added
    console.log('new',newArr)
    setAdded((arr)=>newArr)
    setRefreshing(false)
    
  }
  const Remove = (id) => {
    setRefreshing(true)
    const newArr = added.filter(item => item !== id);
    console.log('new',newArr)
    setAdded((arr)=>newArr)
    setRefreshing(false)
    
  }
  const Continue = () => {
    if (added.length !== 2){
        ToastAndroid.show('Must add 2 users to schedule an interview',ToastAndroid.LONG)
        return
    }
    const selectedUsers = users.filter(item => item.id === added[0] || item.id === added[1] )
    navigation.navigate('Schedule Interview',{
      users:selectedUsers,
      mode:'add',
      interview:null
    });
    return
  }
  const keyExtractor = useCallback((item, index) => index, []);

  const render = (item)=>
    <NewUser item={item}     
    added = {added} 
    setAdded={setAdded} />
  
  return (
    <View   style={{height:height*0.65,width:width,justifyContent:added.length ===2?'space-between':'flex-start',alignItems:'center'}}   
    >
        <View style={{height:added.length ===2?height*0.65*.85:height*0.65}}>
          <ScrollView contentContainerStyle={{alignItems:'center'}} style={{height:added.length ===2?height*0.65*.85:height*0.65,width:width}}>
            {users.map((item)=>render(item))}
            </ScrollView>
            
        </View>        
        {added.length === 2 ?<Pressable
        onPress={Continue}
        
        style={{
            borderRadius:5,
            backgroundColor:'#D83842',
            justifyContent:'center',
            alignItems:'center',
            width:width*.9,
            top:0,
            height:height*0.08
            }}>
            <Text style={{
                color:'white',
                fontSize:15          
                }}>
                Schedule Interview
            </Text>
        </Pressable>:''}
    </View>
  );
}



export default State2;
