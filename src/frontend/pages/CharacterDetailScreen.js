import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import styles from "../styles/CharacterDetailScreenStyles.js";

export default function DetailScreen({ route }) {
  const { character } = route.params; // recebendo personagem

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.info}>Status: {character.status}</Text>
      <Text style={styles.info}>Species: {character.species}</Text>
      <Text style={styles.info}>Gender: {character.gender}</Text>
      <Text style={styles.info}>Origin: {character.origin.name}</Text>
      <Text style={styles.info}>Location: {character.location.name}</Text>
    </ScrollView>
  );
}