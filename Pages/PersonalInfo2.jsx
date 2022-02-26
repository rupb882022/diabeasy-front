import { View, StyleSheet, Text } from 'react-native';
import React,{useEffect,useState} from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import Loading from '../CTools/Loading';

export default function PersonalInfo2({ navigation }) {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setInterval(() => setLoading(false), 1500);
    },[])
    return (
        <View style={styles.container}>
                  {loading && <Loading opacity={'#ffffffff'} />}
            <Header
                title='Medical Info'
                possiton={-15}
                marginLeft={4}
                line={false}
            />
            <Input
                label='Weight'
                validtion='number'
                keyboardType='number-pad'
                placeholder='  kg' />
            <Input
                label='Height'
                validtion='number'
                keyboardType='number-pad'
                placeholder='  cm'
            />
            <Input
                label='Insulin Type'
            />

            <Input
                label='Boules Value' />
            <Input
                label='injection spot'
                editable={false}
                type='selectBox'
                SelectBox_placeholder='Select spot of injection'
                selectBox_items={[
                    { itemKey: 0, label: 'Arm', value: 'Arm' },
                    { itemKey: 1, label: 'Belly', value: 'Belly' },
                    { itemKey: 2, label: 'Leg', value: 'Leg' },
                ]} />

            <Input
                label='Emergency Contact Phone Number'
                validtion='number'
                keyboardType='number-pad'
                placeholder='+972' />

            <Input
                label='Add Your Doctor By Email'
                keyboardType='email-address' />


            {/* Register Page Button */}
            <View style={styles.Buttons}>
                <View style={styles.back}>
                    <Button
                        text="back"
                        width={12}
                        height={4}
                        justifyContent='center'
                        onPress={() => {setLoading(true); navigation.goBack()}}
                    />
                </View>
                <View style={styles.Register}>
                    <Text style={styles.txt}> 2/2</Text>
                    <Button
                        text="Register"
                        width={8}
                        height={4}
                        justifyContent='flex-start'
                        onPress={() =>{setLoading(true); navigation.navigate('Drawer')}}
                    />
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    Buttons: {
        flex: 1,
        flexDirection: 'row',
        bottom:'2%'
    },
    back: {
        flex: 1,
        alignItems: 'center',
      paddingBottom:'4%'
    },
    Register: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: '10%'
    },
    txt: {
        paddingRight: '3%',
        paddingBottom: '1%'
    },

});