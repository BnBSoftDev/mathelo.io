import { Text,View,Image } from "react-native";
import Elo from "../Elo";

export default function Draw({cls}: {cls: string}) {
    return (
       // a draw screen because no one won
       <View className={cls}>
       <Image 
       style={{
           width: 150,
           resizeMode: 'contain',
           marginBottom: -40,
       }}
       source={require("@/assets/images/tesla.png")}
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
           Its a draw! No one won this round.
       </Text>
       <Elo/>
</View>
    )
}