import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, DataSnapshot, DatabaseReference, get, child, push } from "firebase/database";
import { firebaseConfig } from "../../data/firebase/firebaseConfig";
import { joinGame } from "./joinGame";
import { createGame } from "./createGame";
import { getOrCreateId } from "../manageId";
import { useState } from "react";
import { getQuests } from "./getQuests";

export async function findOrCreateGame() {
    const playerId = await getOrCreateId();
    //if theres internet connection awl haja










    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const gamesRef = ref(db, 'games/');
    const qcmRef = ref(db, 'qcm/');
    const usersRef = ref(db, 'users/');
    const snapshot = await get(gamesRef);
    const gameKey = await handle(snapshot,gamesRef,playerId);
    
    //aamel listener

    
    // ken tar7 bda nbda tar7
    // ken ena joueur theni, nriguel l questions, ebda tar7, ebda timer


    const gameRef_ = child(gamesRef,gameKey); 
    var i = 0;


    onValue(gameRef_, (snapshot) => {
        console.log('i:',i);
        i++;
        const snapval = snapshot.val();
        if (snapval.ready){
            console.log('game ready');
            //navi baba navi
            return 'podemos empezar';
        }else if (snapval.player2 == playerId){
            initGame(snapval,gameRef_,usersRef,qcmRef);
        }
    });

}

async function handle(snapshot:DataSnapshot,gamesRef:DatabaseReference, playerId:string){
    
    var gameKey = '';
    if (snapshot.exists()) { 
        const data = snapshot.val();
        gameKey = await joinGame(data,gamesRef,playerId) as string;
        console.log('ena lgame key li jey ml join:',gameKey);
        if (gameKey == null) {
            gameKey = await createGame(gamesRef,playerId);
            console.log('ena lgame key li jey ml create:', gameKey);
        }
    } else {
        gameKey = await createGame(gamesRef,playerId);
    }
    return gameKey;

    
}


async function initGame(gameData:any, gameRef_:DatabaseReference, usersRef:DatabaseReference, qcmRef:DatabaseReference) {
    console.log('zebi');
    const player1 = gameData.player1;
    const player2 = gameData.player2;

    // Use Promise.all to run promises concurrently
    const [p1_elo, p2_elo] = await Promise.all([
        get(child(usersRef, player1)).then(snapshot => snapshot.val().elo),
        get(child(usersRef, player2)).then(snapshot => snapshot.val().elo),

    ]);
    const quests = await getQuests(p1_elo, p2_elo, qcmRef);

    gameData.questions = quests;
    gameData.ready = true;
    await set(gameRef_, gameData);
}


