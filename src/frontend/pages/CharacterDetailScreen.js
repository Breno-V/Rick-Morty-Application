import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "../styles/CharacterDetailScreenStyles.js";

export default function DetailScreen({ route, navigation }) {
  const { character } = route.params; // recebendo personagem

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <View style={styles.card}>
        <Text style={styles.info}>Status: {character.status}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.info}>Species: {character.species}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.info}>Gender: {character.gender}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.info}>Origin: {character.origin.name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.info}>Location: {character.location.name}</Text>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        style={styles.btnBack}
        onPress={() => navigation.navigate("Home")}
      >
        <Text>Voltar</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}