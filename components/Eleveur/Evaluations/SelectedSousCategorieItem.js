import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';


const SelectedSousCategorieItem = props => {
    return (
        <View style={styles.catContainer}>
            <View style={styles.selectedCatInnerContainer}>
                <Text style={styles.selectedCatText}>
                    {props.nom.substring(0, 22)}
                    {props.nom.length > 23 && "\n"}
                    {props.nom.substring(22, 40)}
                    {props.nom.length > 41 && "\n"}
                    {props.nom.substring(40, 65)}
                </Text>
                <TouchableOpacity onPress={props.onRemove}>
                    <Entypo name="squared-cross" size={25} color="red" />
                </TouchableOpacity>
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
    }
});


export default SelectedSousCategorieItem;