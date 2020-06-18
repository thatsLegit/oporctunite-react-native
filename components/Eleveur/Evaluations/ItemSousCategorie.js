import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CheckBox } from "native-base"
import { useDispatch } from 'react-redux';

import Colors from '../../../constants/Colors';
import * as sousCategActions from '../../../store/actions/sousCateg';


const ItemSousCategorie = props => {

    const { choixInitial } = props; //choixInitial ne dépend que de la valeur de selectAll dans l'element parent
    const [choix, setChoix] = useState(choixInitial);
    const { data } = props;
    const dispatch = useDispatch();

    //Se déclenche lorsque le choix initial change. Se declenche aussi au début.
    useEffect(() => {
        if (choix != choixInitial) {
            switchChoix();
        }
        setChoix(choixInitial);
    }, [choixInitial]);


    const switchChoix = () => {
        if (choix) {
            dispatch(sousCategActions.supprimerDeLaSelection(data.nomSousCateg));
            setChoix(!choix);
            return;
        }
        dispatch(sousCategActions.ajouterALaSelection(data.nomSousCateg, data.nomCateg));
        setChoix(!choix);
    };

    return (
        <View style={styles.item} >
            <CheckBox
                style={styles.checkBox}
                color={Colors.primary}
                checked={choix}
                onPress={() => switchChoix()}
            />
            <TouchableOpacity style={styles.list}>
                <Text style={styles.importantText}>{data.nomSousCateg}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        width: "80%",
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    list: {
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#fff",
        marginLeft: 50
    },
    lightText: {
        fontFamily: 'open-sans'
    },
    importantText: {
        fontFamily: 'open-sans-bold'
    }
});


export default ItemSousCategorie;