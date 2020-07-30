import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Shadow from '../../UI/Shadow';
import { lineBreaker } from '../../../helper/LineBreaker';


const SelectedSousCategorieItem = props => {

    return (
        <Shadow style={styles.catContainer}>
            <View style={styles.selectedCatInnerContainer}>
                <Text style={styles.selectedCatText}>
                    {lineBreaker(props.nom, 20)}
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
        borderRadius: 8
    },
    selectedCatText: {
        margin: 3
    },
    selectedCatInnerContainer: {
        flexDirection: 'row'
    }
});


export default SelectedSousCategorieItem;