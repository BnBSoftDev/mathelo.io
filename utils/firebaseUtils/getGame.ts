 import { getDatabase, ref, onValue, child } from "firebase/database";
 
 export async function getGame(gameKey:String) {
    const db = getDatabase();
    const starCountRef = child(ref(db), `games/${gameKey}`);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    });
}