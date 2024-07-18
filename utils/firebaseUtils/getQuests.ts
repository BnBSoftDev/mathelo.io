import { DatabaseReference, child, get } from "firebase/database";

export async function getQuests(player1_elo:number, player2_elo:number,qcmRef: DatabaseReference) {
    
    const avgElo = (player1_elo + player2_elo + 1) / 2;
    const lvl = Math.ceil(avgElo / 500);
    const quests = (await get(child(qcmRef, 'en/'+lvl.toString()))).val();
    //get 3 random questions
    const randomKeys = Object.keys(quests).sort(() => Math.random() - 0.5).slice(0, 3);
    const randomQuests = randomKeys.map((key:string) => quests[key]);
    //fix data yer7am bouk (fl pycharm, jarrab encodiha locally w baad decodiha fl client phone)
    return randomQuests;
}