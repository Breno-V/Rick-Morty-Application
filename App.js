import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from 'expo-font';
import HomeScreen from "./src/frontend/pages/HomeScreen.js"
import DetailScreen from "./src/frontend/pages/CharacterDetailScreen.js";
import Loading from "./src/frontend/components/loading.js";

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontLoaded, setfontLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "RickAndMorty": require("./assets/fonts/RickAndMorty.ttf"),
    });

    setfontLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, [])


  if (!fontLoaded) {
    return <Loading message={"Aplicativo carregando fontes..."} />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}