import { View } from "react-native";
import { Opt } from "@/data/types";
import BouncyCheckBox from "react-native-bouncy-checkbox";
import { SvgUri } from "react-native-svg";
import { addNewLines } from "@/utils/modifyLatex";
import { useEffect, useState } from "react";

interface OptionProps {
    option: Opt;
    onCheckedChange: (isChecked: boolean) => void;
    isDisabled?: boolean;
    correctionMode?: boolean;
}

export default function Option({ option, onCheckedChange = () => {}, isDisabled = false,correctionMode = false }: OptionProps) {
    const [modifiedText, setModifiedText] = useState<string>('');
    const [isChecked, setIsChecked] = useState<boolean>(false);

   
    useEffect(() => {
        setModifiedText(addNewLines(option.text, 40));
        setIsChecked(false); // Reset checkbox status when option changes
    }, [option.text]);

    return (
        <View className="flex flex-row my-2 py-5 justify-start" style={{
            borderWidth: 1,
            borderColor: '#3D72D1',
            borderRadius: 3,
            padding: 5,
            borderStyle: 'dashed',
        }}>
            <BouncyCheckBox
                isChecked={correctionMode ? option.correct : isChecked}
                className="ml-2"
                size={25}
                disabled={isDisabled}
                fillColor="#3D72D1"
                iconStyle={{ borderColor: "#3D72D1" }}
                onPress={(checked: boolean) => {
                    setIsChecked(checked);
                    onCheckedChange(checked);
                }}
            />
            <SvgUri className="w-full"
                width={'80%'}
                uri={`https://latex.codecogs.com/svg.zebi?\\textbf{${option.text}}`}
            />
        </View>
    )
}
