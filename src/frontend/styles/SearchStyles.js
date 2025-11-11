import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#eee",
        alignItems: 'center',
        gap: 100,
        marginBottom: 10,
        borderRadius: 8,
        height: height * 0.05,
    },
    input: {
        color: "#000",
        width: width * 0.9,
        // backgroundColor: 'red',
    },

    icon:{
        position: 'relative',
        right: 135,
    }

});

export default styles