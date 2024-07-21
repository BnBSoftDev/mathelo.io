import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function Game() {
    const gameKey = useLocalSearchParams();
    console.log('game key ml game screen',gameKey);
    return (
        <View>
            
        </View>
        
    );
}