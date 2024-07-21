import { View } from "react-native";
import { getFact } from '@/utils/fetchRandomFact';
import { useState, useEffect } from 'react';
import TypeWriterEffect from "react-native-typewriter-effect";
import { delay } from "@/utils/delay";

export default function TextFact() {
  const [fact1, setFact1] = useState('');
  const delayTime = 1000;

  useEffect(() => {
    getFact().then((fact) => {
      setFact1(fact);
    });
  }, []);

  return (
    <View style={{ paddingVertical: 15, width: '100%', height: '20%' }}>
      <TypeWriterEffect
        content={fact1}
        minDelay={1}
        style={{
          fontSize: 20,
          textAlign: 'center',
          color: '#000',
          fontWeight: 'bold',
          fontFamily: 'Pix',
          margin: 20,
          marginTop: -50,
        }}
        onTypingEnd={() => {
          delay(delayTime).then(() => {
            getFact().then((fact) => {
              setFact1(fact);
            });
          });
        }}
      />
    </View>
  );
}
