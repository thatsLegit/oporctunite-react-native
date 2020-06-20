import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CheckBox } from "native-base"
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../../constants/Colors';
import * as sousCategActions from '../../../store/actions/sousCateg';


const ItemSousCategorie = props => {

    const { selectAll } = props;
    const [choix, setChoix] = useState(selectAll);
    const { data } = props;
    //Cas ou la sous-cat est supprimée via les filtres,choix et sousCatPresenteDsLeStoreOuPas vont alors diverger
    let sousCatPresenteDsLeStoreOuPas = useSelector(state => state.sousCateg.sousCategSelection);
    if (sousCatPresenteDsLeStoreOuPas !== undefined) {
        sousCatPresenteDsLeStoreOuPas = Object.values(sousCatPresenteDsLeStoreOuPas).some(e => e.nomSousCateg == data.nomSousCateg);
        sousCatPresenteDsLeStoreOuPas != choix && setChoix(false);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        choix != selectAll && switchChoix();
        setChoix(selectAll);
    }, [selectAll]);

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