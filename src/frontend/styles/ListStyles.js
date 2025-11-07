import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: "#ccdac5",
        overflow: "hidden",
        borderRadius: 20,
    },
    card: {
        backgroundColor: "#f9f9f9",
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        elevation: 3,
        overflow: 'hidden',
        borderRadius: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
})

export default styles;