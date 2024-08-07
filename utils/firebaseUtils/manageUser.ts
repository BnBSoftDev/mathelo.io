import { initializeApp } from "firebase/app";
import { getDatabase, ref, set,get, onValue } from "firebase/database";
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

export const getUserName = async () => {
    const id = await getOrCreateId();
    const user = await get(ref(db, 'users/' + id + '/username'))
    if (user.exists()) {
        return user.val().toString();
    }
    return 'randomUserName';
}

export const getElo = async () => {
    const id = await getOrCreateId();
    const user = await get(ref(db, 'users/' + id + '/elo'))
    if (user.exists()) {
        return user.val();
    }
    return 1000;
}

export const getEloListener = async (
    handleEloChange: (elo: number) => void
) => {
    const id = await getOrCreateId();
    onValue(ref(db, 'users/' + id + '/elo'), (snapshot) => {
        const data = snapshot.val();
        if (data) handleEloChange(data);
    }
    );
    
}

export const updateElo = async (elo:number) => {
    const id = await getOrCreateId();
    set(ref(db, 'users/' + id + '/elo'), elo);
}
