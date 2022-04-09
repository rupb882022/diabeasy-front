import { StyleSheet, SafeAreaView, Text, Dimensions, View, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit'
import Header from '../CTools/Header'
import { Get_graphs_details } from '../Functions/Function'
import Alert from '../CTools/Alert';
import Loading from '../CTools/Loading';
import { UserContext } from '../CTools/UserDetailsHook'
import Input from '../CTools/Input'
import { useFocusEffect } from '@react-navigation/native';


export default function PatientData() {
  const { userDetails } = useContext(UserContext);
  const [pieInfo, setPieInfo] = useState();
  const [pieInfoMonth, setPieInfoMonth] = useState();
  const [monthList, setMonthList] = useState();
  const [month, setMonth] = useState()
  const [alert, setAlert] = useState();
  const [loading, setLoading] = useState(false);
  const [grapData, setGrapData] = useState();
  const [a1c, setA1c] = useState(7.3)


  //todo if there is not enough data of patient
  const ParsetoMonthName = (monthNumber, format) => {
    const date = new Date();
    if (monthNumber == 30) {
      return "last 30 days"
    }
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
      month: format,
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      if (userDetails.patientID) {        // if its doctor with selected patient
        get_graphs_details(userDetails.patientID)
      }
      else if (userDetails.id % 2 != 0) {  // if its patient (=> not a doctor without selected patient)
        get_graphs_details(userDetails.id)
      }
      else if (!userDetails.patientID && userDetails.id % 2 == 0) {
        setPieInfo();
        setGrapData();
        setPieInfoMonth();
      }
    }, [userDetails]))

  const get_graphs_details = (id) => {
    setLoading(true)
    Get_graphs_details(id).then((result) => {
      let List = []; let data = []; let labels = []; let dataPie = [];
      result.map(x => {
        //array for graph
        if (x.month != 30) {
          data.push(x.averge);
          labels.push(ParsetoMonthName(x.month, 'short'));
        }
        //list for select box
        List.push({ itemKey: x.month, label: ParsetoMonthName(x.month, 'long'), value: x.month });

        //array for pie
        dataPie.push({
          'month': x.month,
          values: [{
            name: "[>240]",
            amount: Number(x.upTo240),
            color: "#0838BC",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "[180-240]",
            amount: Number(x.upTo180),
            color: "#087AD1",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "[75-180]",
            amount: Number(x.upTo75),
            color: "#02C491",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "[60-74]",
            amount: Number(x.upTo60),
            color: "#FFB300",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          },
          {
            name: "[<60]",
            amount: Number(x.upTo0),
            color: "#FF3730",
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
      setLoading(false)
    },
      (error) => {
        console.log("error in function Get_graphs_details", error)
        setAlert(
          <Alert text="sorry, somthing went wrong, please try again later"
            type='worng'
            time={2000}
            bottom={110}
          />);
        setLoading(false)
      })
  }

  let chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 1, // optional, defaults to 2dp
    color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
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
    if (pieInfo) {
      let temp
      if (!month) {
        temp = pieInfo.find(x => x.month == 30);
      } else {
        temp = pieInfo.find(x => x.month == month);
      }
      temp && setPieInfoMonth(temp.values)
    }
  }, [month, pieInfo])




  return (
    <>
      {loading && <Loading opacity={'#d6f2fc'} />}
      <Header
        title='Graphs'
        flex={0.35}
        possiton={62}
        paddingRight={5}
      />
      <View style={{ flex: 0.08, flexDirection: 'column', position: 'relative', bottom: '5%', right: '28%' }}>
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
          selectBox_items={monthList ? monthList : []}
        />
      </View>
      {/* TO DO -function from serverside for set A1C parameter  */}
      <Text style={{ alignSelf: 'flex-end', paddingBottom: '4%', fontSize: 20, fontWeight: 'bold', position: 'absolute', top: '10%' }}>Estimated A1C : {a1c}% </Text>


      <SafeAreaView style={styles.containerView}>
        <ScrollView style={styles.container}>


          <Text style={styles.secoundTitle}> Sugar value segmentation </Text>


          <View>
            {pieInfoMonth && <PieChart
              data={pieInfoMonth}
              width={Dimensions.get("window").width}
              height={230}
              chartConfig={chartConfig}
              accessor={"amount"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
            />}

          </View>
          <View style={{ paddingBottom: '2%' }}>
            <Text style={styles.secoundTitle}>Avarage in past 6 months</Text>
            {grapData && <LineChart
              data={grapData}
              width={Dimensions.get("window").width} // from react-native
              height={250}
              //yAxisLabel="$"
              //yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={chartConfig}
              // bezier
              style={{ marginVertical: 8, borderRadius: 10, margin: 5 }}
            />}
          </View>
          {alert && alert}
        </ScrollView>
      </SafeAreaView >
    </>
  )
}

const styles = StyleSheet.create({
  containerView: {
    flex: 2,
  },
  container: {
    bottom: '1%'
  },
  secoundTitle: {
    textShadowColor: 'gray',

    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    alignSelf: 'center',
    fontSize: 22,
    paddingBottom: '3%'
  }
})