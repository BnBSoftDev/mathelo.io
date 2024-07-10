import { View,Image } from "react-native";

export default function Logo() {
  return (
    <View className="w-full h-20"
      style={{
        marginTop: 50,
        alignItems:'center',
      }}
    >
      <Image className="object-scale-down"
        style={{
          width: 230,
          height: 40,
    
        
        }}
        source={require("@/assets/images/logo.png")}
      />
    </View>
  );
}