import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { firebaseConfig } from "../../data/firebase/firebaseConfig";
import { getOrCreateId } from "../manageId";


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);





export const createUser = async (id:string) => {
    set(ref(db, 'users/' + id), {
        id: id,
        elo: 1000,
        games: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        username: 'username',
        lang : 'en'
    });
}

export const updateUserName = async (username:string) => {
    const id = await getOrCreateId();
    set(ref(db, 'users/' + id + '/username'), username);
}
