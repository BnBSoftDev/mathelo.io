import { View,Text } from "react-native";
import {getFact} from '@/utils/fetchRandomFact';
import {useEffect,useState} from 'react';

export default function TextFact() {
    const [fact1,setFact1] = useState('');
    const [fact2,setFact2] = useState('');
    useEffect(() => {
        getFact().then((data) => {
            setFact1(data);
        });
    },[]);
    useEffect(() => {
        getFact().then((data) => {
            setFact2(data);
        });
    },[]);
    return (
        <View className="py-3 w-full">
            <Text className="text-bold text-base my-3 text-blue-800">{fact1}</Text>
            <Text className="text-bold text-base text-blue-800">{fact2}</Text>
        </View>
    );
}