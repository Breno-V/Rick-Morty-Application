import {View, Text} from 'react-native';
import styles from "../styles/HomeScreenStyle.js";
import List from "../components/list.js";

export default function HomeScreen ({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Bem vindo ao Aplicativo do Rick & Morty</Text>
            </View>
            <View style={{flex: 1}}>
                <List navigation={navigation}/>
            </View>
        </View>
    )
}