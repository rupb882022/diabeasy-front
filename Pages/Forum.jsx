import { View, Textarea, TouchableOpacity, Image, SectionList, SafeAreaView, StyleSheet, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import Header from '../CTools/Header';
import Button from '../CTools/Button';
import PopUp from '../CTools/PopUp';
import Input from '../CTools/Input';

export default function Forum() {
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
  </View>
  // const data = [{ "id": 1, "subject": "High sugar values", "date_time": "2022-02-10T00:00:00", "value": "How do you deal with high sugar values?", "Doctor_id": null, "Patients_id": 1 },
  // { "id": 2, "subject": "High sugar values", "date_time": "2022-02-11T00:00:00", "value": "I inject and make sure to drink lots of water", "Doctor_id": null, "Patients_id": 3 },
  // { "id": 3, "subject": "High sugar values", "date_time": "2022-02-10T20:39:27.327", "value": "sounds good thank you", "Doctor_id": null, "Patients_id": 1 },
  // { "id": 5, "subject": "sports for healt", "date_time": "2022-02-10T20:39:27.327", "value": "Hello everyone, I recommend doing sports at least once a day for an hour", "Doctor_id": 2, "Patients_id": null }];

  const DATA = [
    {
      id: 0,
      title: "High sugar values",
      // data: ["Pizza", "Burger", "Risotto"],
      data: ['How do you deal with high sugar values?']
    },
    {
      id: 1,
      title: "Sides",
      data: ["French Fries"]
    },
    {
      id: 2,
      title: "Drinks",
      data: ["Water", "Coke", "Beer"]
    },
    {
      id: 3,
      title: "Desserts",
      data: ["Cheese Cake", "Ice Cream"]
    }
  ];
  const [data, setData] = useState(DATA);
  const [isopen, setIsopen] = useState(false);
  const [show, setShow] = useState(false)
  const open_comments = () => {

    if (isopen) {
      setIsopen(false);
    } else {
      setIsopen(true);
    }
  }

  const comments = [{ title: 'I inject and make sure to drink lots of water' }, { title: 'sounds good thank you' }]

  const Item = ({ title }) => {
    return (<><View style={styles.item}>
      <View style={styles.row}>
        <Image source={require('../images/profile_pictur.jpeg')}
          style={styles.image(67, 66)}
        />
        <Text style={styles.text(16)}>{title}</Text>
        <TouchableOpacity onPress={open_comments} style={styles.numberComments}>
          <Text style={styles.numberCommentsText}>2</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.date}>Written in: 2022-02-11</Text>
        <Text style={styles.addComment}>add comment</Text>
      </View>
    </View>
      {isopen && <FlatList
        data={comments}
        renderItem={({ item }) => <Comment value={item} />}
        keyExtractor={(item, index) => item + index}
      />}</>
    );
  }

  const Comment = ({ value }) => {
    return (<View style={styles.comments}>
      <View style={styles.row}>
        <Image source={require('../images/profile_pictur.jpeg')}
          style={styles.image(46, 46)}
        />
        <Text style={styles.text(14)}>{value.title}</Text>
      </View>
      <View>
        <Text style={styles.date}>Written in: 2022-02-11</Text>
      </View>
    </View>
    );
  }
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
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: "flex-start" }}>
      <Button
        text='add subject'
        height={2}
        width={10}
        onPress={() => setShow(true)}
      // radius={0}
      />
      {show &&
        <PopUp
        height={45}
        width={90}
        Button={false}
        button_txt='OK'
        button_textSize={16}
          setShow={setShow}
          backgroundColor='#d6f2fc'
          // title='new subject'
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
  item: {
    backgroundColor: "#9DC1D4",
    padding: '3%',
    marginVertical: '2%'
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    fontSize: 26,
    backgroundColor: "#FFCF84",
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  text: fontSize => {
    return {
      fontSize: fontSize,
      flexWrap: 'wrap',
      flexShrink: 1,
      position: 'relative',
      top: '2%',
      alignSelf: 'center',
      marginLeft: '3%'
    }
  },
  image: (width, height) => {
    return {
      width: width,
      height: height,
      borderRadius: 1000,
      alignSelf: 'flex-start',
      borderColor: "white",
      borderWidth: 2
    }
  },
  numberComments: {
    borderWidth: 1,
    height: '25%',
    width: '5%',
    backgroundColor: 'white',

    position: 'absolute',
    right: '2%',
    top: '10%'
  },
  numberCommentsText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  },
  date: {
    color: 'gray',
    textAlign: 'left',
    paddingTop: '3%',
    fontSize: 12
  },
  comments: {
    backgroundColor: '#D2E4F7',
    padding: '1%',
    marginVertical: '2%',
    paddingLeft: '6%'
  },
  addComment: {
    textAlign: 'left',
    position: 'absolute',
    left: '75%',
    top: '38%',
    color: '#666666',
    fontSize: 12
  }
});