import { useState, useEffect } from "react";
import { FlatList, View, Text, Image, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/ListStyles.js";
import Loading from './loading.js';
import Search from "./search.js";
import api from "../api.js";

export default function List({ navigation }) {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        //sempre deixar a lista na página 1
        api.get("/character?page=1")
            .then(res => {
                //insiro as informações dos personagens
                setCharacters(res.data.results);

                //se tiver mais páginas para prosseguir, deixxa o estado verdadeiro
                if (res.data.info && res.data.info.next) {
                    setHasNextPage(true);
                } else {
                    setHasNextPage(false);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const searchByName = async (query) => {
        setIsSearching(true);
        //defino o pedido vindo da URL
        setSearchQuery(query);
        setPage(1); //reseto para a página inicial

        //se não tiver nada...
        if (!query.trim()) {
            // volta para lista padrão se o campo estiver vazio
            api.get("/character?page=1")
                .then(res => {
                    setCharacters(res.data.results);
                    if (res.data.info && res.data.info.next) {
                        setHasNextPage(true);
                    } else {
                        setHasNextPage(false);
                    }
                    setIsSearching(false);
                });
            return;
        }

        try {
            const response = await api.get(`/character/?name=${query}&page=1`);
            setCharacters(response.data.results);
        } catch (error) {
            setCharacters([]); // nenhum resultado encontrado
            return (
                Alert.alert("AVISO", "Nenhum personagem encontrado!")
            )
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
                    //se estiver vivo, fica verde, se estiver morto, fica vermelho, se não for conhecido, fica cinza
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

    const infinityPagination = async () => {
        //se estiver buscando os carregando mais personagens, não ativa
        if (isSearching || loadingMore) return;
        //se não tiver mais páginas pra carregar, também não ativa
        if (!hasNextPage) return;
        setLoadingMore(true);

        try {
            //calculo a próxima página
            const nextPage = page + 1;
            let res;

            if (searchQuery.trim()) {
                //paginação por nome
                res = await api.get(`/character?name=${searchQuery}&page=${nextPage}`);
            } else {
                //paginação normal
                res = await api.get(`/character?page=${nextPage}`)
            }

            //Essa linha junta a lista antiga com a nova e atualiza o estado.
            // prev: traz valor anterior que estava contido nesse estado
            //... : desmonta o array para trazer e adicionar os valores que ele continha
            setCharacters(prev => [...prev, ...res.data.results]);
            setPage(nextPage);

            if (res.data.info && res.data.info.next) {
                setHasNextPage(true);
            } else {
                setHasNextPage(false);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoadingMore(false);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Search onSearch={searchByName} />

            <FlatList
                data={characters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCharacter}
                contentContainerStyle={styles.listContainer}
                onEndReached={infinityPagination}
                onEndReachedThreshold={1}
            />
        </View>
    );
}