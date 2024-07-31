import { DatabaseReference, child, get } from "firebase/database";

export async function getQuests(player1_elo:number, player2_elo:number,qcmRef: DatabaseReference) {
    
    const avgElo = (player1_elo + player2_elo + 1) / 2;
    const lvl = Math.ceil(avgElo / 500);
    const quests = (await get(child(qcmRef, lvl.toString()))).val();
    //get 3 random questions, fix it
    const randomKeys = Object.keys(quests).sort(() => Math.random() - 0.5).slice(0, 3);
    const randomQuests = randomKeys.map((key:string) => quests[key]);
    //riguel kifeh tekhou l enonce fl pycharm khater se3at yji l7arf lawel ne9es
    return randomQuests;
}