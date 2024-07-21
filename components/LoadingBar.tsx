import { View, Text } from "react-native";
import { Link, router } from 'expo-router';
import { findOrCreateGame } from "@/utils/firebaseUtils/findOrCreateGame";
import { useEffect, useState } from "react";
import * as Progress from 'react-native-progress'; // try to fix it, i.e., import /Bar directly

export default function LoadingBar() {
    const [gameKey, setGameKey] = useState('');

    useEffect(() => {
        async function fetchGameKey() {
            try {
                const key = await findOrCreateGame();
                setGameKey(key as string);
            } catch (error) {
                console.error("Error fetching game key:", error);
            } 
        }

        fetchGameKey();
    }, []);


    useEffect(() => {
        if (gameKey) {
            router.replace('/game?gameKey=' + gameKey);
        }
    }, [gameKey]);


    return (
        <View style={{
            width: '100%',
            alignItems: 'center'
        }}>
            <Progress.Bar indeterminate={true} width={200} />
        </View>
    )
}