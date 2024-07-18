import { View } from "react-native";
import { findOrCreateGame } from "@/utils/firebaseUtils/findOrCreateGame";
import { useEffect } from "react";
import * as Progress from 'react-native-progress'; //try to fix it , ie import /Bar directamente

export default function LoadingBar() {
    useEffect(() => {
        findOrCreateGame();
    }, [])
 
    return (
        <View style={{
            width: '100%',
            alignItems: 'center'
        }}>
            <Progress.Bar progress={0.3} width={200} indeterminate/>

        </View>
    )
}