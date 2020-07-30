import React from "react";
import Shadow from './Shadow';
import { StyleSheet, View, Dimensions } from "react-native";


const Table = props => {
    return (
        <View style={{ ...styles.superContainer, ...props.style }}>
            <Shadow style={styles.listContainer}>
                {props.children}
            </Shadow>
        </View>
    );
};

const styles = StyleSheet.create({
    superContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50
    },
    listContainer: {
        flex: 1,
        width: (Dimensions.get('window').width / 4) * 3,
        backgroundColor: "#fff",
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        borderRadius: 10,
    }
});


export default Table;