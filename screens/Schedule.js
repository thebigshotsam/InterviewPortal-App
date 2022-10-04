/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Image, Text, View, Pressable, StyleSheet, ToastAndroid, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import Candidate from "../components/candidate";
import TextInput from "../components/TextInput";
import Time from "../components/time";
import { SCREEN_CONSTANT } from "../utils/constants";
import CalendarStrip from 'react-native-calendar-strip';
import { confirmInterview, UpdateInterview } from "../API/api";
import Modal from "react-native-modal";

const {width,height} = SCREEN_CONSTANT.dimensions

const Schedule = (props) => {
    const {users,mode,interview} = props.route.params
    const times=['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00']
    const [title, setTitle] = useState(interview?interview.title:"");
    const [selectedTime,setSelectedTime] = useState(interview?interview.selectedTime:"");
    const [selectedDate,setSelectedDate] = useState(interview?interview.time:"");
    const [loading,setLoading] = useState(false)

    const checkAvailability = (user) => {
        console.log(user.interviews)
        for (let i in user.interviews){
            
            if (!interview){
                if (user.interviews[i].time === selectedDate){
                    console.log('Matched')
                    return 1;
                }
            }else{
                if (user.interviews[i].time === selectedDate && i !== interview.id){
                    console.log('Matched')
                    return 1;
                }
            }
        }
        return 0
    }


    

    const SchedulePress = async() => {
        if (!selectedTime || !selectedDate || !title){
            ToastAndroid.show(`Please enter interview ${!selectedDate?'Date':!selectedTime?'Time':!title?'Title':null}`,
            ToastAndroid.LONG);
            return
        }
        const chk1 =  checkAvailability(users[0])
        const chk2 =  checkAvailability(users[1])
        console.log("chk1",chk1)
        console.log("chk2",chk2)
        if (chk1 && chk2) {
            ToastAndroid.show(`${users[0].name} and ${users[1].name} aren't available for the specific time`,
            ToastAndroid.LONG);
            return
        }else if(chk1){
            ToastAndroid.show(`${users[0].name} isn't available for the specific time`,
            ToastAndroid.LONG);
            return
        }else if(chk2){
            ToastAndroid.show(`${users[1].name} isn't available for the specific time`,
            ToastAndroid.LONG);
            return
        }
        if (mode === "edit"){
            setLoading(true)
            await UpdateInterview(title,selectedDate,selectedTime,users,interview)
            ToastAndroid.show('Interview Scheduled',
            ToastAndroid.LONG);
            props.navigation.navigate('My Interview')
            setLoading(false)
        }else{
            setLoading(true)
            await confirmInterview(title,selectedDate,selectedTime,users)
            ToastAndroid.show('Interview Scheduled',
            ToastAndroid.LONG);
            props.navigation.navigate('My Interview')
            setLoading(false)
        }
    }

    return <ScrollView style={{width:width,height:height}}>
        <View style= {
        {
            marginTop:'5%',
            backgroundColor:'white',
            elevation:5,
            shadowColor:'black',
            shadowOffset:{height:5,width:5},
            shadowOpacity:5,
            borderRadius:6,
            flexDirection:'row',
            justifyContent:'space-evenly',
            alignItems:'center',
            marginBottom:'5%',
            alignSelf:'center',
            width: width * 0.95,padding:'3.5%'}
      }>
        <Candidate item={users[0]} />
        <Text style={{color:'#D83842', fontWeight:'bold',fontSize:20}}>{'<>'}</Text>
        <Candidate item={users[1]} />

        </View>
        <View style={{
            backgroundColor:'white',
            elevation:5,
            shadowColor:'black',
            shadowOffset:{height:5,width:5},
            shadowOpacity:5,
            borderRadius:6,
            marginBottom:'5%',
            alignSelf:'center',
            width: width * 0.95,padding:'3.5%'
        }}>
            <TextInput
            label="Interview Title"
            returnKeyType="next"
            
            value={title}
            onChangeText={text => setTitle(text)}            
            autoCapitalize="none"
            
        />
            <Text style={{fontSize:15,color:'#2E2E2E',fontWeight:'500'}}>Pick a time</Text>
            <FlatList 
            data={times} 
            numColumns={4}
            style={{marginVertical:'5%',width:width*.95}} 
            renderItem={({item})=><Time selectedTime={selectedTime} setSelectedTime={setSelectedTime} time={item}/>}/>
            
        </View>
        
        <View style={{backgroundColor:'white',
            elevation:5,
            shadowColor:'black',
            shadowOffset:{height:5,width:5},
            shadowOpacity:5,
            borderRadius:6,
            marginBottom:'5%',
            alignSelf:'center',
            width: width ,padding:'3%'}}>
                <Text style={{fontSize:13,color:'#2E2E2E',fontWeight:'500',marginBottom:'4%'}}>Pick a Date</Text>
            <CalendarStrip
                scrollable
                selectedDate={interview?interview.date:new Date()}               
                onDateSelected={(date)=>{
                    if (!selectedTime){
                        ToastAndroid.show('Please select time',ToastAndroid.LONG);
                        return
                    }
                    const form = date.toISOString().substring(0,11)+selectedTime+":00+0000"
                    console.log(form)
                    const newDate = new Date(form)
                    const dateinMil = newDate.getTime()
                    console.log("MIlli",dateinMil)
                    setSelectedDate(dateinMil)
                }}
                
                style={{height:height*0.15, paddingTop: 20, paddingBottom: 10,borderRadius:5}}
                calendarColor={'#FEF4F4'}
                calendarHeaderStyle={{color: 'black',fontSize:13}}
                highlightDateNumberStyle={{color:'#D83842'}}
                highlightDateNameStyle={{color:'#D83842'}}
                dateNumberStyle={{color: 'black',fontSize:11}}
                dateNameStyle={{color: 'black',fontSize:11}}
                iconContainer={{flex: 0.1}}
            />
            <Pressable
        onPress={SchedulePress}
        
        style={{
            borderRadius:5,
            backgroundColor:'#D83842',
            justifyContent:'center',
            alignItems:'center',
            width:width*.9,
            alignSelf:'center',
            elevation:5,
            shadowColor:'black',
            shadowOffset:{height:5,width:5},
            shadowOpacity:5,
            height:height*0.08,
            marginTop:'5%'
            }}>
            <Text style={{
                color:'white',
                fontSize:15          
                }}>
                Confirm
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
        </Modal>:null}
    </ScrollView>
}

export default Schedule;