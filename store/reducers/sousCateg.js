//actions
import { SELECTIONNER_SOUS_CATEG, DESELECTIONNER_SOUS_CATEG, SET_SOUS_CATEG, SET_EVALUATION_BY_SOUS_CATEGORY, SUPPRIMER_TOUTE_LA_SELECTION } from '../actions/sousCateg';
//models
import SousCategorie from '../../models/SousCategorie';

//Etat initial
const initialState = {
    sousCategories: {}, // Ensemble des sous-categ, avec les évals correspondantes { x: {[], [], ...}, y: ...}
    sousCategSelection: {}  // Ensemble des sous-categ séléctionnées, initialement vide { x: {}, y: {}}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SOUS_CATEG:
            return {
                sousCategories: action.sousCateg
            };
        case SET_EVALUATION_BY_SOUS_CATEGORY:
            return {
                ...state,
                sousCategories: { ...state.sousCategories, [action.categP]: action.evaluation }
            };
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
        case SUPPRIMER_TOUTE_LA_SELECTION:
            return {
                ...state,
                sousCategSelection: new Object()
            }
        default:
            return state;
    }
};
