import PlayBtn from "@/components/PlayBtn";
import UserName from "@/components/UserName";
import LogOrSign from "@/components/LogOrSign";
import { View } from "react-native";
import Logo from "@/components/Logo";
import Elo from "@/components/Elo";

export default function Index() {
  return (
    <View className="bg-w"
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems:'center',
      }}
    >
      <Logo/>
      <Elo/>
      <PlayBtn/>
      <UserName/>
    </View>
  );
}
