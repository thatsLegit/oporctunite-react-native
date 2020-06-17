import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

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
            <View><Text>{item.nomSousCateg}</Text></View>
        )
    }

    return (
        <View>
            <CategSelectionForm
                navigation={props.navigation}
                retour='CategSelection'
                textRetour='Retour catégories'
                valider='EvalInfo'
                textValider='Valider selection'
            />
            <FlatList
                data={selectedCat}
                numColumns={3}
                renderItem={(itemData) => selectedCatHandler(itemData.item)}
                keyExtractor={item => item.nomSousCateg}
            />
            <FlatList
                data={dataSource}
                numColumns={3}
                renderItem={itemData => <View><Text>{itemData.item.title}</Text></View>}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};


const styles = StyleSheet.create({
});


export default EvalSelectionScreen;