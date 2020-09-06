import { fetchAllCategoriesP, dropCategorieP, insertCategorieP, getEvaluationGivenSousCateg, fetchAllEvaluations } from '../../helper/db/requetes';
//models
import Evaluation from '../../models/Evaluation';
//actions
export const SELECTIONNER_SOUS_CATEG = 'SELECTIONNER_SOUS_CATEG';
export const DESELECTIONNER_SOUS_CATEG = 'DESELECTIONNER_SOUS_CATEG';
export const SET_SOUS_CATEG = 'SET_SOUS_CATEG';
export const SET_EVALUATION_BY_SOUS_CATEGORY = 'SET_EVALUATION_BY_SOUS_CATEGORY';
export const SUPPRIMER_TOUTE_LA_SELECTION = 'SUPPRIMER_TOUTE_LA_SELECTION';


export const fetchSousCateg = isConnected => {
    return async (dispatch, getState) => {

        const maj = getState().auth.maj;
        let loadedSousCategories = {};

        //Une fois tous les 7j min, si on a une co :
        //insert/drop toutes les lignes de la table Categorie_P (sqlite)
        if (isConnected && maj) {
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
            await dropCategorieP();

            for (const sCateg of resData.data) {
                await insertCategorieP(sCateg.nomCategorieP, sCateg.nomCategorieG);
                loadedSousCategories = {
                    ...loadedSousCategories, [sCateg.nomCategorieP]: []
                }
            }

        } else {
            //Le reste du temps, fetch les données sur sqlite (en ligne ou hors-ligne)
            const sousCategories = await fetchAllCategoriesP();

            for (const sCateg of sousCategories.rows._array) {
                loadedSousCategories = {
                    ...loadedSousCategories, [sCateg.nomCategorieP]: []
                }
            }
        }

        //Dispatcher dans le store
        dispatch({ type: SET_SOUS_CATEG, sousCateg: loadedSousCategories });
    };
};

export const fetchEvaluationBySousCateg = () => {
    return async (dispatch, getState) => {

        let sousCateg = [];
        const categorie_p = getState().sousCateg.sousCategories;

        for (const key in categorie_p) {
            sousCateg.push(key);
        }

        //Cette fonction envoie plusieurs dispatch vers les reducers
        for (let sousCat of sousCateg) {
            const evaluations = await getEvaluationGivenSousCateg(sousCat);

            let loadedEvaluations = [];

            for (const e of evaluations.rows._array) {
                loadedEvaluations.push(new Evaluation(
                    e.nomEvaluation,
                    e.priorite,
                    e.idLiaison,
                    e.description,
                    e.nomCategorieP,
                    e.nbTruies
                ));
            }

            dispatch({ type: SET_EVALUATION_BY_SOUS_CATEGORY, evaluation: loadedEvaluations, sousCat });
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

