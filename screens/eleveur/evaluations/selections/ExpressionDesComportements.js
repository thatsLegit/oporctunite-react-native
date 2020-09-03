import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import ListeSousCategorie from '../../../../components/Evaluations/Selection/ListeSousCategorie';
import TopNavigationForm from '../../../../components/Navigation/TopNavigationForm';


const ExpressionDesComportementsScreen = props => {
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
            <ListeSousCategorie nomSCateg='Expression des comportements' />
        </View>
    );
};



export default ExpressionDesComportementsScreen;