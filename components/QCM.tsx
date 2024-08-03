import { addNewLines } from '@/utils/modifyLatex';
import { View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import Option from './Option';
import { Props, QCMtype} from '@/data/types';
import { useEffect, useState } from 'react';



const QCM: React.FC<Props> = (
    {   gameId,
        question,
        questionIndex ,
        isWantAnswersFlag,
        handleAnswers,
     }
) => {
    const modifiedEnonce = addNewLines(question.enonce, 40);
    const [answersDict, setAnswersDict] = useState<Map<string, boolean>>(new Map());

    useEffect(() => {
        const newAnswersDict = new Map<string, boolean>();
        question.options.forEach((_, index) => {
            newAnswersDict.set(index.toString(), false);
        });
        setAnswersDict(newAnswersDict);
        
    }, [question]);

    useEffect(() => {
        if (isWantAnswersFlag!='a') {
            console.log('indice mn west luseeffect taalgame', questionIndex);
            handleAnswers(answersDict, questionIndex);
        }
    }, [isWantAnswersFlag]);

   return (
    <View className='h-fit'  
    style={{
        width: '100%',
        alignItems: 'center',
       
    }}>
        <SvgUri
        width={'100%'}
        
        uri={`http://latex.codecogs.com/svg.zebi?\\textbf{${question.enonce}}`}
    />


   
        <View className='py-5 w-full h-fit'>
                {
                question.options.map((option, index) => (
                <Option key={index} option={option} onCheckedChange={
                    (isChecked: boolean) => {
                        const newAnswersDict = new Map(answersDict);
                        newAnswersDict.set(index.toString(), isChecked);
                        setAnswersDict(newAnswersDict);
                        console.log(newAnswersDict);
                    }
                } />
                 ))  
             }
        </View>
        
    

    </View>
    
   )
}

export default QCM;