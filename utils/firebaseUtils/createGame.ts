import { DatabaseReference, child, push, set } from "firebase/database";
 export async function createGame(gamesRef:DatabaseReference, playerKey:string) {
  const newGameKey = push(gamesRef).key;
  const game = {
    player1: playerKey,
    player2: '',
    status: 'notfull',
    winner : '',
    ready : false,
    player1Answers : [],
    player2Answers : [],
  };

  set(child(gamesRef, newGameKey as string), game);
  return newGameKey as string;
}