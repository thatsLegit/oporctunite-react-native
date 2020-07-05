import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import ListeSousCategorie from '../../../../components/Eleveur/Evaluations/ListeSousCategorie';
import TopNavigationForm from '../../../../components/Navigation/TopNavigationForm';


const BonEtatGeneralScreen = props => {
    const emptySelectionOrNot = useSelector(state => state.sousCateg.sousCategSelection);
    return (
        <View>
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
            <ListeSousCategorie nomSCateg='Bon état général' />
        </View>
    );
};


export default BonEtatGeneralScreen;