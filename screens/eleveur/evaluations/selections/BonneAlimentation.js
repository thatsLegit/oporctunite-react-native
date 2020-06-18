import React from 'react';
import { View } from 'react-native';
import ListeSousCategorie from '../../../../components/Eleveur/Evaluations/ListeSousCategorie';
import CategSelectionForm from '../../../../components/Eleveur/Evaluations/CategSelectionForm';
import SousCategorie from '../../../../models/SousCategorie';


const BonneAlimentationScreen = props => {
    return (
        <View>
            <CategSelectionForm
                navigation={props.navigation}
                retour='EvalRecap'
                textRetour='Revenir au récap'
                valider='EvalSelection'
                textValider='Valider selection'
            />
            <ListeSousCategorie />
        </View>
    );
};


export default BonneAlimentationScreen;