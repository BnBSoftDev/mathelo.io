import React, { useEffect } from 'react';
import {Text, View, TextInput} from 'react-native';
import { getUserName, updateUserName } from '@/utils/firebaseUtils/manageUser';
import { child, getDatabase,set, ref, get} from 'firebase/database';



const UserName = () => {
  
  const [text, setText] = React.useState('randomUserName');

  useEffect(() => {
      getUserName().then((username) => {
      setText(username);
    });
  }, []);

  return (
    <View className='w-full px-14'>
        <TextInput
        style = {{
          fontSize: 12,
          fontFamily: 'Pix',
          color: '#000',
        
         
        }}
        autoCorrect={false}
          value={text}
         className='text-lg -mb-5'
          placeholder="ex: AlgebraSlayer"
          onSubmitEditing={() => {
            updateUserName(text);
            setText(text);
          }}
          onChangeText={(text) => setText(text)}
          >
            
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