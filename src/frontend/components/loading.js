import { ActivityIndicator, View, Text } from "react-native";
import styles from "../styles/LoadingStyles.js";

export default function Loading({ message }) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#00ff73ff" />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}