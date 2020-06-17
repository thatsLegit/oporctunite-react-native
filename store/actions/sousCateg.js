//models
import SousCategorie from '../../models/SousCategorie';
//actions
export const SELECTIONNER_SOUS_CATEG = 'SELECTIONNER_SOUS_CATEG';
export const DESELECTIONNER_SOUS_CATEG = 'DESELECTIONNER_SOUS_CATEG';
export const SET_SOUS_CATEG = 'SET_SOUS_CATEG';
export const GET_SOUS_CATEG_SELECTION = 'GET_SOUS_CATEG_SELECTION';

//ici on aura aussi l'action de fetch les sous-categ depuis l'api
//Il faut compléter cette fonction
export const fetchSousCateg = () => {
    return async (dispatch) => {
        //const sous_categ = await fetch ...
        //dispatch({ type: SET_SOUS_CATEG, sous_categ });
    }
};

export const supprimerDeLaSelection = nom_sous_categ => {
    return { type: DESELECTIONNER_SOUS_CATEG, nom_sous_categ };
};

export const ajouterALaSelection = (nom_sous_categ, nom_categ) => {
    return {
        type: SELECTIONNER_SOUS_CATEG, categ: {
            nom_sous_categ,
            nom_categ
        }
    };
};

