import { View} from "react-native";
import TextFact from "@/components/TextFact";
import LoadingBar from "@/components/LoadingBar";
export default function LoadingGame() {
    
    return (
        <View className="p-6">
            <TextFact/>
            <LoadingBar/>
        </View>
        
    );
}