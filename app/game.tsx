import QCM from "@/components/QCM";
import Timer from "@/components/Timer";
import { getGameQuestions } from "@/utils/firebaseUtils/manageGame";
import { router, useLocalSearchParams } from "expo-router";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { View,Text,ScrollView,Image } from "react-native";
import { SvgXml } from 'react-native-svg';
import {arrow} from '../assets/images/arrow';
import { finish } from "../assets/images/finish";
import Toast from 'react-native-root-toast';

export default function Game() {
    

    const gameKey = useLocalSearchParams().gameKey as string;
    const playerId = useLocalSearchParams().playerId as string;
    const playerIndex = useLocalSearchParams().playerIndex as string;

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const[elapsedTime, setElapsedTime] = useState(0);
    const[isFinished, setIsFinished] = useState(false);
    const [isWantAnswersFlag, setIsWantAnswersFlag] = useState('a');
    const [answersMap, setAnswersMap] = useState(new Map<string, Map<string,boolean>>());
    const [isWantSendAnswers, setIsWantSendAnswers] = useState(false);
    const [isNextRender, setIsNextRender] = useState(false);


    const gameRef = ref(getDatabase(), `games/${gameKey}`);
    const handleAnswers = (questionAnswers: Map<string, boolean>, currentQuestionIndex:number) => {
        var ind = currentQuestionIndex;
        if(!isFinished){
            ind = currentQuestionIndex - 1;
        }

        const newAnswersMap = new Map(answersMap);
        newAnswersMap.set((ind).toString(), questionAnswers); // -1 because the current question is already incremented
        setAnswersMap(newAnswersMap);
    
    }

    useEffect(() => {
        const db = getDatabase();
        const fetchQuestions = async () => {
            try {
                setQuestions(await getGameQuestions(gameKey, db));
            }
            catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
        
        const startTimeRef = ref(db, `games/${gameKey}/startTime`);
        get(startTimeRef).then((snapshot) => {
            // TODO: fix time resetting when reload, mouch haka bthbt ama log el aw9at taw tefhem
            setElapsedTime( elapsedTime + Math.round((Date.now() - snapshot.val())/1000));
        });

    }
    , []);

    useEffect(() => {
        if (isFinished){
            setIsWantAnswersFlag(isWantAnswersFlag + ' ');
            setIsWantSendAnswers(true);
        }
    }
    , [isFinished]);


    useEffect(() => {
        if (isWantSendAnswers) setIsNextRender(true);
    }, [isWantSendAnswers]);

    useEffect(() => {


        const convertMapToObject = (map: Map<string, Map<string, boolean>>): { [key: string]: { [key: string]: boolean } } => {
            const obj: { [key: string]: { [key: string]: boolean } } = {};
            map.forEach((value, key) => {
              obj[key] = Array.from(value.entries()).reduce<{ [key: string]: boolean }>((acc, [k, v]) => {
                acc[k] = v;
                return acc;
              }, {});
            });
            return obj;
          };
        if (isNextRender) {
            // this is two renders after game end
            // cuz when u update a state, its value gets updated in the next render
            const answersMapObj = convertMapToObject(answersMap);
            try {
                if (playerIndex === '1') {
                    set(child(gameRef, `answers/player1`), answersMapObj);
                }
                else if (playerIndex === '2') {
                    set(child(gameRef, `answers/player2`), answersMapObj);
                }
            }
            catch (error) {
                console.error(error);
            }

            router.replace(`/results?gameKey=${gameKey}&playerIndex=${playerIndex}&playerId=${playerId}`);
        }
        
    }, [isNextRender]);



    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
            if (elapsedTime <= 300) {
                setTimeLeft(300 - elapsedTime)
              }else{
                    setIsFinished(true);
              }
            ;
        }, 1000);
        return () => clearInterval(interval);
    }, [elapsedTime]);


    return (
      
            <ScrollView style={
            {
                backgroundColor: '#fff',
                flex: 1,
                padding: 20,
            }
        }>

            <View className="flex flex-row h-fit justify-around py-10">

                <View className="flex flex-column h-fit justify-center">
                    <Text style={{
                    fontSize: 18,
                    fontFamily: 'Pix',
                    color: '#3D72D1',
                }}>Quest.</Text>

                <Text style={{
                    fontSize: 15,
                    fontFamily: 'Pix',
                    color: '#3D72D1',
                }}>{currentQuestion + 1}/{questions.length}</Text>
                </View>
                
                <Timer timeLeft={timeLeft}></Timer>
            </View>
            {questions.length > 0 ? (
                <QCM handleAnswers={handleAnswers} isWantAnswersFlag={isWantAnswersFlag} questionIndex={currentQuestion} gameId={gameKey} question={questions[currentQuestion]} />
            ) : (
                <Text>Loading...
                    
                </Text>
            )}
            {
                // Show the arrow only if there are more questions
                currentQuestion < questions.length - 1 && 
                <SvgXml xml={arrow} width="100" height="100" className="mx-auto mb-10"
                onPress={() => {
                    setIsWantAnswersFlag(isWantAnswersFlag + ' ');
                    
                    setCurrentQuestion(currentQuestion + 1);
                }}
                /> || <SvgXml xml={finish} width="100" height="100" className="mx-auto mb-10" onPress={
                    () => {
                        //setIsFinished(true); // just to test why n 3 doesnt get sent
                        Toast.show('Wait till game ends.', {
                            duration: Toast.durations.LONG,
                          });
                    }
                }/>
            }
               
            
        </ScrollView>
        
        
        
    );
}