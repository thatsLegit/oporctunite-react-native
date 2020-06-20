import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Shadow from '../../UI/Shadow';


const SelectedSousCategorieItem = props => {
    return (
        <Shadow style={styles.catContainer}>
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
        </Shadow>
    );
};

const styles = StyleSheet.create({
    catContainer: {
        margin: 2,
        borderColor: 'black',
        borderWidth: 1,
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