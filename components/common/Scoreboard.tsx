import { View , Text} from "react-native";

const styles = {
    fontFamily: {
        fontFamily: 'Pix',
    },
    container : {
        paddingTop: 60,
        paddingBottom: 0,
        backgroundColor: '#fff',
    },
    };


const Scoreboard = ({ player1score, player2score }
: {
  player1score: number;
  player2score: number;
}
) => {
  return (
    <View style={
        styles.container
    }>
    <Text className='text-center text-xs mt-5 text-zinc-500' style={styles.fontFamily}>a right answer is a +1</Text>
    <Text className='text-center text-xs text-zinc-500' style={styles.fontFamily}>a wrong answer is a -1</Text>
        <View className='flex flex-row justify-center '>
      <View className='flex flex-col items-center p-5'>
        <Text className='text-sm text-blue-500' style={styles.fontFamily}>Player 1</Text>
        <Text className='text-sm text-blue-500' style={styles.fontFamily}>{player1score}</Text>
      </View>
      <View className='flex flex-col items-center p-5'>
        <Text className='text-sm text-red-500' style={styles.fontFamily}>Player 2</Text>
        <Text className='text-sm text-red-500' style={styles.fontFamily}>{player2score}</Text>
      </View>
    </View>
    </View>
    
  );
};
export default Scoreboard;