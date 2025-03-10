import { addNewLines } from '@/utils/modifyLatex';
import { View ,Text} from 'react-native';
import { SvgUri } from 'react-native-svg';
import Option from './Option';
import { Props, QCMtype} from '@/data/types';
import { useEffect, useState } from 'react';



const QCM: React.FC<Props> = (
    {   question,
        questionIndex = 0,
        isWantAnswersFlag = 'a',
        handleAnswers = () => {},
        disabled = false,
        correctionMode = false,
     }
) => {
    const modifiedEnonce = addNewLines(question.enonce, 40);
    const [answersDict, setAnswersDict] = useState<Map<string, boolean>>(new Map());

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        const newAnswersDict = new Map<string, boolean>();
        question.options.forEach((_, index) => {
            newAnswersDict.set(index.toString(), false);
        });
        setAnswersDict(newAnswersDict);
        
    }, [question]);

    useEffect(() => {
        if (isWantAnswersFlag!='a') {
            handleAnswers(answersDict, questionIndex);
        }
    }, [isWantAnswersFlag]);

   return (
    <View className='h-fit py-5'  
    style={{
        width: '100%',
        alignItems: 'center',
       
    }}>
        <Text className='text-xl my-5' style={{
            fontFamily: 'Pix',
            color: '#3D72D1',
          }}> Problem Statement :</Text>
        <SvgUri
        width={'100%'}
        
        uri={`https://latex.codecogs.com/svg.zebi?\\textbf{${question.enonce}}`}
    />


   
        <View className='py-5 w-full h-fit'>
                {
                question.options.map((option, index) => (
        
                <Option isDisabled={disabled} key={index} correctionMode={correctionMode} option={option} onCheckedChange={
                    (isChecked: boolean) => {
                        const newAnswersDict = new Map(answersDict);
                        newAnswersDict.set(index.toString(), isChecked);
                        setAnswersDict(newAnswersDict);
                    }
                } />
                 ))  
             }
        </View>
        
    

    </View>
    
   )
}

export default QCM;