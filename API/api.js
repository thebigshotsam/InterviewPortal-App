/* eslint-disable prettier/prettier */
import database from '@react-native-firebase/database';
var postmark = require("postmark");

const fetchInterview = async(setInterview) => {
    const arr = []
    await database()
  .ref('/interviews')
  .once('value')
  .then(snapshot => {
    snapshot.forEach(item => {
        arr.push(item.val())
    })
    
  });
  const newArr = arr.map(item=>{ return {...item,date:new Date(item.time)}})
  console.log(newArr)
  setInterview(newArr)
  return  
}
const fetchUsers = async(setUsers) => {
    const arr = []
    await database()
  .ref('/users')
  .once('value')
  .then(snapshot => {
    snapshot.forEach(item => {
        arr.push(item.val())
    })
    
  });
  console.log(arr)
  setUsers(arr)
  return
}
const confirmInterview = async (title,time,selectedTime,users) => {
    const newReference = await database().ref('/interviews').push();
    console.log('Auto generated key: ', newReference.key);
    await newReference
    .set({
        id: newReference.key,
        title:title,
        selectedTime:selectedTime,
        time:time,
        users:{
            user1:{
                id:users[0].id,
                name:users[0].name
            },
            user2:{
                id:users[1].id,
                name:users[1].name
            }
        }
    });
    const res = await UpdateUserInterview(newReference.key,time,users)
    // var serverToken = "ad3a4291-1502-4ae4-a9a9-196a7a03a73f";
    // var client = new postmark.ServerClient(serverToken);

    // await client.sendEmail({
    //     "From": "imt_2018088@iiitm.ac.in",
    //     "To": "sakshamtiwari.thebigshotsam@gmail.com",
    //     "Subject": "Test",
    //     "TextBody": "Hello from Postmark!"
    // })
    
    return
}
const UpdateInterview = async (title,selectedDate,selectedTime,users,interview) => {
    const res = await database()
    .ref('/interviews/'+interview.id)
    .update({
        title:title,
        selectedTime:selectedTime,
        time:selectedDate,
        });
    const res2 = await UpdateUserInterview(interview.id,selectedDate,users)
    return
    
}
const UpdateUserInterview = async (interviewKey,time,users) => {
    const res1 =  await database().ref('/users/'+users[0].id+"/interviews/"+interviewKey)
    .set({
        id: interviewKey,
        time:time,
        users:{
            user1:{
                id:users[0].id,
                name:users[0].name
            },
            user2:{
                id:users[1].id,
                name:users[1].name
            }
        }
    })
    
     const res2 = await database().ref('/users/'+users[1].id+"/interviews/"+interviewKey)
    .set({
        id: interviewKey,
        time:time,
        users:{
            user1:{
                id:users[0].id,
                name:users[0].name
            },
            user2:{
                id:users[1].id,
                name:users[1].name
            }
        }
    })
    
    return
}
const removeInterview = async (interview,users) => {
    await database().ref('/interviews/'+interview.id).remove();
    await database().ref('/users/'+users[0].id+"/interviews/"+interview.id).remove();
    await database().ref('/users/'+users[1].id+"/interviews/"+interview.id).remove();
    return
}
export {fetchInterview,fetchUsers,confirmInterview,UpdateInterview,removeInterview}