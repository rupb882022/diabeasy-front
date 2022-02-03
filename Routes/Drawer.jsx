import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity,Text } from 'react-native';
import InsertData from '../Pages/InsertData'
import Home from '../Pages/Home'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import routs from './PageRoutes';


const Drawernav = createDrawerNavigator();


export default function Drawer() {

    //style of the drawer
    const Theme = {
        colors: {
            ...DefaultTheme.colors,
            background: 'transparent',
            primary: 'blue',
        },
    };

// will rander the drawer items
const pagesRouts=routs.map((x,i)=>
    {
        return(
    <Drawernav.Screen key={i} name={x.name} component={Home} 
    options={{
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            color: 'transparent',
        },

        //icon for each items
        drawerIcon: () => (x.icon)
    }} 
    />)} 
)

    return (
        <NavigationContainer theme={Theme}>
            <Drawernav.Navigator screenOptions={({ navigation }) => ({
                headerLeft: () => {
                    return (
                        <TouchableOpacity
                            onPress={() =>navigation.toggleDrawer()}>
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
                {pagesRouts}
            </Drawernav.Navigator>
        </NavigationContainer>
    );
}