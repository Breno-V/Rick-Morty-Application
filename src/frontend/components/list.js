import { useState, useEffect } from "react";
import { FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles/ListStyles.js";
import Loading from './loading.js';
import Search from "./search.js";
import api from "../api.js";

export default function List({ navigation }) {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        api.get("/character?page=1")
            .then(res => setCharacters(res.data.results))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const searchByName = async (query) => {
        if (!query.trim()) {
            // volta para lista padrão se o campo estiver vazio
            api.get("/character?page=1")
                .then(res => setCharacters(res.data.results));
            return;
        }

        setIsSearching(true);
        try {
            const response = await api.get(`/character/?name=${query}`);
            setCharacters(response.data.results);
        } catch (error) {
            console.error(`Nenhum personagem encontrado! (log do erro: ${error}`);
            setCharacters([]); // nenhum resultado encontrado
        } finally {
            setIsSearching(false);
        }

    }

    if (loading) return <Loading message="Trazendo personagens..." />;

    const renderCharacter = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Detail", { character: item })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={{
                    color: item.status === 'Alive'
                        ? 'green'
                        : item.status === 'Dead'
                            ? 'red'
                            : 'gray',
                    fontWeight: 'bold'
                }}>{item.status} - {item.species}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <Search onSearch={searchByName} />

            <FlatList
                data={characters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCharacter}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}