import { View, SectionList, SafeAreaView, StyleSheet, Text, Switch } from 'react-native'
import React, { useState, useEffect,useContext } from 'react'
import Header from '../../CTools/Header';
import Button from '../../CTools/Button';
import PopUp from '../../CTools/PopUp';
import Input from '../../CTools/Input';
import MainComment from './MainComment';
import {Get_all_comments,Get_all_subjects,Post_Comment} from '../../Functions/Function'
import Loading from '../../CTools/Loading'
import { useFocusEffect } from '@react-navigation/native';
import {UserContext} from '../../CTools/UserDetailsHook'
import Alert from '../../CTools/Alert';


export default function Forum() {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [subject, setSubject] = useState(false);
  const [popupSubject, setPopupSubject] = useState(false);
  const [subjectList, setSubjectList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({});
  const [commentValue, setCommentValue] = useState();
  const [alert, setAlert] = useState()

  const {userDetails} = useContext(UserContext);

  const addCommnet=()=>{
    {
      //if the new comment have subject and value
      if (commentValue && subject&&userDetails) {
        //if user is doctor or patient
        let today=new Date();
        if (userDetails.id % 2 == 0) {
      
          setComment({
            date_time: today,
            subject: subject,
            value: commentValue,
            Doctor_id: userDetails.id,
          });
        } else {
          setComment({
            date_time:today,
            subject: subject,
            value: commentValue,
            Patients_id: userDetails.id,
          });
        }
        setShow(false);
      }
    }
  }


  //pop up element add new subject
  const element = <View>
    <Text style={{
      fontSize: 30, textAlign: 'center', color: 'white', fontWeight: 'bold', marginBottom: '3%', textShadowColor: '#187FA5',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
    }}>new subject</Text>
    <View style={{ flex: 1, flexDirection: 'row', alignContent: 'space-between', width: '100%' }}>
      {popupSubject ?
        <Input
          label='Exist subject'
          height={50}
          type='selectBox'
          getValue={(value) => setSubject(value)}
          SelectBox_placeholder='Select subject...'
          placeholder='Select subject...'
          width={100}
          justifyContent='flex-start'
          alignItems='flex-end'
          editable={false}
          selectBox_items={popupSubject ? subjectList : []}
        />
        :
        <Input
          label='New subject'
          height={50}
          value={!popupSubject && ''}
          width={100}
          getValue={(value) => setSubject(value)}
          justifyContent='flex-start'
          alignItems='flex-end'
          placeholder='type new subject...'
        />
      }
      <Switch
        style={{ alignSelf: 'center', marginLeft: '7%', marginTop: '3%' }}
        trackColor={{ false: "#FFFFFF", true: "#3CA6CD" }}
        thumbColor={popupSubject ? '#FFCF84' : "#3CA6CD"}
        ios_backgroundColor='#FFCF84'
        onValueChange={() => { setPopupSubject(!popupSubject) }}
        value={!commentValue || !subject ? popupSubject : ''}
      />

    </View>
    <View style={{ flex: 3, justifyContent: 'flex-start',paddingBottom:'5%' }}>
      <Input
        placeholder='description..'
        multiline={true}
        numberOfLines={4}
        height={70}
        width={100}
        getValue={(value) => setCommentValue(value)}
        justifyContent='center'
        alignItems='center'
        validLable={!commentValue || !subject ? ' fill in subject and description' : ''}
      />
    </View>
    <View style={{flexDirection:'row'}}>
    <Button
       text='cancel'
       justifyContent='center'
       alignItems='center'
       width={10}
       height={3}
       onPress={()=> setShow(false)}
    />
    <Button
      text='ok'
      justifyContent='center'
      alignItems='center'
      width={20}
      height={3}
      onPress={()=>{addCommnet()}}
    >
    </Button>
    </View>
  </View>;  


  useEffect(() => {
    if (!show && comment && commentValue) {
      Post_Comment(comment).then((response) => {
        response&&get_all_comments()
        })
        .catch((error) => {
          setAlert(
            <Alert text="sorry something went wrong try again later"
            type='worng'
            time={2000}
            bottom={110}
            />)
            console.log("error in function Post_Comment"+error);
        });
    }
  }, [comment]);



  //get all subject
  const get_subject_list = () => {

    // if (!subjectList) {
      Get_all_subjects().then((resulte) => {
        if (resulte.length > 0) {
          let tempList = resulte.map((x, i) => ({ itemKey: i, label: x, value: x }))
          setSubjectList(tempList);
        }
      },
        (error) => {
          setAlert(
            <Alert text="sorry something went wrong, try again later"
            type='worng'
            time={2000}
            bottom={110}
            />)
          console.log("error in function Get_all_subjects", error);
        }
      )
    }


  const buildForum = (resulte) => {
    try {
      if (resulte.length > 0) {
        //first subject comment
        let allComments = [{
          index: 0,
          id: resulte[0].id,
          subject: resulte[0].subject,
          data: [resulte[0].value],
          exstraData: [{
            writer_id: resulte[0].userId,
            comment_id: resulte[0].id,
            name: resulte[0].userName,
            date: resulte[0].date_time,
            image: resulte[0].profileimage,
            comments: []
          }]
        }];

        //resulte is sort by subject, Id_Continue_comment
        for (let i = 1; i < resulte.length; i++) {
          //the exstraData per comment
          let detials = {
            writer_id: resulte[i].userId,
            name: resulte[i].userName,
            date: resulte[i].date_time,
            comment_id: resulte[i].id,
            image: resulte[i].profileimage,
            comments: []
          }
          //set the index for comment and respon
          let Comments_Index = allComments.length - 1;

          if (resulte[i].subject == resulte[i - 1].subject) {
            //for new comment in the same subject
            if (resulte[i].Id_Continue_comment == 0) {
              allComments[Comments_Index].data.push(resulte[i].value);
              allComments[Comments_Index].exstraData.push(detials);
            }//for respone on comment
            else {
              detials = {
                writer_id: resulte[i].userId,
                name: resulte[i].userName,
                date: resulte[i].date_time,
                value: resulte[i].value,
                comment_id: resulte[i].id,
                image: resulte[i].profileimage,
              }

              //find the index for right comment to respone
              let exstraData_index = '';
              for (let z = 0; z < allComments[Comments_Index].exstraData.length; z++) {
                if (allComments[Comments_Index].exstraData[z].comment_id == resulte[i].Id_Continue_comment) {
                  exstraData_index = z
                  break;
                } else {
                  exstraData_index = 0
                }
              }
              allComments[Comments_Index].exstraData[exstraData_index].comments.push(detials);
            }
          }//new subject
          else {
            allComments.push({
              index: allComments.length,
              id: resulte[i].id,
              subject: resulte[i].subject,
              data: [resulte[i].value],
              exstraData: [detials]
            })
          }
        }
        setData(allComments);
      }
    } catch (error) {
    }

  }

  const get_all_comments = () => {
   !loading&&setLoading(true);
    Get_all_comments().then((resulte) => {
      buildForum(resulte)
    },
      (error) => {
        setAlert(
          <Alert text="sorry something went wrong, try again later"
          type='worng'
          time={2000}
          bottom={110}
          />)
        console.log("error in function Get_all_comments", error)
      })
  }

  // get all comment every time when user go into the forum
  useFocusEffect(
    React.useCallback(() => {
     get_all_comments();
   loading&&setInterval(() => setLoading(false), 2000);
    }, [])
  );
useEffect(()=>{
  !loading&& setLoading(false);
},[data,alert])

  return (<>
    {loading && <Loading
    opacity = {'#d6f2fc'}
    />}
    {data && <Header
      title="Forum"
      logo_image='forum'
      flex={0.7}
      // image_heigt={80}
      // image_width={30}
      // paddingRight={8}
      possiton={30}
    />}
    {data && <SafeAreaView style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => <MainComment 
                                        getAllComments={get_all_comments} 
                                        userDetails={userDetails} 
                                        item={item} 
                                        index={index} 
                                        data={data} 
                                        setAlert={(value)=>{ setAlert(value)}}
                                        />}
        renderSectionHeader={({ section: { subject } }) => (
          <Text style={styles.header}>{subject}</Text>
        )}
      />
    </SafeAreaView>}
    <View style={{ flex: 1, alignItems: 'center', justifyContent: "flex-start" }}>
      {data && <Button
        text='add subject'
        height={2}
        width={10}
        onPress={() => { setShow(true); get_subject_list(); }}
      />}
      {show &&
        <PopUp
          height={45}
          width={90}
          isButton={false}
          button_textSize={16}
          setShow={setShow}
          backgroundColor='#d6f2fc'
          element={element}
          button_justifyContent='flex-start'
        />}
    </View>
    {alert&&alert}</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    marginHorizontal: 16,
    position: 'relative',
    bottom: '2.5%'
  },
  header: {
    fontSize: 24,
    backgroundColor: "#FFCF84",
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius:8,
    shadowOffset: {
      width: -1,
      height: 1
    },
    shadowOpacity: 25,
  },
});