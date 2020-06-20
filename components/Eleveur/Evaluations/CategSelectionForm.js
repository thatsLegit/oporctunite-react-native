import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../../../constants/Colors';
import Shadow from '../../UI/Shadow';


const CategSelectionForm = props => {
    return (
        <View style={styles.formContainer}>
            <Shadow style={styles.button}>
                <TouchableOpacity onPress={() => props.navigation.navigate(props.retour)}>
                    <Shadow><Text style={styles.buttonText}>{props.textRetour}</Text></Shadow>
                </TouchableOpacity>
            </Shadow>
            <Shadow style={styles.button}>
                <TouchableOpacity onPress={() => props.navigation.navigate(props.valider)}>
                    <Shadow><Text style={styles.buttonText}>{props.textValider}</Text></Shadow>
                </TouchableOpacity>
            </Shadow>
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
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        padding: 7,
        fontFamily: 'open-sans-bold'
    }
});


export default CategSelectionForm;