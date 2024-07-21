import AsyncStorage from '@react-native-async-storage/async-storage';
import  { createUser } from './firebaseUtils/manageUser';


//this all can be done using firebase with local caching
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
    storeData('id',''); //this makes sure enti l player n 1 w zeda tesnaa user jdid
    let id = await getData('id');
    if (id == undefined || id == null) {
      id = Math.random().toString(36).substring(4);
      await createUser(id);
      await storeData('id', id);
    } 
    return id;
  }