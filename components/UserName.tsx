import React from 'react';
import {Text, View, TextInput} from 'react-native';
import { updateUserName } from '@/utils/firebaseUtils/manageUser';



const UserName = () => {
  
  const [text, onChangeText] = React.useState('RandomUserName');

  return (
    <View className='w-full px-14'>
        <TextInput
        autoCorrect={false}
          onChangeText={onChangeText}
          value={text}
         className='text-lg -mb-5 font-mono font-bold'
          placeholder="ex: AlgebraSlayer"
          onSubmitEditing={() => {
            updateUserName(text);
          }}>
            
        </TextInput>
        <View className='w-64 h-px my-8 bg-gray-400 border-0'/>
        <Text className='text-gray-600 -mt-7'>Change username</Text>
      
    </View>
  );
};

export default UserName; 