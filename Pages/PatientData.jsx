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
  const [a1c, setA1c] = useState()
  const [histogram, setHistogram] = useState();
  const [histogramList, setHistogramList] = useState();

  //todo if there is not enough data of patient
  const ParsetoMonthName = (monthNumber, format) => {
    const date = new Date();
    if (monthNumber == 30 || monthNumber == 0) {
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
        setAlert(
          <Alert text="Need to choose patient to watch his Graphs"
            type='worng'
            time={5000}
            bottom={400}
          />)
      }
    }, [userDetails]))

  const get_graphs_details = (id) => {
    setLoading(true)
    Get_graphs_details(id).then((result) => {

      let lineChar = { labels: [], data: [] }; let List = []; let dataPie = []; let houersAve = [];
      result.data.map(x => {
        //array for graph
        if (x.month != 30) {
          lineChar.data.push(x.averge);
          lineChar.labels.push(ParsetoMonthName(x.month, 'short'));
        }
        //list for select box
        List.push({ itemKey: x.month, label: ParsetoMonthName(x.month, 'long'), value: x.month });


        let labels = [];
        let data = []
        if (x.H8 != 0) {
          labels.push("Morning");
          data.push(x.H8)
        }
        if (x.H14 != 0) {
          labels.push("Afternoon");
          data.push(x.H14)
        }
        if (x.H20 != 0) {
          labels.push("Evening");
          data.push(x.H20)
        }
        if (x.H0 != 0) {
          labels.push("Night");
          data.push(x.H0)
        }

      
        //array for Histogram
        houersAve.push({
          "data": data,
          "labels": labels,
          'month': x.month
        }
        )


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
      setHistogramList(houersAve)
      setMonthList(List)
      setPieInfo(dataPie)
      setMonth(30)
      setGrapData({
        labels: lineChar.labels,
        datasets: [{ data: lineChar.data }]
      })
      result.a1c && setA1c(result.a1c);
      setLoading(false)


    },
      (error) => {
        console.log("error in function Get_graphs_details", error)
        setAlert(
          <Alert text="sorry, something went wrong, please try again later"
            type='worng'
            time={2000}
            bottom={110}
          />);
        setLoading(false)
      })
  }
  let chartConfig = {
    // backgroundColor: "#e26a00",
    backgroundGradientFrom: "#1ea6d60f",//ffffffa8//dffdff63
    backgroundGradientTo: "#dffdff63",//ffa726
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 20
      
    },
    propsForDots: {
      r: "3",
      strokeWidth: "2",
      // stroke: "#ffa726"
    }
  }

  useEffect(() => {
    if (pieInfo) {
      let temp
      if (!month) {
        temp = pieInfo.find(x => x.month == 30);
      }
      else {
        temp = pieInfo.find(x => x.month == month);
      }
      temp && setPieInfoMonth(temp.values)
    }
  }, [month, pieInfo])



  useEffect(() => {
    if (histogramList) {
      let histogramMonth = {};
      let temp;
      if (!month || month == 30) {
        histogramMonth = histogramList.find(x => x.month == 30);

        temp = {
          labels: histogramMonth.labels,
          datasets: [{ data: histogramMonth.data }]
        }
      }
      else {
        histogramMonth = histogramList.find(x => x.month == month);
        temp = {
          labels: histogramMonth.labels,
          datasets: [{ data: histogramMonth.data }]
        }
      }
      histogramMonth && setHistogram(temp)
    }
  }, [month, histogramList])

  return (
    <>
      {loading && <Loading opacity={'#d6f2fc'} />}
      <Header
        title='Graphs'
        flex={0.25}
        possiton={30}
        paddingRight={5}
      />
      <View style={{ flex: 0.08, flexDirection: 'column', position: 'relative', bottom: '3%', right: '28%' }}>
        <Input
          placeholder='Month'
          // placeholder='last 30 days'
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

      <Text style={{ alignSelf: 'flex-end', paddingBottom: '4%', fontSize: 18, position: 'absolute', top: '8.5%', right: '5%' }}>Estimated A1C : {a1c && a1c.toFixed(1)}% </Text>


      <SafeAreaView style={styles.containerView}>
        <ScrollView style={styles.container}>
          {histogram && histogram.labels &&
              <><Text style={styles.secoundTitle}>day averge at {month ? ParsetoMonthName(month, 'short') : 'the last 30 days'}</Text>
                <LineChart
                bezier
                segments={5}
                showValuesOnTopOfBars={true}
                  style={{  borderRadius: 15, margin: 5 }}
                  data={histogram}
                  width={Dimensions.get("window").width-5}
                  height={250}
                  fromZero={true}
                  chartConfig={chartConfig}
                // verticalLabelRotation={10}
                /></>
            }


          {pieInfoMonth && <Text style={styles.secoundTitle}>{month ? ParsetoMonthName(month, 'short') : 'last 30 days'} values segmentation </Text>}


          <View style={{ backgroundColor: '#ffffffa8', marginHorizontal: '2%', borderRadius: 16 }}>
            {pieInfoMonth && <PieChart
              data={pieInfoMonth}
              width={Dimensions.get("window").width-10}
              height={230}
              chartConfig={chartConfig}
              accessor={"amount"}
              backgroundColor={"transparent"}
              paddingLeft={"7"}
            />}

          </View>
          <View style={{ paddingTop: '2%' }}>
            {grapData && grapData.labels.length >= 2 && <><Text style={styles.secoundTitle}>Average in the last {grapData.labels.length} months</Text>
              <BarChart
                data={grapData}
                width={Dimensions.get("window").width-10} // from react-native
                height={250}
                segments={6}
                //yAxisLabel="$"
                //yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                // bezier
                fromZero={true}
                style={{ bottom:'2%', borderRadius: 10, margin: 5 }}
              /></>}


          </View>
        </ScrollView>
      </SafeAreaView >
      {alert && alert}
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
    // backgroundColor:'#00a6a64a',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    alignSelf: 'center',
    fontSize: 22,
    paddingBottom: '2%'
  }
})