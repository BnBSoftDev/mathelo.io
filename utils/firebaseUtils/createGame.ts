import { DatabaseReference, child, get, push, ref, set } from "firebase/database";
 export async function createGame(gamesRef:DatabaseReference, playerKey:string) {
  const newGameKey = push(gamesRef).key;
  const game = {
    player1: playerKey,
    player2: '',
    status: 'notfull',
    winner : '',
    ready : false,
  };

  set(child(gamesRef, newGameKey as string), game);
  return newGameKey as string;
}