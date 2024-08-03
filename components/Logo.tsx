import { View,Image } from "react-native";

export default function Logo() {
  return (
    <View className="w-full h-20"
      style={{
        marginTop: 50,
        alignItems:'center',
      }}
    >
      <Image 
        style={{
          width: 230,
          height: 40,
          resizeMode: 'contain',
    
        
        }}
        source={require("@/assets/images/logo.png")}
      />
    </View>
  );
}