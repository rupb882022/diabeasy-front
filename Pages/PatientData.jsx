import { StyleSheet, Text,Dimensions, View,ScrollView } from 'react-native'
import React, { useEffect, useState,useContext } from 'react'
import {
  LineChart,
  BarChart,
  PieChart
} from 'react-native-chart-kit'
import Header from '../CTools/Header'
import upiUrl from '../Routes/Url'
import Alert from '../CTools/Alert';
import Loading from '../CTools/Loading';
import { UserContext } from '../CTools/UserDetailsHook'


export default function PatientData() {
  const {userDetails} = useContext(UserContext);
  const [pieInfo,setPieInfo]=useState([1,4,15,3,1])
  const [lineChartInfo,setLineChartInfo]=useState([100,140,120,150,100,130,100,140,120,150,100,130])
  const [alert, setAlert] = useState()
  const [loading, setLoading] = useState(false);

 

useEffect(()=>{

  let url;
  if (userDetails.patientID) {        // if its doctor with selected patient
    url=upiUrl + `User/GetdataForGraphs/${userDetails.patientID}`;
  } 
else if(userDetails.id%2!=0){            // if its patient (=> not a doctor without selected patient)
  url=upiUrl + `User/GetdataForGraphs/${userDetails.id}`;
}  
  setLoading(true)
  fetch(url, {
    method: 'GET',
    headers: new Headers({
        'Content-Type': 'appliction/json; charset=UTF-8',
        'Accept': 'appliction/json; charset=UTF-8'
    })
}).then(res => {
  console.log("resData=> ",res.status);
    if (res && res.status == 200) {
        return res.json();} 

    else {
        console.log("status code:", res.status)
        setLoading(false)
        return;
    }
}).then((result) => {
  setLoading(false)
  console.log('result1=>', result);
  setPieInfo(result);
},
    (error) => {
        console.log("error", error)
        setAlert(
          <Alert text="sorry, somthing went wrong, please try again later"
          type='worng'
          time={2000}
          bottom={110}
          />);
       setLoading(false)
    }) 
},[])


  let chartConfig= {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  }

  let data ={
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","jul","aug","sep","oct","nov","dec"], //"jul","aug","sep","oct","nov","dec"
    datasets: [
      {
        data: lineChartInfo
      }
    ]
  }

  let dataPie=[
    {
      name: "[>240]",
      amount: pieInfo[0],
      color: "#EBCD86",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "[181-240]",
      amount: pieInfo[1],
      color: "#FFB300",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "[75-180]",
      amount:pieInfo[2],
      color: "#010117",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "[60-74]",
      amount: pieInfo[3],
      color: "#0009FF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "[<60]",
      amount:pieInfo[4] ,
      color: "#55ACF7",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];


  return (
    <>

      <Header
      title='Graphs'
      flex={0.8}
/> 
 <Text style={{alignSelf:'center',fontWeight:'bold',fontSize:20,position:'absolute',top:'10%'}}>Estimated A1C Value : 7.3% </Text>

  <View>

     <ScrollView>
     <View>
<Text style={{alignSelf:'center',fontSize:20}}>Range per 7 days/30 days</Text>

<PieChart
  data={dataPie}
  width={Dimensions.get("window").width}
  height={230}
  chartConfig={chartConfig}
  accessor={"amount"}
  backgroundColor={"transparent"}
  paddingLeft={"15"}
 // center={[10, 50]}
//absolute
/>

</View>
       <View style={{paddingBottom:'2%'}}>
  <Text style={{alignSelf:'center',fontSize:20}}>Avarage in past 6 months</Text>
  <LineChart
    data={data}
    width={Dimensions.get("window").width} // from react-native
    height={250}
    //yAxisLabel="$"
    //yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={chartConfig}
   // bezier
    style={{marginVertical: 8,borderRadius: 16}}
  />
  </View>

  </ScrollView>
</View>
{loading&&loading}
</>
  )
}

const styles = StyleSheet.create({})