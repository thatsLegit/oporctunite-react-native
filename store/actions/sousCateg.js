//models
import Evaluation from '../../models/Evaluation';
//actions
export const SELECTIONNER_SOUS_CATEG = 'SELECTIONNER_SOUS_CATEG';
export const DESELECTIONNER_SOUS_CATEG = 'DESELECTIONNER_SOUS_CATEG';
export const SET_SOUS_CATEG = 'SET_SOUS_CATEG';
export const SET_EVALUATION_BY_SOUS_CATEGORY = 'SET_EVALUATION_BY_SOUS_CATEGORY';
export const SUPPRIMER_TOUTE_LA_SELECTION = 'SUPPRIMER_TOUTE_LA_SELECTION';


export const fetchSousCateg = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/sousCategories";
        const bearer = 'Bearer ' + token;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        });

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
        const token = getState().auth.token;
        const bearer = 'Bearer ' + token;

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
            let url = `https://oporctunite.envt.fr/oporctunite-api/api/v1/sousCategories/${sousCat}/evaluations/sousCategorie`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'authorization': bearer,
                    'Content-Type': 'application/json'
                }
            });

            const resData = await response.json();

            let loadedEvaluations = [];
            resData.data.forEach(e => {
                loadedEvaluations.push(new Evaluation(
                    e.nomEvaluation,
                    e.priorite,
                    e.idLiaison,
                    e.description,
                    e.nomCategorieP,
                    e.nbTruies
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

export const supprimerSousCategSelection = () => {
    return { type: SUPPRIMER_TOUTE_LA_SELECTION };
};

export const ajouterALaSelection = (nom_sous_categ, nom_categ) => {
    return {
        type: SELECTIONNER_SOUS_CATEG, categ: {
            nom_sous_categ,
            nom_categ
        }
    };
};

