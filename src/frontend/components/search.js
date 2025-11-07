import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/SearchStyles.js';

export default function Search({ onSearch }) {
    const [text, setText] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(text);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Buscar personagem..."
                placeholderTextColor="#888"
                value={text}
                onChangeText={setText}
                onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleSearch}>
                <Ionicons name="search" size={24} color="black"/>
            </TouchableOpacity>
        </View>
    )
}
