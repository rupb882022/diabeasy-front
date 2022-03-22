import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text } from 'react-native';
import InsertData from '../Pages/InsertData'
import Home from '../Pages/Home'
import FoodLibrary from '../Pages/Food/FoodLibrary'
import CustomDrawer from './CustomDrawer'
import { Ionicons, Entypo, AntDesign, Fontisto } from '@expo/vector-icons';
import PanicButton from '../Pages/PanicButton';
import Forum from '../Pages/Forum/Forum';
import Maps from '../Pages/Maps';
import Setting from '../Pages/Setting'
import React,{useContext} from 'react';
import Footer from './Footer';
import Prescriptions from '../Pages/Prescriptions';
import DoctorHome from '../Pages/Doctor/DoctorHome';
import LogOut from '../Pages/LogOut';
import { UserContext } from '../CTools/UserDetailsHook'

const Drawernav = createDrawerNavigator();


export default function Drawer(props) {

    const { navigation } = props
    const {userDetails} = useContext(UserContext);

    let usertype=userDetails&&userDetails.id%2==0?'doctor':'Patients';

    //color of icons
    let color = "black"

    const options = {
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            color: 'transparent',
        },
    }

  if(usertype=='doctor'){ 
    return (<>
        <Drawernav.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={({ navigation }) => ({
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        onPress={() => navigation.toggleDrawer()}>
                        <Ionicons name="ios-menu"
                            size={75}
                            style={{
                                height: 70,
                                marginTop: '35%',
                                marginLeft: '15%',
                                color: '#1ea6d6'
                            }}
                        />
                    </TouchableOpacity>
                )
            }
        })}>

            {/* list of items in the drawer */}
            <Drawernav.Screen name='DoctorHome' component={DoctorHome} options={{
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
            {/* <Drawernav.Screen name='Setting' component={Setting} options={{
                ...options,
                drawerIcon: () => (<Ionicons name="settings-outline" size={24} color={color} />)
            }} /> */}
        <Drawernav.Screen name='Log Out' component={LogOut} options={{
                ...options,
                drawerIcon: () => (<AntDesign name="logout" size={24} color={color} />)
            }} />

        </Drawernav.Navigator>
        <Footer
            navigation={navigation}
        />
    </>
    );
}else{
    return (<>
        <Drawernav.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={({ navigation }) => ({
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        onPress={() => navigation.toggleDrawer()}>
                        <Ionicons name="ios-menu"
                            size={75}
                            style={{
                                height: 70,
                                marginTop: '35%',
                                marginLeft: '15%',
                                color: '#1ea6d6'
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
            <Drawernav.Screen name='Insert Data' component={InsertData} options={{
                ...options,
                drawerIcon: () => (<Entypo name="add-to-list" size={24} color={color} />)
            }} />
            <Drawernav.Screen name='Forum' component={Forum} options={{
                ...options,
                drawerIcon: () => (<Ionicons name="chatbubbles-outline" size={24} color={color} />)
            }} />
            <Drawernav.Screen name='Sports Location' component={Maps} options={{
                ...options,
                drawerIcon: () => (<Ionicons name="football-outline" size={24} color={color} />)
            }} />
            {/* <Drawernav.Screen name='Recipes' component={FoodLibrary} options={{
                ...options,
                drawerIcon: () => (<Fontisto name="prescription" size={24} color={color} />)
            }} /> */}
            <Drawernav.Screen name='Food' component={FoodLibrary} options={{
                ...options,
                drawerIcon: () => (<Ionicons name="fast-food-outline" size={24} color={color} /> )
            }} />
                   <Drawernav.Screen name='Prescriptions' component={Prescriptions} options={{
                ...options,
                drawerIcon: () => (<AntDesign name="medicinebox" size={24} color={color} />)
            }} />
            <Drawernav.Screen name='Emergency Call' component={PanicButton} options={{
                ...options,
                drawerIcon: () => (<AntDesign name="exclamationcircleo" size={24} color={color} />)
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
        <Footer
            navigation={navigation}
        />
    </>
    );
}
}