import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../../../constants/Colors';


const CategSelectionForm = props => {
    return (
        <View style={styles.formContainer}>
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate(props.retour)}>
                <Text style={styles.buttonText}>{props.textRetour}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate(props.valider)}>
                <Text style={styles.buttonText}>{props.textValider}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        flexDirection: "row",
        marginVertical: 30,
        marginHorizontal: 20,
        justifyContent: 'space-between'
    },
    button: {
        width: "47%",
        height: 40,
        backgroundColor: Colors.accent,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        padding: 7,
        fontFamily: 'open-sans-bold'
    }
});


export default CategSelectionForm;