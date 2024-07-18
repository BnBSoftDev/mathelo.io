import { View} from "react-native";
import TextFact from "@/components/TextFact";
import LoadingBar from "@/components/LoadingBar";
export default function LoadingGame() {
    
    return (
        <View style = {{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
        }}
        >
            <TextFact/>
            <LoadingBar/>
        </View>
        
    );
}