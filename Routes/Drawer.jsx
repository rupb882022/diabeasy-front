import { createDrawerNavigator } from '@react-navigation/drawer';




import { TouchableOpacity, Text } from 'react-native';
import InsertData from '../Pages/InsertData'
import Home from '../Pages/Home'
import FoodLibrary from '../Pages/Food/FoodLibrary'
import CustomDrawer from './CustomDrawer'
import { Ionicons, Entypo, AntDesign, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import PanicButton from '../Pages/PanicButton';
import Forum from '../Pages/Forum/Forum';
import Maps from '../Pages/Maps';
import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useState, useRef } from 'react';
import Footer from './Footer';
import Prescriptions from '../Pages/Prescriptions';
import DoctorHome from '../Pages/Doctor/DoctorHome';
import LogOut from '../Pages/LogOut';
import { UserContext } from '../CTools/UserDetailsHook'
import PatientData from '../Pages/PatientData';
import PatientDataTable from '../Pages/DataTables/PatientDataTable';
import Loading from '../CTools/Loading';
import InjectionType from '../Pages/Recommandtion/InjectionType';
import Information from '../CTools/Information';
import Setting from '../Pages/Setting';
import Recommandation from '../Pages/Recommandtion/Recommandation';

const Drawernav = createDrawerNavigator();





export default function Drawer(props) {
    const { navigation } = props
    const { userDetails } = useContext(UserContext);

    let usertype = userDetails && userDetails.id % 2 == 0 ? 'doctor' : 'Patients';



    //color of icons
    let color = "black"
    let backgroundColor = '#00a6a64a'
    const options = {
        headerStyle: {
            backgroundColor: 'transparent',
            // backgroundColor:backgroundColor
            // height:'10%'
       
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            color: 'transparent',
        },
    }




    if (usertype == 'doctor') {
        return (<>
            <Information
                backgroundColor={backgroundColor}
                navigation={navigation}
            />
            <Drawernav.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={({ navigation }) => ({
                headerLeft: () => {
                    return (
                        <TouchableOpacity
                            //style={{ backgroundColor: backgroundColor }}
                            onPress={() => { navigation.toggleDrawer(); }}>
                            <Ionicons name="ios-menu"
                                  size={48}
                                  style={{
                                      height: 55,
                                      zIndex: 100,
                                      position: 'relative',
                                      top: '50%',
                                      // marginTop: '35%',
                                      marginLeft: '16%',
                                      color: 'white',
                                      // backgroundColor:backgroundColor
                                  }}
                            />
                        </TouchableOpacity>
                    )
                }
            })}>

                {/* list of items in the drawer */}
                <Drawernav.Screen name='Home' component={DoctorHome} options={{
                    ...options,
                    drawerIcon: () => (<Ionicons name="ios-home-outline" size={24} color={color} />)
                }} />
                <Drawernav.Screen name='Forum' component={Forum} options={{
                    ...options,
                    drawerIcon: () => (<Ionicons name="chatbubbles-outline" size={24} color={color} />)
                }} />
                <Drawernav.Screen name='Prescriptions' component={Prescriptions} options={{
                    ...options,
                    drawerIcon: () => (<AntDesign name="medicinebox" size={24} color={color} />)
                }} />
                <Drawernav.Screen name='Repotrs - Graphs' component={PatientData} options={{
                    ...options,
                    drawerIcon: () => (<AntDesign name="linechart" size={24} color="black" />)
                }} />
                <Drawernav.Screen name='Repotrs - Table' component={PatientDataTable} options={{
                    ...options,
                    drawerIcon: () => (<MaterialCommunityIcons name="table-plus" size={24} color="black" />)
                }} />

                {/* <Drawernav.Screen name='Setting' component={Setting} options={{
                ...options,
                drawerIcon: () => (<Ionicons name="settings-outline" size={24} color={color} />)
            }} /> */}
                <Drawernav.Screen name='Log Out' component={LogOut} options={{
                    ...options,
                    drawerIcon: () => (<AntDesign name="logout" size={24} color={color} />)
                }} />

            </Drawernav.Navigator>
            {/* <Footer
            navigation={navigation}
        /> */}
        </>
        );
    } else {
        return (<>
            <Information
                navigation={navigation}
                backgroundColor={backgroundColor}
            />
            <Drawernav.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={({ navigation }) => ({
                headerLeft: () => {
                    return (
                        <TouchableOpacity
                            // style={{ backgroundColor: backgroundColor }}
                            onPress={() => { navigation.toggleDrawer(); }}>
                            <Ionicons name="ios-menu"
                                size={48}
                                style={{
                                    height: 55,
                                    zIndex: 100,
                                    position: 'relative',
                                    top: '50%',
                                    // marginTop: '35%',
                                    marginLeft: '16%',
                                    color: 'white',
                                    // backgroundColor:backgroundColor
                                }}
                            />
                        </TouchableOpacity>
                    )
                }
            })}>

                {/* list of items in the drawer */}
                <Drawernav.Screen name='Home' component={Home} options={{
                    ...options,
                    drawerIcon: () => (<Ionicons name="ios-home-outline" size={24} color={color} />)
                }} />
                <Drawernav.Screen name='Recommandtion' component={InjectionType} options={{
                    ...options,
                    drawerIcon: () => (<Fontisto name="injection-syringe" size={24} color={color} />)
                }} />
                <Drawernav.Screen name='Forum' component={Forum} options={{
                    ...options,
                    drawerIcon: () => (<Ionicons name="chatbubbles-outline" size={24} color={color} />)
                }} />

                <Drawernav.Screen name='Food' component={FoodLibrary} options={{
                    ...options,
                    drawerIcon: () => (<Ionicons name="fast-food-outline" size={24} color={color} />)
                }}

                />
                <Drawernav.Screen name='Prescriptions' component={Prescriptions} options={{
                    ...options,
                    drawerIcon: () => (<AntDesign name="medicinebox" size={24} color={color} />)
                }} />
                <Drawernav.Screen name='Repotrs - Graphs' component={PatientData} options={{
                    ...options,
                    drawerIcon: () => (<AntDesign name="linechart" size={24} color="black" />)
                }} />
                <Drawernav.Screen name='Repotrs - Table' component={PatientDataTable} options={{
                    ...options,
                    drawerIcon: () => (<MaterialCommunityIcons name="table-plus" size={24} color="black" />)
                }} />
                <Drawernav.Screen name='Sports Location' component={Maps} options={{
                    ...options,
                    drawerIcon: () => (<Ionicons name="football-outline" size={24} color={color} />)
                }} />
                <Drawernav.Screen name='Emergency Call' component={PanicButton} options={{
                    ...options,
                    drawerIcon: () => (<AntDesign name="exclamationcircleo" size={24} color={color} />)
                }} />



                <Drawernav.Screen name='Setting' component={Setting} options={{
                    ...options,
                    drawerIcon: () => (<Ionicons name="settings-outline" size={24} color={color} />)
                }} />

                <Drawernav.Screen name='Log Out' component={LogOut} options={{
                    ...options,
                    drawerIcon: () => (<AntDesign name="logout" size={24} color={color} />)
                }} />
                {/* <Drawernav.Screen name='Loading' component={Loading} options={{
                    ...options,
                    drawerIcon: () => (<AntDesign name="logout" size={24} color={color} />)
                }} /> */}
                <Drawernav.Screen name='Insert Data' component={InsertData} options={{
                    ...options,
                    drawerIcon: () => (<Entypo name="add-to-list" size={24} color='white' />)
                }} />
                <Drawernav.Screen name='Recommandation' component={Recommandation} options={{
                    ...options,
                    drawerIcon: () => (<Fontisto name="injection-syringe" size={24} color={color} />)
                }} />
            </Drawernav.Navigator>

            <Footer
                navigation={navigation}
            />
        </>
        );
    }
}