/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { removeInterview } from '../API/api';
import Upcoming from '../components/upcoming';
import Modal from 'react-native-modal';

import { SCREEN_CONSTANT } from '../utils/constants';
const {width,height} = SCREEN_CONSTANT.dimensions


function State1({ setInterview,navigation,interview,users }) {

  const [loading,setLoading] = useState(false)
    
  const Edit = (interviewItem) => {
    
    const selectedUsers = users.filter(item => item.id === interviewItem.users.user1.id || item.id === interviewItem.users.user2.id )
    navigation.navigate('Schedule Interview',{
      users:selectedUsers,
      mode:'edit',
      interview:{...interviewItem,date:interviewItem.date.toISOString()}
    });
    return
  }
  const Remove = async (interviewItem) => {
    setLoading(true)
    await removeInterview(interviewItem,users)
    const arr = interview.filter(item => interviewItem.id !== item.id)
    setInterview(arr);
    setLoading(false)
  }
  return (
    <View style={{height:'68%',paddingBottom:'4%'}}     
    >
        <FlatList
          data={interview} 
          numColumns={1}
          contentContainerStyle={{alignItems:'center'}}
          style={{marginTop:'2%',width:width,paddingBottom:'5%'}} 
          renderItem={({item})=><Upcoming Remove={()=>Remove(item)} Edit={()=>Edit(item)} item={item}/>}/>        
        
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
        </Modal>:null}
    </View>
  );
}



export default State1;
