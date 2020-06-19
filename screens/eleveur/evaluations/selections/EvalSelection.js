import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox } from "native-base"

import Colors from '../../../../constants/Colors';
import CategSelectionForm from '../../../../components/Eleveur/Evaluations/CategSelectionForm';
import * as sousCategActions from '../../../../store/actions/sousCateg';
import SelectedSousCategorieItem from '../../../../components/Eleveur/Evaluations/SelectedSousCategorieItem';
import CorrespondingEvaluations from '../../../../components/Eleveur/Evaluations/CorrespondingEvaluations';


const EvalSelectionScreen = props => {

    let selectedSousCatNames = [];
    let dataSource = []; //array qui contient les évaluation correspondant aux sous-catégories séléctionnées
    let newDataSource = [];

    const [selectAll, setSelectAll] = useState(false);

    const selectedSousCat = useSelector(state => Object.values(state.sousCateg.sousCategSelection)); //array qui contient les sous-catégories
    for (sousCat of selectedSousCat) {
        selectedSousCatNames.push(sousCat.nomSousCateg);
    }

    for (let name of selectedSousCatNames) {
        newDataSource = useSelector(state => Object.values(state.sousCateg.sousCategories[name]));
        dataSource = newDataSource.concat(dataSource);
        newDataSource = [];
    }

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
                    style={{ flexGrow: 0 }}
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
            <View style={{ maxHeight: (Dimensions.get('window').height / 2) * 1.1 }}>
                <FlatList
                    style={{ flexGrow: 0 }}
                    ListHeaderComponent={(
                        <View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>Evaluations disponibles ({dataSource.length})</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 5 }}>
                                <CheckBox style={{ marginRight: 15 }} color={Colors.accent} onPress={() => setSelectAll(!selectAll)} />
                                <Text style={{ fontFamily: 'open-sans', fontSize: 15 }}>Tout selectionner</Text>
                            </View>
                        </View>
                    )}
                    data={dataSource}
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
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        marginBottom: 5,
        fontFamily: 'open-sans-bold',
        fontSize: 20
    }
});


export default EvalSelectionScreen;