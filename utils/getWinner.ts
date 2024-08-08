


export function getScores(player1Elo:number,player2Elo:number,answers: any, questions: any[]) {
    //ken player elo = 0 aamel bot according to his elo
    let player1Score = 0;
    let player2Score = 0;
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        for (let j = 0; j < question.options.length; j++) {
            const option = question.options[j];
            const isOptionCorrect = option.correct;
            
            if(answers.player1 === undefined){
                isOptionCorrect?player1Score--:player1Score++;
            }else{
                answers.player1[i][j] === isOptionCorrect ? player1Score++ : player1Score--;
            }
            if(answers.player2 === undefined){
                isOptionCorrect?player2Score--:player2Score++;
                console.log(player2Score);
            }else{
                answers.player2[i][j] === isOptionCorrect ? player2Score++ : player2Score--;
            }
        }
    }

    if (player2Elo === 0) {
        // if player 2 elo is 0 , return a score thats plus or minus 2
        player2Score = player1Score + Math.floor(Math.random() * 5) - 2;
    }

    return {
        player1Score,
        player2Score
    }
}