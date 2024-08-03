


export function getWinner(answers: any, questions: any[]) {

    let player1Score = 0;
    let player2Score = 0;
    if (answers.player1 === undefined) {
        return 2;
    }
    
    if (answers.player2 === undefined) {
        return 1;
    }
    for (let i = 0; i < questions.length; i++) {

       
        
        const question = questions[i];
        for (let j = 0; j < question.options.length; j++) {
            const option = question.options[j];
            const isOptionCorrect = option.correct;
            
            if (answers.player1[i][j] === isOptionCorrect) {
                player1Score++;
                console.log('player1Score:', player1Score);
            }
            if (answers.player2[i][j] === isOptionCorrect) {
                player2Score++;
                console.log('player2Score:', player2Score);
            }
        }
    }

    if (player1Score > player2Score) {
        return 1;
    } else if (player1Score < player2Score) {
        return 2;
    } else {
        return 0;
    }
}