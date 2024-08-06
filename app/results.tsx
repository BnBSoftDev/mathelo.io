import QCM from "@/components/QCM";
import Draw from "@/components/resComps/draw";
import Loss from "@/components/resComps/win";
import Win from "@/components/resComps/win";
import { getGameQuestions } from "@/utils/firebaseUtils/manageGame";
import { getElo, updateElo } from "@/utils/firebaseUtils/manageUser";
import { getWinner } from "@/utils/getWinner";
import { getDatabase, ref, get } from "@firebase/database";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { SvgUri } from "react-native-svg";


const tailwindCls = 'w-full h-fit flex-col items-center justify-center';

export default function Results() {
  const gameKey = useLocalSearchParams().gameKey as string;
  const playerId = useLocalSearchParams().playerId as string;
  const playerIndex = useLocalSearchParams().playerIndex as string;
  const [isLoading, setIsLoading] = useState(true);
  const [winner, setWinner] = useState(-1);
  const [questions, setQuestions] = useState([]);

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
  }, []);


  useEffect(() => {
    if (winner !== -1) {
      getElo().then((elo) => {
        if (winner.toString() === playerIndex) {
          updateElo(elo + 100);
        } else if (winner.toString() !== '0') {
          updateElo(elo - 90);
        }
      });
  } }
  , [winner]);

  useEffect(() => {
    const db = getDatabase();
    const fetchQuestions = async () => {
      try {
        setQuestions(await getGameQuestions(gameKey, db));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
  {winner.toString() === playerIndex ? (
    <Win cls={tailwindCls} />
  ) : winner.toString() === '0' ? (
    <Draw cls={tailwindCls} />
  ) : (
    <Loss cls={tailwindCls} />
  )}
  {questions.length > 0 &&
    questions.map((question, index) => (

      <View className='flex-col items-center justify-center' key={index}>
         <QCM
         correctionMode={true}
        key={index}
        question={question}
        isWantAnswersFlag='a'
        disabled={true}
          />
          <Text className='text-xl my-5' style={{
            fontFamily: 'Pix',
            color: '#3D72D1',
          }}>Explanation:</Text>
          <SvgUri className="w-full"
                width={'100%'}
                uri={`https://latex.codecogs.com/svg.zebi?\\textbf{${question['explanation']}}`}
          />
          
      </View>

    ))}
</>

      )}
    </ScrollView>
    </SafeAreaView>

    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 5,
    
  },
  scrollView: {
    paddingHorizontal: 2,
    
  },
  text: {
    fontSize: 42,
  },
});
