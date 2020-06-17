import React from 'react';
import { View } from 'react-native';
import ListeSousCategorie from '../../../../components/Eleveur/Evaluations/ListeSousCategorie';
import CategSelectionForm from '../../../../components/Eleveur/Evaluations/CategSelectionForm';


const BonneAlimentationScreen = props => {
    return (
        <View>
            <CategSelectionForm navigation={props.navigation} />
            <ListeSousCategorie />
        </View>
    );
};


export default BonneAlimentationScreen;