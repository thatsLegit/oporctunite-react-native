import React from 'react';
import { View } from 'react-native';
import ListeSousCategorie from '../../../../components/Eleveur/Evaluations/ListeSousCategorie';
import CategSelectionFrom from '../../../../components/Eleveur/Evaluations/CategSelectionForm';


const ComportementApproprieScreen = props => {
    return (
        <View>
            <CategSelectionFrom />
            <ListeSousCategorie />
        </View>
    );
};



export default ComportementApproprieScreen;