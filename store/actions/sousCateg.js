//models
import Evaluation from '../../models/Evaluation';
//actions
export const SELECTIONNER_SOUS_CATEG = 'SELECTIONNER_SOUS_CATEG';
export const DESELECTIONNER_SOUS_CATEG = 'DESELECTIONNER_SOUS_CATEG';
export const SET_SOUS_CATEG = 'SET_SOUS_CATEG';
export const SET_EVALUATION_BY_SOUS_CATEGORY = 'SET_EVALUATION_BY_SOUS_CATEGORY';


export const fetchSousCateg = () => {
    return async (dispatch) => {
        const response = await fetch('https://oporctunite.envt.fr/oporctunite-api/api/v1/sousCategories');
        const resData = await response.json();
        let loadedSousCategories = {};
        resData.data.forEach(categ => {
            loadedSousCategories = {
                ...loadedSousCategories, [categ.nomCategorieP]: []
            }
        });

        dispatch({ type: SET_SOUS_CATEG, sousCateg: loadedSousCategories });
    };
};

export const fetchEvaluationBySousCateg = () => {
    return async (dispatch, getState) => {
        let sousCateg = [];
        const categorie_p = getState().sousCateg.sousCategories;
        let sousCategOriginal = [];

        for (const key in categorie_p) {
            sousCategOriginal.push(key);
            const sousCategModified = key.replace('é', 'e');
            sousCateg.push(sousCategModified);
        }

        //Attention, cette fonction envoie plusieurs dispatch vers les reducers (for let..of..)
        let count = 0;
        for (let sousCat of sousCateg) {
            const response = await fetch(`https://oporctunite.envt.fr/oporctunite-api/api/v1/sousCategories/${sousCat}/evaluations/sousCategorie`);
            const resData = await response.json();
            let loadedEvaluations = [];
            resData.data.forEach(e => {
                loadedEvaluations.push(new Evaluation(
                    e.nomEvaluation,
                    e.description,
                    e.nomCategorieP
                ))
            });

            const categP = sousCategOriginal[count];
            count++;
            dispatch({ type: SET_EVALUATION_BY_SOUS_CATEGORY, evaluation: loadedEvaluations, categP });
        }
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

