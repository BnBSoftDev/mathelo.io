import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key:string,value:string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };


  const getData = async (key:string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  };


  export const getOrCreateId = async() =>{
    let id = await getData('id');
    if (id == undefined || id == null) {
      id = Math.random().toString(36).substring(5);
      await storeData('id', id);
    }
    return id;
  }