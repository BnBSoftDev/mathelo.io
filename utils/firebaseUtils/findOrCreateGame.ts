import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, DataSnapshot, DatabaseReference, get, child } from "firebase/database";
import { firebaseConfig } from "../../data/firebase/firebaseConfig";
import { joinGame } from "./joinGame";
import { createGame } from "./createGame";
import { getOrCreateId } from "../manageId";
import { getQuests } from "./getQuests";


export async function findOrCreateGame(
    handlePlayerId: (id: string) => void,
    handlePlayerIndex: (index: number) => void
) {
    const playerId = await getOrCreateId();

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const gamesRef = ref(db, 'games/');
    const qcmRef = ref(db, 'en/');
    const usersRef = ref(db, 'users/');
    const snapshot = await get(gamesRef);
    const gameKey = await handle(snapshot, gamesRef, playerId);

    const gameRef_ = child(gamesRef, gameKey);
    var i = 0;

    const gamePromise = new Promise((resolve, reject) => {
        onValue(gameRef_, async (snapshot) => {
            i++;
            const snapval = snapshot.val();
            if (snapval.ready) {
                // Resolve the promise when the game is ready
                handlePlayerId(playerId);
                if (snapval.player1 === playerId) {
                    handlePlayerIndex(1);
                } else if (snapval.player2 === playerId) {
                    handlePlayerIndex(2);
                }

                resolve(gameKey);
            } else {
                if (snapval.player2 === playerId) {
                    await initGame(snapval, gameRef_, usersRef, qcmRef);
                }
            }
        }, (error) => {
            reject(error);
        });
    });

    const timeoutPromise = new Promise(async (resolve) => {
        setTimeout(async () => {
            console.log('doodle');
            const snapval = (await get(gameRef_)).val();
            if (!snapval.ready) {
                snapval.status = 'full';
                await initGame(snapval, gameRef_, usersRef, qcmRef);
                resolve(gameKey);
            }
        }, 6000);
    });

    return Promise.race([gamePromise, timeoutPromise]);
}



async function handle(snapshot: DataSnapshot, gamesRef: DatabaseReference, playerId: string) {
    var gameKey = '';
    if (snapshot.exists()) {
        const data = snapshot.val();
        gameKey = await joinGame(data, gamesRef, playerId) as string;
        if (gameKey == null) {
            gameKey = await createGame(gamesRef, playerId);
        }
    } else {
        gameKey = await createGame(gamesRef, playerId);
    }
    return gameKey;
}

async function initGame(gameData: any, gameRef_: DatabaseReference, usersRef: DatabaseReference, qcmRef: DatabaseReference) {
    const player1 = gameData.player1;
    const player2 = gameData.player2;
    
    var p1_elo = 0;
    var p2_elo = 0;

    // if player two is null dont get its elo

    var quests = [];

    if(player2 != ""){
        [p1_elo, p2_elo] = await Promise.all([
            get(child(usersRef, player1)).then(snapshot => snapshot.val().elo),
            get(child(usersRef, player2)).then(snapshot => snapshot.val().elo),
        ]);
        quests = await getQuests(p1_elo, p2_elo, qcmRef);
    } else{
        console.log('player 2 is null');
        p1_elo = await get(child(usersRef, player1)).then(snapshot => snapshot.val().elo);
        quests = await getQuests(p1_elo, p1_elo, qcmRef);
    }

    // Use Promise.all to run promises concurrently
  
    

    gameData.questions = quests;
    gameData.ready = true;
    gameData.startTime = Date.now();
    await set(gameRef_, gameData);
}
