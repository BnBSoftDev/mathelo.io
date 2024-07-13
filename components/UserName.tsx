import React from 'react';
import {Text, View} from 'react-native';
import {getOrCreateId} from '../utils/manageId';



const UserName = () => {
  
  /*const [id, setId] = React.useState('');
  
  React.useEffect(() => {
    getOrCreateId().then((id) => {setId(id);console.log(id)});
  }, []);
  */

  return (
    <View className='w-full px-14'>
        <Text className='text-lg -mb-5 font-mono font-bold'>
            spawnerbot
        </Text>
        <View className='w-64 h-px my-8 bg-gray-400 border-0'/>
        <Text className='text-gray-600 -mt-7'>username</Text>
      
    </View>
  );
};

export default UserName; 