import { View } from "react-native";
import { findOrCreateGame } from "@/utils/firebaseUtils/findOrCreateGame";
import { useEffect } from "react";

export default function LoadingBar() {
    useEffect(() => {
        findOrCreateGame();
    }, [])
 
    return (
        <View></View>
    )
}