import React from 'react';
import { View } from 'react-native';
import ListeSousCategorie from '../../../../components/Eleveur/Evaluations/ListeSousCategorie';
import CategSelectionFrom from '../../../../components/Eleveur/Evaluations/CategSelectionForm';


const HebergementApproprieScreen = props => {
    return (
        <View>
            <CategSelectionFrom />
            <ListeSousCategorie />
        </View>
    );
};


export default HebergementApproprieScreen;