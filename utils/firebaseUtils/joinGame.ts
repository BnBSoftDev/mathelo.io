import { DatabaseReference,  child, set } from "firebase/database";
import { getOrCreateId } from "../manageId";

export async function joinGame(data:any,gamesRef:DatabaseReference,playerKey:string) {
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const game = data[key];
            if(game.status === 'notfull' && game.player1 != playerKey && (game.player1 == '' || game.player2 == '')){
                    if (game.player1 == ''){
                        game.player1 = playerKey
                    }else if (game.player2 == ''){
                        game.player2 = playerKey
                        game.status = 'full';
                    }

                    console.log('game',game);
                    console.log('ref',child(gamesRef,key));
                    set(child(gamesRef,key),game);
                    return key;
            }
        }
    }
    return null;
}