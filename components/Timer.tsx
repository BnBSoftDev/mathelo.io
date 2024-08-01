import { view } from 'ramda';
import { View, Text, Image} from 'react-native';
export default function Timer(
    {timeLeft} : {timeLeft: number}
) {
    return (
        <View className="flex flex-column h-fit justify-around -mt-3">
            <Image
                style={{
                    width: 70,
                    height: 70,
                }}
                source={require('@/assets/images/timer.png')}
            />
            <Text style={{
                fontSize: 15,
                fontFamily: 'Pix',
                color: '#3D72D1',
            }}>{`${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${Math.floor(timeLeft % 60).toString().padStart(2, '0')}`}
            </Text>
        </View>
    )
}