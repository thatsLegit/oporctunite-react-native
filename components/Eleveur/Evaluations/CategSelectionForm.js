import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../../../constants/Colors';


const CategSelectionForm = props => {
    return (
        <View style={styles.formContainer}>
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('EvalRecap')}>
                <Text style={styles.buttonText}>Revenir au récap</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('EvalSelection')}>
                <Text style={styles.buttonText}>Valider selection</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        flexDirection: "row",
        margin: 30,
        justifyContent: 'space-between'
    },
    button: {
        width: "45%",
        height: 33,
        backgroundColor: Colors.accent,
        borderRadius: 10,
        padding: 5,
        alignItems: "center",
        right: 5,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'open-sans-bold'
    }
});


export default CategSelectionForm;