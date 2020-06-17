//actions
import { SELECTIONNER_SOUS_CATEG, DESELECTIONNER_SOUS_CATEG, SET_SOUS_CATEG } from '../actions/sousCateg';
//models
import SousCategorie from '../../models/SousCategorie';

//Etat initial
const initialState = {
    sousCategories: {}, // Ensemble des sous-categ fetch depuis l'api, donc toutes les categs
    sousCategSelection: {}  // Ensemble des sous-categ séléctionnées, initialement vide
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECTIONNER_SOUS_CATEG:
            const { nom_sous_categ, nom_categ } = action.categ;
            const addedSousCateg = new SousCategorie(nom_sous_categ, nom_categ);
            return {
                ...state,                                              //key        :     //value
                sousCategSelection: { ...state.sousCategSelection, [nom_sous_categ]: addedSousCateg },
            };
        case DESELECTIONNER_SOUS_CATEG:
            const nom = action.nom_sous_categ;
            let updatedSousCategSelection = { ...state.sousCategSelection };
            delete updatedSousCategSelection[nom];
            return {
                ...state,
                sousCategSelection: updatedSousCategSelection
            };
        default:
            return state;
    }
}
