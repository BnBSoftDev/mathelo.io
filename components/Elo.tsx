import { getEloListener } from '@/utils/firebaseUtils/manageUser';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function Elo() {
    const [elo, setElo] = React.useState(1000);
    
    useEffect(() => {
        getEloListener(setElo);
    }, []);

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
                Elo: 🐐🏆 {elo}
            </Text>
        </View>
    );
}
