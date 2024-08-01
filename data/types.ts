export interface Props {
    gameId: string;
    question: QCMtype;
    questionIndex: number;
    isWantAnswersFlag: string;
    handleAnswers: (questionAnswers: Map<string, boolean>, currentQuestionIndex: number) => void; 
    }
    
    
export interface QCMtype {
    enonce: string;
    explanation: string;
    options: Opt[];
}

export interface Opt {
    text: string;
    correct: boolean;
}