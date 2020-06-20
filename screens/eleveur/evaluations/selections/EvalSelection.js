import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox } from "native-base"

import Colors from '../../../../constants/Colors';
import CategSelectionForm from '../../../../components/Eleveur/Evaluations/CategSelectionForm';
import * as sousCategActions from '../../../../store/actions/sousCateg';
import SelectedSousCategorieItem from '../../../../components/Eleveur/Evaluations/SelectedSousCategorieItem';
import CorrespondingEvaluations from '../../../../components/Eleveur/Evaluations/CorrespondingEvaluations';
import Shadow from '../../../../components/UI/Shadow';


const EvalSelectionScreen = props => {

    let selectedSousCatNames = [];
    let evaluations = [];

    const selectedSousCat = useSelector(state => Object.values(state.sousCateg.sousCategSelection)); //array qui contient les sous-catégories

    for (const sousCat of selectedSousCat) {
        selectedSousCatNames.push(sousCat.nomSousCateg);
    }

    for (const name of selectedSousCatNames) {
        evaluations = useSelector(state => Object.values(state.sousCateg.sousCategories[name])).concat(evaluations);
    }

    const [selectAll, setSelectAll] = useState(false);
    const dispatch = useDispatch();


    return (
        <View>
            <CategSelectionForm
                navigation={props.navigation}
                retour='CategSelection'
                textRetour='Retour catégories'
                valider='EvalInfo'
                textValider='Valider selection'
            />
            <View style={{ maxHeight: (Dimensions.get('window').height / 5.5) }}>
                <FlatList
                    data={selectedSousCat}
                    numColumns={2}
                    renderItem={itemData => (
                        <SelectedSousCategorieItem
                            nom={itemData.item.nomSousCateg}
                            onRemove={() => dispatch(sousCategActions.supprimerDeLaSelection(itemData.item.nomSousCateg))}
                        />)}
                    keyExtractor={item => item.nomSousCateg}
                />
            </View>
            <View style={{ marginVertical: 10 }}></View>
            <View style={{ maxHeight: (Dimensions.get('window').height / 2) * 1.17, minHeight: (Dimensions.get('window').height / 2) * 1.1 }}>
                <FlatList
                    ListHeaderComponent={(
                        <View>
                            <View style={{ alignItems: 'center' }}>
                                <Shadow style={styles.titleContainer}>
                                    <Text style={styles.title}>Evaluations disponibles ({evaluations.length})</Text>
                                </Shadow>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 5 }}>
                                <CheckBox style={{ marginRight: 15 }} color={Colors.accent} onPress={() => setSelectAll(!selectAll)} />
                                <Text style={{ fontFamily: 'open-sans', fontSize: 15 }}>Tout selectionner</Text>
                            </View>
                        </View>
                    )}
                    data={evaluations}
                    numColumns={2}
                    renderItem={itemData => (
                        <CorrespondingEvaluations
                            nomEvaluation={itemData.item.nomEvaluation}
                            nomCategorieP={itemData.item.nomCategorieP}
                            choixInitial={selectAll}
                        />)}
                    keyExtractor={item => item.nomEvaluation}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        marginBottom: 10,
        alignItems: 'center'
    },
    title: {
        marginBottom: 5,
        fontFamily: 'open-sans-bold',
        fontSize: 20
    }
});


export default EvalSelectionScreen;