import React from 'react';
import { View } from 'react-native';
import ListeSousCategorie from '../../../../components/Eleveur/Evaluations/ListeSousCategorie';
import CategSelectionForm from '../../../../components/Eleveur/Evaluations/CategSelectionForm';


const BonneSanteScreen = props => {
    return (
        <View>
            <CategSelectionForm
                navigation={props.navigation}
                retour='EvalRecap'
                textRetour='Revenir au récap'
                valider='EvalSelection'
                textValider='Valider selection'
            />
            <ListeSousCategorie categorie='Bonne_sante' />
        </View>
    );
};


export default BonneSanteScreen;