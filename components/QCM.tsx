import React from 'react';
import { Text } from 'react-native';

interface Props {
gameId: string;
question: QCM;
}


interface QCM {
    enonce: string;
    explication: string;
    options: option[];
}

interface option {
    opt: string;
    b: boolean;
}

const QCM: React.FC<Props> = ({ gameId,question }) => {
    return (
        <Text style={{
            fontSize: 20,
            textAlign: 'center',
            padding: 10
        }}>{question.enonce}</Text>
    );
}

export default QCM;