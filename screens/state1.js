/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Upcoming from '../components/upcoming';

import { SCREEN_CONSTANT } from '../utils/constants';
const {width,height} = SCREEN_CONSTANT.dimensions


function State1({ navigation,interview,users }) {
    
  const Edit = (interviewItem) => {
    
    const selectedUsers = users.filter(item => item.id === interviewItem.users.user1.id || item.id === interviewItem.users.user2.id )
    navigation.navigate('Schedule Interview',{
      users:selectedUsers,
      mode:'edit',
      interview:{...interviewItem,date:interviewItem.date.toISOString()}
    });
    return
  }
  return (
    <View style={{height:'68%',paddingBottom:'4%'}}     
    >
        <FlatList 
          data={interview} 
          numColumns={1}
          contentContainerStyle={{alignItems:'center'}}
          style={{marginTop:'2%',width:width,paddingBottom:'5%'}} 
          renderItem={({item})=><Upcoming Edit={()=>Edit(item)} item={item}/>}/>        
        

    </View>
  );
}



export default State1;
