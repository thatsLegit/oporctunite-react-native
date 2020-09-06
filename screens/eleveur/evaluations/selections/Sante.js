import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import ListeSousCategorie from '../../../../components/Evaluations/Selection/ListeSousCategorie';
import TopNavigationForm from '../../../../components/Navigation/TopNavigationForm';

//L'un des 4 écrans de la navigation par tab ou onglets de la séléction des sous-catégories de tests.


const SanteScreen = props => {
    const emptySelectionOrNot = useSelector(state => state.sousCateg.sousCategSelection);
    return (
        <View style={{ flex: 1 }}>
            <TopNavigationForm
                navigation={props.navigation}
                retour='EvalRecap'
                textRetour='Revenir au récap'
                valider='EvalSelection'
                textValider='Valider selection'
                selection={emptySelectionOrNot}
                type='sous-catégorie'
                check={true}
            />
            <ListeSousCategorie nomSCateg='Santé' />
        </View>
    );
};


export default SanteScreen;