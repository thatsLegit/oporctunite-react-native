//actions
import { SET_SOUS_CATEG_BY_CATEGORY, SET_CATEG, SELECTIONNER_CATEG, DESELECTIONNER_CATEG } from '../actions/categ';

import Categorie from '../../models/Categorie';

//Etat initial
const initialState = {
    categories: {}, //contient toutes les catégories avec les sous-catégories correspondantes
    categSelection: "pnull",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEG:
            return {
                categories: action.categ
            };
        case SET_SOUS_CATEG_BY_CATEGORY:
            return {
                ...state,
                categories: { ...state.categories, [action.categG]: action.sousCateg }
            };
        case SELECTIONNER_CATEG:
            const nom_categ = action.categ;
            const addedCateg = new Categorie(nom_categ);
            return {    
                ...state,                                        
                categSelection: addedCateg,
            };         
        case DESELECTIONNER_CATEG:
            return {
                ...state,
                categSelection: null
            };
        default:
            return state;
    }
};