//models
import SousCategorie from '../../models/SousCategorie';
//actions
export const SELECTIONNER_SOUS_CATEG = 'SELECTIONNER_SOUS_CATEG';
export const DESELECTIONNER_SOUS_CATEG = 'DESELECTIONNER_SOUS_CATEG';
export const SET_SOUS_CATEG = 'SET_SOUS_CATEG';


export const fetchSousCateg = () => {
    return async (dispatch) => {
        const response = await fetch('https://oporctunite.envt.fr/oporctunite-api/api/v1/sousCategories');
        const resData = await response.json();
        let loadedSousCategories = {};
        resData.data.forEach(categ => {
            loadedSousCategories = {
                ...loadedSousCategories, [categ.nomCategorieP]: new SousCategorie(
                    categ.nomCategorieP,
                    categ.nomCategorieG
                )
            }
        });

        dispatch({ type: SET_SOUS_CATEG, sousCateg: loadedSousCategories });
    };
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

