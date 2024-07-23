import React from 'react';
import {Text, View} from 'react-native';

export default function LogOrSign() {
    return (
        <View className='w-full px-5'>
            <Text className='text-right mr-7' style={{
                fontFamily: 'Pix',
                fontSize: 10,
                color: '#000'
            }}>LogIn | SignUp</Text>
        </View>
    );
}