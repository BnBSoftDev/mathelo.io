import { View,Text } from "react-native";
import {getFact} from '@/utils/fetchRandomFact';
import {useState} from 'react';
import TypeWriterEffect from "react-native-typewriter-effect";
import { delay } from "@/utils/delay";


export default function TextFact() {
    const [fact1,setFact1] = useState('');
    const delaytime =1000;
    return (
        <View className="py-3 w-full h-1/5">
            <TypeWriterEffect content={fact1}
             minDelay={1}
             style={{
                fontSize: 20,
                textAlign: 'center',
                color: '#000000',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                margin: 20,
                marginTop: -50
             }}
             onTypingEnd={ () => {
               
                delay(delaytime).then(() => {
                    getFact().then((fact) => {
                        setFact1(fact);
                    });
                });
          
             }
               
                
            }/>
        </View>
    );
}