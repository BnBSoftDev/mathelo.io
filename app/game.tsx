import QCM from "@/components/QCM";
import { getGameQuestions } from "@/utils/firebaseUtils/manageGame";
import { useLocalSearchParams } from "expo-router";
import { getDatabase } from "firebase/database";
import { useEffect, useState } from "react";
import { View,Text } from "react-native";


export default function Game() {
    const gameKey = useLocalSearchParams().gameKey as string;
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
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
        //TODO: thabbet chaamelt men bhema kima t3ayat l react component keyenha fct 3adia f blast <>
        <View>
            {questions.length > 0 ? (
                <QCM gameId={gameKey} question={questions[currentQuestion]} />
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
        
    );
}