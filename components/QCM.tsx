import { addNewLines } from '@/utils/modifyEnonce';
import { View } from 'react-native';
import { SvgUri } from 'react-native-svg';

interface Props {
gameId: string;
question: QCM;
}


interface QCM {
    enonce: string;
    explanation: string;
    options: option[];
}

interface option {
    text: string;
    correct: boolean;
}



const QCM: React.FC<Props> = ({ gameId,question }) => {
    const modifiedEnonce = addNewLines(question.enonce, 40);
    console.log('enonce',question.enonce)
   return (
    <View  
    style={{
       
        height: '100%',
        width: '100%',
        alignItems: 'center',
       
    }}>
        <SvgUri
        width={'100%'}
        
        uri={encodeURI(`http://latex.codecogs.com/svg.zebi?\\textbf{${modifiedEnonce}}`)}
    />

    
    </View>
    
   )
}

export default QCM;