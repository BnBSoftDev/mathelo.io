import { View,Text } from "react-native";
import {getFact} from '@/utils/fetchRandomFact';
import {useEffect,useState} from 'react';
import TypeWriterEffect from "react-native-typewriter-effect";
import { delay } from "@/utils/delay";


export default function TextFact() {
    const [fact1,setFact1] = useState('');
    useEffect(() => {
        getFact().then((data) => {
            setFact1(data);
        });
    },[]);
   
    

    return (
        <View className="py-3 w-full">
            <TypeWriterEffect content={fact1}
             minDelay={1}
             style={{
                fontSize: 20,
                textAlign: 'center',
                color: '#000000',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                marginBottom: 10
             }}
             onTypingEnd={ () =>
                getFact().then((data) => {


                delay(1000).then(() => {setFact1(data);});    
                    
                
                }
            )
            }/>
        </View>
    );
}