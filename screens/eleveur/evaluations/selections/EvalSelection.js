import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight, Platform, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';

import Colors from '../../../../constants/Colors';
import CategSelectionForm from '../../../../components/Eleveur/Evaluations/CategSelectionForm';

//Normalement ici on devrait fetch les evals correspondant aux sous-categ selectionnées
//Les sous-categ selectionnées se trouve dans store/recucer : sousCategSelection

const EvalSelectionScreen = props => {
    const [dataSource, setdataSource] = useState();
    const selectedCat = useSelector(state => Object.values(state.sousCateg.sousCategSelection), () => true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
            .then(response => response.json())
            .then((responseJson) => {
                setdataSource(responseJson)
            })
    }, []);

    const selectedCatHandler = (item) => {
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
                        <Text style={styles.subTitle}>{item.title.substring(0, 20)}</Text>
                        <View style={styles.infoContainer}>
                            <Text style={{ marginVertical: 20, textAlign: 'center' }}>Mini-image</Text>
                            <Text style={styles.infos}>Catégorie de l'éval</Text>
                            <Text style={styles.infos}>Sous-catégorie de l'éval</Text>
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
                data={selectedCat}
                numColumns={2}
                renderItem={itemData => selectedCatHandler(itemData.item)}
                keyExtractor={item => item.nomSousCateg}
            />
            <View style={{ alignItems: 'center' }}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Tests disponibles</Text>
                </View>
            </View>
            <FlatList
                scrollEnabled={false}
                data={dataSource}
                numColumns={2}
                renderItem={itemData => correspondingEvals(itemData.item)}
                keyExtractor={item => item.id.toString()}
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