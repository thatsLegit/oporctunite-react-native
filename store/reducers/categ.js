//actions
import { SET_SOUS_CATEG_BY_CATEGORY, SET_CATEG } from '../actions/categ';


//Etat initial
const initialState = {
    categories: {}
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
            }
        default:
            return state;
    }
};