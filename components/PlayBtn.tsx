import { Link } from "expo-router";
import { Pressable, Text } from "react-native";



export default function PlayBtn() {
    return (
        <Link href="/loadingGame" asChild>
            <Pressable
            className="
        
            bg-blue-500
            rounded-md
            p-2
            w-3/4
            h-12"
            >
            <Text
            className="text-white text-center font-bold text-xl" 
            >Play</Text>
            </Pressable>
        </Link>
        
    );
}