import { View, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { Get_doctor_patients } from '../../Functions/Function'
import Header from '../../CTools/Header';
import Loading from '../../CTools/Loading';
import { UserContext } from '../../CTools/UserDetailsHook'
import CreatePatientForDoctor from './CreatePatientForDoctor';


export default function DoctorHome(props) {
    const { userDetails, setUserDetails } = useContext(UserContext);
    //const [click,setClick]=useState(false)
    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState([])
    const [element, setElement] = useState()

    useEffect(() => {
        setLoading(true);
        Get_doctor_patients(userDetails.id).then((result) => {
            setPatients(result)
        },
            (error) => {
                console.log("error in function Get_doctor_patients", error)
                loading&&setInterval(() => setLoading(false), 1200);
            })
    }, [])

    useEffect(() => {
        loading&&setInterval(() => setLoading(false), 1200);
    },[patients])



    useEffect(() => {
        let element = patients.map((p, i) =>
            <CreatePatientForDoctor
                key={i}
                p={p}
                whileClick={whileClick}
            />)
        setElement(element)
    }
        , [patients])


    const whileClick = (id, name) => {
        let select = false;
        //select is present the x.select- it will handel with  patientID(true/false)
        let arr = patients.map(x => {
            if (x.id != id) {
                x.select = false
            }
            else {
                x.select = !x.select; select = x.select
            }
            return x
        })
        //console.log('arr',arr);
        setPatients(arr)
        let temp = select ? Object.assign({}, userDetails, { patientID: id, patientNAME: name }) : Object.assign({}, userDetails, { patientID: null, patientNAME: null })// patient id already added to userdetails by press on patient circle
        setUserDetails(temp);
    }






    return (
        <View style={styles.container}>
            <Header
                title='Home'
                logo_image='heart'
                flex={0.2}
                image_width={50}
                image_heigt={50}
                paddingRight={9}
                possiton={50}
                image_margin={{ Bottom: 5 }}
            />

            <ScrollView style={{ flex: 0.1 }} >
                <View style={styles.viewContainer}>
                    {element && element}
                </View>
            </ScrollView>
            {loading && <Loading />}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //    alignItems:'flex-start'
    },
    viewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        //flex: 1,
    },

    // imageGreen: {
    //   width: 78,
    //   height: 80,
    //   borderRadius: 1000,
    //   //alignSelf: 'flex-start',
    //    marginTop: '10%',
    //   //padding:'5%',
    //   marginLeft:'5%',
    //   borderColor: "#0BFF5C",
    //   borderWidth: 6
    // },
})

