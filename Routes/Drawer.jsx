import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import InsertData from '../Pages/InsertData'
import Home from '../Pages/Home'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import CustomDrawer from './CustomDrawer'
import { Ionicons, Entypo, AntDesign,MaterialCommunityIcons,MaterialIcons   } from '@expo/vector-icons';
import PanicButton from '../Pages/PanicButton';
import Forum from '../Pages/Forum/Forum';
import Maps from '../Pages/Maps';
import TabNav from './TabNav';

 
const Drawernav = createDrawerNavigator();

export default function Drawer() {
    //color of icons
    let color = "black"

    //style of the drawer
    const Theme = {
        colors: {
            ...DefaultTheme.colors,
            background: 'transparent',
            primary: '#ff650d',
        },
    };

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
        <NavigationContainer theme={Theme}>
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
                    drawerIcon: () => (<MaterialCommunityIcons  name="forum-outline" size={24} color={color} />)
                }} />
                <Drawernav.Screen name='Panic Button' component={PanicButton} options={{
                    ...options,
                    drawerIcon: () => (<AntDesign name="exclamationcircleo" size={24} color={color} />)
                }} />

                <Drawernav.Screen name='Sports location' component={Maps} options={{
                    ...options,
                    drawerIcon: () => (<MaterialIcons name="sports-tennis" size={24} color={color} />)
                }} />
                
            </Drawernav.Navigator>

        </NavigationContainer>
    );
}