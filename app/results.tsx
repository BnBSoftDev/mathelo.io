import Draw from "@/components/resComps/draw";
import Loss from "@/components/resComps/loss";
import Win from "@/components/resComps/win";
import { getWinner } from "@/utils/getWinner";
import { getDatabase,ref,get } from "@firebase/database";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

const tailwindCls = 'w-full h-fit flex-col items-center justify-center';

export default function Results() {
    const gameKey = useLocalSearchParams().gameKey as string;
    const playerId = useLocalSearchParams().playerId as string;
    const playerIndex = useLocalSearchParams().playerIndex as string;
    const [isLoading, setIsLoading] = useState(true);
    const [winner, setWinner] = useState(0);

    useEffect(() => {
        const db = getDatabase();
        const gameRef = ref(db, `games/${gameKey}`);
        get(gameRef).then((snap) => {
            const gameData = snap.val();
            const winner = getWinner(gameData.answers, gameData.questions);
            setIsLoading(false);
            setWinner(winner);
            console.log('winner:', winner); 
            //add winner to game in firebase
        });
    }
    , []);

    return (
        <View className='flex-1 justify-center flex-row items-start p-10'
        >
          {
            isLoading ? (
              <Text>Loading...</Text>
            ) : (
                winner.toString() == playerIndex ? (
                    <Win cls={tailwindCls}/>
                    ) :
                     (
                        winner.toString() == '0' ? (
                            <Draw />
                        ) : (
                            <Loss cls={tailwindCls}/>
                        )
                    )
            )
          }
        </View>
      );
}