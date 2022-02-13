import { View, SectionList, SafeAreaView, StyleSheet, Text,  } from 'react-native'
import React, { useState } from 'react'
import Header from '../../CTools/Header';
import Button from '../../CTools/Button';
import PopUp from '../../CTools/PopUp';
import Input from '../../CTools/Input';
import MainComment from './MainComment';


export default function Forum() {
  //pop up element
const element =<View>
    <Text style={{fontSize:30,textAlign:'center',color:'white',fontWeight:'bold',marginBottom:'3%',textShadowColor: '#187FA5',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,}}>new subject</Text>
    <Input
      label='subject'
      height={50}
      width={130}
      justifyContent='flex-start'
      alignItems='flex-end'
    />
    <View style={{flex:3,justifyContent:'flex-start'}}>
    <Input
    label='description'
    height={80}
    width={160}
    placholder='Write your question...'
    justifyContent='flex-start'
    alignItems='center'
    />
    </View>
    <Button
    text='ok'
    alignItems='center'
    width={25}
    height={5}
    onPress={()=>(setShow(false))}
    >
    </Button>
</View>;


  const DATA = [
    {
      id: 0,
      subject: "High sugar values",
      data: ['How do you deal with high sugar values?'],
      exstraData:[{
     writer_id:1,
      name:'tal farksh',
      date:'2022-02-11',
      comments:[{writer_id:3, value: 'I inject and make sure to drink lots of water' ,date:'2022-02-11',name:'idan lavee',image:null},{ writer_id:1,value: 'sounds good thank you',date:'2022-02-11',name:'tal farkash',image:null }]
      }]
    },
    {
      id: 1,
      subject: 'sports for healt',
      data: ["Hello everyone, I recommend doing sports at least once a day for an hour",'looking for soucer team to play in sunday'],
      exstraData:[{
       writer_id:2,
      name:'DR gal',
      date:'2022-02-11',
      comments:[]
    },
    {
      writer_id:3,
     name:'idan lavee',
     date:'2022-06-22',
     comments:[{ writer_id:1,value: 'i play in Hifa in monday, you can join us dude!',date:'2022-06-23',name:'tal farkash',image:null }]
   },
  ]
    },
  ];
  const [data, setData] = useState(DATA);
  const [show, setShow] = useState(false)

  return (<>
    <Header
      title="Forum"
      logo_image='forum'
      flex={1}
      image_heigt={80}
      image_width={30}
      paddingRight={8}
      possiton={60}
    />
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index}) => <MainComment item={item} index={index}  data={data} />}
        renderSectionHeader={({ section: { subject } }) => (
          <Text style={styles.header}>{subject}</Text>
        )}
      />
    </SafeAreaView>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: "flex-start" }}>
      <Button
        text='add subject'
        height={2}
        width={10}
        onPress={() => setShow(true)}
      />
      {show &&
        <PopUp
        height={45}
        width={90}
        isButton={false}
        button_txt='OK'
        button_textSize={16}
          setShow={setShow}
          backgroundColor='#d6f2fc'
          element={element}
          button_justifyContent='flex-start'
        />}
    </View>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    marginHorizontal: 16,
    position: 'relative',
    bottom: '5%'
  },
  header: {
    fontSize: 24,
    backgroundColor: "#FFCF84",
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    shadowOffset: {
      width: -1,
      height: 1
    },
    shadowOpacity:25,
  },
});