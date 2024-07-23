import React from 'react';
import { Text, View } from 'react-native';

export default function Elo() {
    return (
        <View style={{ width:'100%' , justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{
                fontFamily: 'Pix',
                fontSize: 20,
                color: '#000',
                textAlign: 'center',
                padding: 6,
                
                
                marginTop: 6,
                marginBottom: 6,
                marginHorizontal: 20,
            }}>
                Elo: 🐐🏆 1270
            </Text>
        </View>
    );
}
