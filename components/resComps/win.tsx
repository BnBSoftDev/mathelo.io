import { View,Text,Image } from "react-native";
import Elo from "../Elo";
export default function Win(
    { cls }: { cls: string }
) {
    return (
        <View className={cls}>
                <Image 
                style={{
                    width: 200,
                    resizeMode: 'contain',
                }}
                source={require("@/assets/images/win.png")}
                />
                <Text style={{
                fontFamily: 'Pix',
                fontSize: 20,
                color: '#000',
                textAlign: 'center',
                padding: 6,
                
                
                marginTop: 6,
                marginBottom: 6,
                marginHorizontal: 20,
                }}>
                    +100 Elo points
                </Text>
                <Elo/>
        </View>
    )
}