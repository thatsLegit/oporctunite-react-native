import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight, Platform, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';

import Colors from '../../../../constants/Colors';
import CategSelectionForm from '../../../../components/Eleveur/Evaluations/CategSelectionForm';

//Normalement ici on devrait fetch les evals correspondant aux sous-categ selectionnées
//Les sous-categ selectionnées se trouve dans store/recucer : sousCategSelection

const EvalSelectionScreen = props => {

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
                    <Text style={styles.selectedCatText}>{item.nomSousCateg}</Text>
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
            <Touchable>
                <View style={styles.evalContainer}>
                    <View style={styles.innerText}>
                        <Text style={styles.subTitle}>{item.nomEvaluation}</Text>
                        <View style={styles.infoContainer}>
                            <Text style={{ marginVertical: 20, textAlign: 'center' }}>Mini-image</Text>
                            <Text style={styles.infos}>{item.nomEvaluation}</Text>
                            <Text style={styles.infos}>Description</Text>
                        </View>
                    </View>
                </View>
            </Touchable>
        );
    };

    return (
        <ScrollView>
            <CategSelectionForm
                navigation={props.navigation}
                retour='CategSelection'
                textRetour='Retour catégories'
                valider='EvalInfo'
                textValider='Valider selection'
            />
            <FlatList
                scrollEnabled={false}
                data={selectedSousCat}
                numColumns={2}
                renderItem={itemData => selectedSousCatHandler(itemData.item)}
                keyExtractor={item => item.nomSousCateg}
            />
            <View style={{ alignItems: 'center' }}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Evaluations disponibles ({dataSource.length})</Text>
                </View>
            </View>
            <FlatList
                scrollEnabled={false}
                data={dataSource}
                numColumns={2}
                renderItem={itemData => correspondingEvals(itemData.item)}
                keyExtractor={item => item.nomEvaluation}
            />
        </ScrollView>
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
        elevation: 5
    },
    selectedCatText: {
        margin: 3,
    },
    selectedCatInnerContainer: {
        flexDirection: 'row'
    },
    titleContainer: {
        marginTop: 35,
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
        backgroundColor: Colors.primary
    },
    innerText: {
        padding: 10
    },
    infoContainer: {

    },
    infos: {
        fontSize: 12,
        fontFamily: 'open-sans'
    }
});


export default EvalSelectionScreen;