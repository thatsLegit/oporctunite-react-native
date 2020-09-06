import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import * as sousCategActions from '../../store/actions/sousCateg';
import Colors from '../../constants/Colors';
import Shadow from '../UI/Shadow';

//Boutons de navigation utilisés dans la séléction des évaluations


const TopNavigationForm = props => {
    const dispatch = useDispatch();

    //Permet de vérifier s'il y a bien eu une séléction avant de passer à l'écran suivant.
    const { selection } = props;
    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }
    const disable = () => {
        if (selection != undefined && !isEmpty(selection)) return false;
        if (selection == undefined || isEmpty(selection)) return true;
    }

    return (
        <View style={styles.formContainer}>
            <Shadow style={styles.button}>
                <TouchableOpacity onPress={async () => {
                    props.navigation.navigate(props.retour);
                    props.retour == 'EvalRecap' && await dispatch(sousCategActions.supprimerSousCategSelection());
                }}>
                    <Shadow><Text style={styles.buttonText}>{props.textRetour}</Text></Shadow>
                </TouchableOpacity>
            </Shadow>
            <Shadow style={styles.button}>
                {!props.check && <TouchableOpacity onPress={() => props.navigation.navigate(props.valider)}>
                    <Shadow><Text style={styles.buttonText}>{props.textValider}</Text></Shadow>
                </TouchableOpacity>}
                {props.check && !disable() && <TouchableOpacity onPress={() => props.navigation.navigate(props.valider)}>
                    <Shadow><Text style={styles.buttonText}>{props.textValider}</Text></Shadow>
                </TouchableOpacity>}
                {props.check && disable() && <TouchableOpacity onPress={() => Alert.alert('Aucune selection', `Veuillez selectionner au moins une ${props.type}`, [{ text: 'OK', style: 'destructive' }])}>
                    <Shadow><Text style={styles.buttonText}>{props.textValider}</Text></Shadow>
                </TouchableOpacity>}
            </Shadow>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        maxHeight: "20%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    button: {
        height: 40,
        paddingHorizontal: 5,
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


export default TopNavigationForm;