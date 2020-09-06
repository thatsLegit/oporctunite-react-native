import { fetchAllCategoriesG, dropCategorieG, insertCategorieG, getSousCategoriesGivenCateg } from '../../helper/db/requetes';
//models
import SousCategorie from '../../models/SousCategorie';
//actions
export const SET_CATEG = 'SET_CATEG';
export const SET_SOUS_CATEG_BY_CATEGORY = 'SET_SOUS_CATEG_BY_CATEGORY';


export const fetchCateg = isConnected => {
    return async (dispatch, getState) => {

        const maj = getState().auth.maj;
        let loadedCategories = {};

        //Une fois tous les 7j min, si on a une co :
        //insert/drop toutes les lignes de la table Categorie_G (sqlite)
        if (isConnected && maj) {
            const token = getState().auth.token;
            const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/categories";
            const bearer = 'Bearer ' + token;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'authorization': bearer,
                    'Content-Type': 'application/json'
                }
            });

            const resData = await response.json();
            await dropCategorieG();

            for (const categ of resData.data) {
                await insertCategorieG(categ.nomCategorieG);
                loadedCategories = {
                    ...loadedCategories, [categ.nomCategorieG]: {}
                }
            };

        } else {
            //Le reste du temps, fetch les données sur sqlite (en ligne ou hors-ligne)
            const categories = await fetchAllCategoriesG();

            for (const categ of categories.rows._array) {
                loadedCategories = {
                    ...loadedCategories, [categ.nomCategorieG]: {}
                }
            }
        }

        //Dispatcher dans le store
        dispatch({ type: SET_CATEG, categ: loadedCategories });
    };
};

export const fetchSousCategByCateg = () => {
    return async (dispatch, getState) => {

        let categ = [];
        const categorie_g = getState().categ.categories;

        for (const key in categorie_g) {
            categ.push(key);
        }

        //Cette fonction envoie plusieurs requêtes vers sqlite et dispatch vers redux
        //Pas de requêtes sur l'api, donc fonctionne tant hors-ligne que en ligne
        for (let cat of categ) {
            const sousCategories = await getSousCategoriesGivenCateg(cat);

            let loadedSousCategories = {};

            for (const sCateg of sousCategories.rows._array) {
                loadedSousCategories = {
                    ...loadedSousCategories, [sCateg.nomCategorieP]: new SousCategorie(
                        sCateg.nomCategorieP,
                        sCateg.nomCategorieG
                    )
                };
            }

            dispatch({ type: SET_SOUS_CATEG_BY_CATEGORY, sousCateg: loadedSousCategories, cat });
        }
    };
};