import { Database, DatabaseReference, child, get, getDatabase, ref } from "firebase/database";

const getGameQuestions = async (gameId: string,db:Database) => {
    const questsRef = ref(db, `games/${gameId}/questions`);
    const Questions = await get(questsRef);
  
    return Questions.val();
};


export { getGameQuestions };