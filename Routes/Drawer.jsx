import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import InsertData from '../Pages/InsertData'
import Home from '../Pages/Home'
import CustomDrawer from './CustomDrawer'
import { Ionicons, Entypo, AntDesign, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import PanicButton from '../Pages/PanicButton';
import Forum from '../Pages/Forum/Forum';
import Maps from '../Pages/Maps';
import Setting from '../Pages/Setting'
import React from 'react';


const Drawernav = createDrawerNavigator();

export default function Drawer({route}) {

    //color of icons
    let color = "black"
    // const [userDetails, setUserDetails] = useState();
let userDetails= route.params.userDetails;
console.log("drrrrrr",userDetails);
    const options = {
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            color: 'transparent',
        },
    }
  
    return (
        <Drawernav.Navigator drawerContent={props => <CustomDrawer userDetails={userDetails?userDetails:''} {...props} />} screenOptions={({ navigation }) => ({
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
            <Drawernav.Screen name='Home' component={Home} initialParams={{ userDetails: userDetails }} options={{
                ...options,
                drawerIcon: () => (<Ionicons name="ios-home-outline" size={24} color={color} />)
            }} />
            <Drawernav.Screen name='Insert Data' component={InsertData}  options={{
                ...options,
                drawerIcon: () => (<Entypo name="add-to-list" size={24} color={color} />)
            }} />
            <Drawernav.Screen name='Forum' component={Forum} initialParams={{ userDetails: userDetails }} options={{
                ...options,
                drawerIcon: () => (<Ionicons name="chatbubbles-outline" size={24} color={color} />)
            }} />
            <Drawernav.Screen name='Sports location' component={Maps} options={{
                ...options,
                drawerIcon: () => (<Ionicons name="football-outline" size={24} color={color}  />)
            }} />
            <Drawernav.Screen name='Emergency Call' component={PanicButton} initialParams={{ userDetails: userDetails }} options={{
                ...options,
                drawerIcon: () => (<AntDesign name="exclamationcircleo" size={24} color={color} />)
            }} />
            <Drawernav.Screen name='Setting' component={Setting} options={{
                ...options,
                drawerIcon: () => (<Ionicons name="settings-outline" size={24} color={color} />)
            }} />
        </Drawernav.Navigator>
    );
}