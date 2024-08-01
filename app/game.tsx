import QCM from "@/components/QCM";
import Timer from "@/components/Timer";
import { getGameQuestions } from "@/utils/firebaseUtils/manageGame";
import { useLocalSearchParams } from "expo-router";
import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { View,Text } from "react-native";
import { SvgXml } from 'react-native-svg';
import {arrow} from '../assets/images/arrow';
import { finish } from "../assets/images/finish";
import Snackbar from 'react-native-snackbar';

export default function Game() {
    const gameKey = useLocalSearchParams().gameKey as string;
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const[elapsedTime, setElapsedTime] = useState(0);
    const[isFinished, setIsFinished] = useState(false);
    const [isWantAnswersFlag, setIsWantAnswersFlag] = useState('a');
    //riguel wa9teh is want answers 
    const [answersMap, setAnswersMap] = useState(new Map<string, Map<string,boolean>>());

    const handleAnswers = (questionAnswers: Map<string, boolean>, currentQuestionIndex:number) => {
        const newAnswersMap = new Map(answersMap);
        newAnswersMap.set((currentQuestionIndex-1).toString(), questionAnswers); // -1 because the current question is already incremented
        setAnswersMap(newAnswersMap);
        console.log('currentQuestionIndex:', currentQuestionIndex);
        console.log('in handleAnswers:');
        console.log(newAnswersMap);
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
            console.log('Game finished');
            setIsWantAnswersFlag(isWantAnswersFlag + ' ');
        }
    }
    , [isFinished]);

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
      
            <View style={
            {
                padding: 20,
                width: '100%',
                height: '100%',
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
                <SvgXml xml={arrow} width="20%" height="20%" className="mx-auto mb-10"
                onPress={() => {
                    setIsWantAnswersFlag(isWantAnswersFlag + ' ');
                    
                    setCurrentQuestion(currentQuestion + 1);
                }}
                /> || <SvgXml xml={finish} width="20%" height="20%" className="mx-auto mb-10" onPress={
                    () => {
                        Snackbar.show({
                            text: 'Wait till timer ends!',
                            duration: Snackbar.LENGTH_SHORT,
                        });
                    }
                }/>
            }
               
            
        </View>
      
        
        
    );
}