import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox } from "native-base"

import Colors from '../../../../constants/Colors';
import TopNavigationForm from '../../../../components/Navigation/TopNavigationForm';
import * as sousCategActions from '../../../../store/actions/sousCateg';
import * as evalActions from '../../../../store/actions/evaluation';
import SelectedSousCategorieItem from '../../../../components/Evaluations/Selection/SelectedSousCategorieItem';
import CorrespondingEvaluations from '../../../../components/Evaluations/Selection/CorrespondingEvaluations';
import Shadow from '../../../../components/UI/Shadow';

//Selection des évaluations correspondantes à la séléction de sous-catégories

const EvalSelectionScreen = props => {

    const [filtersHeight, setFiltersHeight] = useState(0); //enregistre la hauteur en pixel de la partie 'filtre des sous-catégories'

    //Sous-catégories séléctionnées
    const selectedSousCat = useSelector(state => Object.values(state.sousCateg.sousCategSelection));
    const selectedSousCatNames = selectedSousCat.map(sousCat => sousCat.nomSousCateg);

    //Eval correspondantes
    const evaluations = useSelector(state => Object.values(state.sousCateg.sousCategories).flat().filter(e => selectedSousCatNames.includes(e.nomCategorieP)));

    //A-t-on bien une séléction ? permet surtout d'éviter des bugs lorsque des évals sont déselectionnées (ne pas suppr)
    const emptySelectionOrNot = useSelector(state => state.eval.evalSelection);

    //Etat tout séléctionner
    const [selectAll, setSelectAll] = useState(false);

    const dispatch = useDispatch();

    //Declenché quand on suppr une sous-cat
    const removeSCategHandler = item => {
        dispatch(sousCategActions.supprimerDeLaSelection(item.nomSousCateg));
        const nomEval = evaluations.filter(e => e.nomCategorieP == item.nomSousCateg).map(ev => ev.nomEvaluation);
        dispatch(evalActions.supprimerDeLaSelection(nomEval[0]));
    };

    //Met à jour la hauteur en px de la partie 'filtre des sous-catégories'
    const filtersHeightHandler = useCallback((height) => {
        filtersHeight == 0 && setFiltersHeight(height + 70);
    }, [filtersHeight]);

    return (
        <View style={{ flex: 1 }} >
            <TopNavigationForm
                navigation={props.navigation}
                retour='CategSelection'
                textRetour='Retour catégories'
                valider='EvalInfo'
                textValider='Valider selection'
                selection={emptySelectionOrNot}
                type='evaluation'
                check={true}
            />
            <View
                style={{ flex: 1, height: filtersHeight, maxHeight: Dimensions.get('window').height > 1000 ? '15%' : '25%' }}
                onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    filtersHeightHandler(height);
                }}>
                <FlatList
                    columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 }}
                    horizontal={false}
                    data={selectedSousCat}
                    numColumns={Math.trunc(Dimensions.get('window').width / 120)}
                    renderItem={itemData => (
                        <SelectedSousCategorieItem
                            nom={itemData.item.nomSousCateg}
                            onRemove={removeSCategHandler.bind(this, itemData.item)}
                        />)}
                    keyExtractor={item => item.nomSousCateg}
                />
            </View>
            <View style={{ paddingVertical: 10, height: '70%' }}>
                <FlatList
                    ListHeaderComponent={(
                        <View>
                            <View style={{ alignItems: 'center' }}>
                                <Shadow style={styles.titleContainer}>
                                    <Text style={styles.title}>Evaluations disponibles ({evaluations.length})</Text>
                                </Shadow>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 5 }}>
                                <CheckBox style={{ marginRight: 15 }} checked={selectAll} color={Colors.accent} onPress={() => setSelectAll(!selectAll)} />
                                <TouchableOpacity onPress={() => setSelectAll(!selectAll)}>
                                    <Text style={{ fontFamily: 'open-sans', fontSize: 15 }}>Tout sélectionner</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    data={evaluations}
                    columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 }}
                    numColumns={Math.trunc(Dimensions.get('window').width / (Dimensions.get('window').width < 500 ? 150 : 200))}
                    renderItem={itemData => (
                        <CorrespondingEvaluations
                            eval={itemData.item}
                            selectAll={selectAll}
                        />)}
                    keyExtractor={item => item.nomEvaluation}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        paddingBottom: 10,
        alignItems: 'center'
    },
    title: {
        paddingBottom: 5,
        fontFamily: 'open-sans-bold',
        fontSize: 20
    }
});


export default EvalSelectionScreen;