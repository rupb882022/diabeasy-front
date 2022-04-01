import { StyleSheet,SafeAreaView, Text, Dimensions, View, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
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
import Input from '../CTools/Input'


export default function PatientData() {
  const { userDetails } = useContext(UserContext);
  const [pieInfo, setPieInfo] = useState();
  const [pieInfoMonth, setPieInfoMonth] = useState();
  const [monthList, setMonthList] = useState();
  const [month,setMonth]=useState()
  const [alert, setAlert] = useState();
  const [loading, setLoading] = useState(false);
  const [grapData, setGrapData] = useState();


  //todo if there is not enough data of patient
  const ParsetoMonthName = (monthNumber) => {
    const date = new Date();
    if(monthNumber==30){
      return "last 30 days"
    }
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }

  useEffect(() => {

    let url;
    if (userDetails.patientID) {        // if its doctor with selected patient
      url = upiUrl + `User/GetdataForGraphs/${userDetails.patientID}`;
    }
    else if (userDetails.id % 2 != 0) {            // if its patient (=> not a doctor without selected patient)
      url = upiUrl + `User/GetdataForGraphs/${userDetails.id}`;
    }
    setLoading(true)
    fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'appliction/json; charset=UTF-8',
        'Accept': 'appliction/json; charset=UTF-8'
      })
    }).then(res => {
      console.log("resData=> ", res.status);
      if (res && res.status == 200) {
        return res.json();
      }
      else {
        console.log("status code:", res.status)
        setLoading(false)
        return;
      }
    }).then((result) => {
      setLoading(false)
      let List = [];
      let data = [];
      let labels = [];
      let dataPie = [];
      result.map(x => {
        //array for graph
        if (x.month != 30) {
          data.push(x.averge);
          labels.push(ParsetoMonthName(x.month));
        }
        //list for select box
        List.push({ itemKey: x.month, label: ParsetoMonthName(x.month), value: x.month });
        
        //array for pie
        dataPie.push({
          'month': x.month,
          values: [{
            name: "[>240]",
            amount: Number(x.upTo240),
            color: "#EBCD86",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "[180-240]",
            amount: Number(x.upTo180),
            color: "#FFB300",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "[75-180]",
            amount: Number(x.upTo75),
            color: "#010117",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "[60-74]",
            amount: Number(x.upTo60),
            color: "#0009FF",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "[<60]",
            amount: Number(x.upTo0),
            color: "#55ACF7",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          }]
        }
        )
      }

      )
      setMonthList(List)
      setPieInfo(dataPie)
      setMonth(30)
      setGrapData({
        labels: labels,
        datasets: [{ data: data }]
      })
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
  }, [])


  let chartConfig = {
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


  useEffect(() => {
if(pieInfo){
    let temp
    if(!month){
      temp= pieInfo.find(x=>x.month==30);
    }else{
    temp= pieInfo.find(x=>x.month==month);
  }
  console.log("temp",temp);
    setPieInfoMonth(temp.values)
}
  },[month])


  return (
    <>
        <Header
          title='Graphs'
          flex={0.4}
          possiton={62}
          paddingRight={5}
        />
        <View style={{flex:0.08,position:'relative',bottom:'5%',right:'28%'}}>
         <Input
          label='Month'
          placeholder='last 30 days'
          alignItems='center'
          editable={false}
          width={35}
          height={100}
          getValue={(value) => setMonth(value)}
          type='selectBox'
          SelectBox_placeholder='Select month'
          selectBox_items={monthList?monthList:[]}
        />
        </View>
     <SafeAreaView style={styles.containerView}>
      <ScrollView style={styles.container}>


        {/* <Text>Estimated A1C Value : 7.3% </Text> */}


        <View>
          {pieInfoMonth && <PieChart
            data={pieInfoMonth}
            width={Dimensions.get("window").width}
            height={230}
            chartConfig={chartConfig}
            accessor={"amount"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
          // center={[10, 50]}
          //absolute
          />}

        </View>
        <View style={{ paddingBottom: '2%' }}>
          <Text style={{ alignSelf: 'center', fontSize: 20 }}>Avarage in past 6 months</Text>
          {grapData && <LineChart
            data={grapData}
            width={Dimensions.get("window").width} // from react-native
            height={250}
            //yAxisLabel="$"
            //yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            // bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
          />}
        </View>
      {loading && loading}
      </ScrollView>
    </SafeAreaView >
    </>
  )
}

const styles = StyleSheet.create({
containerView: {
  flex: 2
},
container: {
bottom:'1%'
},
})