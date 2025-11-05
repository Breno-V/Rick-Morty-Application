import { useState, useEffect } from "react";
import { FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles/ListStyles.js";
import Loading from './loading.js';
import api from "../api.js";

export default function List({ navigation }) {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/character?page=1")
            .then(res => setCharacters(res.data.results))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loading message="Trazendo personagens..." />;

    const renderCharacter = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Detail", { character: item })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text>{item.status} - {item.species}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={characters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCharacter}
            contentContainerStyle={styles.listContainer}
        />
    );
}