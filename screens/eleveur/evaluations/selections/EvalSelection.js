import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight, Platform, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { CheckBox } from "native-base"
import { Octicons } from '@expo/vector-icons';

import Colors from '../../../../constants/Colors';
import CategSelectionForm from '../../../../components/Eleveur/Evaluations/CategSelectionForm';

//Normalement ici on devrait fetch les evals correspondant aux sous-categ selectionnées
//Les sous-categ selectionnées se trouve dans store/recucer : sousCategSelection

const EvalSelectionScreen = props => {

    const [choix, setChoix] = useState(false);

    let selectedSousCatNames = [];
    let selectedSousCat = useSelector(state => Object.values(state.sousCateg.sousCategSelection)); //array qui contient les sous-catégories
    for (sousCat of selectedSousCat) {
        selectedSousCatNames.push(sousCat.nomSousCateg);
    }

    let dataSource = []; //array qui contient les évaluation correspondant aux sous-catégories séléctionnées
    let newDataSource = [];
    for (let name of selectedSousCatNames) {
        newDataSource = useSelector(state => Object.values(state.sousCateg.sousCategories[name]));
        dataSource = newDataSource.concat(dataSource);
        newDataSource = [];
    }

    const selectedSousCatHandler = (item) => {
        return (
            <View style={styles.catContainer}>
                <View style={styles.selectedCatInnerContainer}>
                    <Text style={styles.selectedCatText}>
                        {item.nomSousCateg.substring(0, 22)}
                        {item.nomSousCateg.length > 23 && "\n"}
                        {item.nomSousCateg.substring(22, 40)}
                        {item.nomSousCateg.length > 41 && "\n"}
                        {item.nomSousCateg.substring(40, 65)}
                    </Text>
                    <TouchableOpacity>
                        <Entypo name="squared-cross" size={25} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const correspondingEvals = (item) => {
        let Touchable = TouchableOpacity;
        if (Platform.OS == 'android') {
            Touchable = TouchableHighlight;
        }

        return (
            <Touchable onPress={() => setChoix(!choix)}>
                <View style={styles.evalContainer}>
                    <View style={styles.innerText}>
                        <Text style={styles.subTitle}>{item.nomEvaluation}</Text>
                        <Text style={styles.infos}>{item.nomCategorieP}</Text>
                        <View style={styles.infoContainer}>
                            <Text style={{ marginVertical: 20, textAlign: 'center' }}>Mini-image</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <CheckBox
                                color={Colors.primary}
                                checked={choix}
                            />
                            <TouchableOpacity><Octicons name="info" size={25} color="black" /></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Touchable>
        );
    };

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
                    renderItem={itemData => selectedSousCatHandler(itemData.item)}
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
                                <CheckBox style={{ marginRight: 15 }} color={Colors.accent} onPress={() => { }} />
                                <Text style={{ fontFamily: 'open-sans', fontSize: 15 }}>Tout selectionner</Text>
                            </View>
                        </View>
                    )}
                    data={dataSource}
                    numColumns={2}
                    renderItem={itemData => correspondingEvals(itemData.item)}
                    keyExtractor={item => item.nomEvaluation}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    catContainer: {
        margin: 3,
        borderColor: 'black',
        borderWidth: 1,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 8,
        elevation: 5
    },
    selectedCatText: {
        margin: 3
    },
    selectedCatInnerContainer: {
        flexDirection: 'row'
    },
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
    },
    subTitle: {
        marginBottom: 5,
        fontFamily: 'open-sans-bold',
        fontSize: 15
    },
    evalContainer: {
        minWidth: 100,
        maxWidth: Dimensions.get('window').width / 2 - 15,
        minHeight: 80,
        borderColor: 'black',
        borderWidth: 1,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 5, height: 5 },
        elevation: 7,
        borderRadius: 8,
        margin: 10,
        backgroundColor: Colors.secondary
    },
    innerText: {
        padding: 10
    },
    infos: {
        fontSize: 12,
        fontFamily: 'open-sans'
    }
});


export default EvalSelectionScreen;