import React from 'react';
import { View } from 'react-native';
import ListeSousCategorie from '../../../../components/Eleveur/Evaluations/ListeSousCategorie';
import TopNavigationForm from '../../../../components/Navigation/TopNavigationForm';


const BonneSanteScreen = props => {
    return (
        <View>
            <TopNavigationForm
                navigation={props.navigation}
                retour='EvalRecap'
                textRetour='Revenir au récap'
                valider='EvalSelection'
                textValider='Valider selection'
            />
            <ListeSousCategorie nomSCateg='Bonne santé' />
        </View>
    );
};


export default BonneSanteScreen;