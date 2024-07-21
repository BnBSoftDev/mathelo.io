import { useLocalSearchParams } from "expo-router";
import { View,Text } from "react-native";

export default function Game() {
    const gameKey = useLocalSearchParams();
    return (
        <View>
            <Text style={{ fontFamily: 'Pixelify_Sans' }}>Inter Black.</Text>
        </View>
        
    );
}