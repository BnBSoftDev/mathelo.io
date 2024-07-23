import React from 'react';
import {Text, View, TextInput} from 'react-native';
import { updateUserName } from '@/utils/firebaseUtils/manageUser';



const UserName = () => {
  
  const [text, onChangeText] = React.useState('RandomUserName');

  return (
    <View className='w-full px-14'>
        <TextInput
        style = {{
          fontSize: 12,
          fontFamily: 'Pix',
          color: '#000',
        
         
        }}
        autoCorrect={false}
          onChangeText={onChangeText}
          value={text}
         className='text-lg -mb-5'
          placeholder="ex: AlgebraSlayer"
          onSubmitEditing={() => {
            updateUserName(text);
          }}>
            
        </TextInput>
        <View className='w-64 h-px my-8 bg-gray-400 border-0'/>
        <Text className='text-gray-600 -mt-7' style ={{
          fontFamily: 'Pix',
          fontSize: 10,
        }}>Change username</Text>
      
    </View>
  );
};

export default UserName; 