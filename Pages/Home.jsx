import { View, Text, StyleSheet, Image } from 'react-native';
import React,{useEffect,useState} from 'react';
import Button from '../CTools/Button';
import Header from '../CTools/Header';
import Loading from '../CTools/Loading';



export default function Home({ navigation }) {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setInterval(() => setLoading(false), 1500);
    },[])


    return (
        <View style={styles.container}>
               {loading && <Loading opacity={'#d6f2fc'} />}
            <Header
                title='Home'
                logo_image='heart'
                flex={0.4}
                image_width={100}
                image_heigt={50}
                paddingRight={9}
                possiton={68}
                image_margin={{Bottom:5}}
            />
   
            <Button
                text='Insert Data'
                justifyContent='flex-end'
                radius={1000}
                width={10}
                height={24}
                textSize={30}
                alignItems='center'
                onPress={() => navigation.navigate('Insert Data')}
            />

            {/* user name */}
            <Text style={styles.textHello}>Hello Itzik</Text>
            <Image
                style={styles.Image}
                source={require('../images/home_img.webp.png')}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    textHello: {
        color: '#1ea6d6',
        alignSelf: 'flex-start',
        fontSize: 32,
        paddingLeft: '5%',
        paddingBottom: '5%',
        paddingTop: '15%',
        fontWeight: 'bold',
        textShadowColor: 'white',
        textShadowOffset: {width:2,height:2},
        textShadowRadius: 3
    },
    Image: {
        height: '25%',
        resizeMode: 'cover',
        width: '40%',
        alignSelf: 'flex-end',
        opacity: 0.95
    }
});