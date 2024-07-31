import QCM from "@/components/QCM";
import Timer from "@/components/Timer";
import { getGameQuestions } from "@/utils/firebaseUtils/manageGame";
import { useLocalSearchParams } from "expo-router";
import { getDatabase } from "firebase/database";
import { useEffect, useState } from "react";
import { View,Text } from "react-native";


export default function Game() {
    const gameKey = useLocalSearchParams().gameKey as string;
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
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




    }
    , []);

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
                
                <Timer elapsedTime={elapsedTime}></Timer>
            </View>
            {questions.length > 0 ? (
                <QCM gameId={gameKey} question={questions[currentQuestion]} />
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
        
    );
}