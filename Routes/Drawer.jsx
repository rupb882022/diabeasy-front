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
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{ useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';


const Drawernav = createDrawerNavigator();

export default function Drawer() {
    //color of icons
    let color = "black"
    const [userDetails, setUserDetails] = useState();

    //get user details from storge
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userDetails')
             jsonValue != null ? setUserDetails(JSON.parse(jsonValue)) : null;
        } catch (e) {
            console.log(e)
        }
    }

    const options = {
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            color: 'transparent',
        },
    }

  // get user details after log in (it is not useEffect for case when user will log out to switch to diffrent account) TODO check log o
  useFocusEffect(
    React.useCallback(() => {
      getData();
    },[])
  );
  
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
                drawerIcon: () => (<MaterialCommunityIcons name="forum-outline" size={24} color={color} />)
            }} />
            <Drawernav.Screen name='Sports location' component={Maps} options={{
                ...options,
                drawerIcon: () => (<MaterialIcons name="sports-tennis" size={24} color={color} />)
            }} />
            <Drawernav.Screen name='Emergency Call' component={PanicButton} options={{
                ...options,
                drawerIcon: () => (<AntDesign name="exclamationcircleo" size={24} color={color} />)
            }} />
            <Drawernav.Screen name='Setting' component={Setting} options={{
                ...options,
                drawerIcon: () => (<SimpleLineIcons name="settings" size={24} color={color} />)
            }} />
        </Drawernav.Navigator>
    );
}