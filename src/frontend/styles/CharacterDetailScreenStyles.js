import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        padding: 40,
        backgroundColor: '#d4fac4ff'
    },

    image: {
        width: 170,
        height: 170,
        borderRadius: 100,
        marginBottom: 20,

    },

    card: {
        backgroundColor: '#88cb79',
        borderRadius: 10,
        width: width * 0.7,
        height: height * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 10,
        elevation: 5,
    },

    name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },

    info: {
        fontSize: 16,
        color: "#252525ff",
        alignItems: 'center',
        textAlign: 'center',
    },

    btnBack: {
        backgroundColor: '#009c56',
        height: height * 0.07,
        width: width * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
        elevation: 5,
    },
})

export default styles;