import PlayBtn from "@/components/PlayBtn";
import UserName from "@/components/UserName";
import LogOrSign from "@/components/LogOrSign";
import { View } from "react-native";
import Logo from "@/components/Logo";
import Elo from "@/components/Elo";
import { Link } from 'expo-router';


export default function Home() {
  return (
    <View className="bg-w"
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems:'center',
        padding: 6
      }}
    >
      <Logo/>
      <Elo/>
      <PlayBtn/>
      <UserName/>
      <LogOrSign/>
    </View>
  );
}
