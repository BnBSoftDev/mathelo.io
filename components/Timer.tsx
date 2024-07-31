import { view } from 'ramda';
import { View, Text, Image} from 'react-native';
export default function Timer(
    { elapsedTime }: { elapsedTime: number }
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
            }}>00:00</Text>
        </View>
    )
}