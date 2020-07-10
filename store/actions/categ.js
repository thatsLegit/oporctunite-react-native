//models
import SousCategorie from '../../models/SousCategorie';
//actions
export const SET_CATEG = 'SET_CATEG';
export const SET_SOUS_CATEG_BY_CATEGORY = 'SET_SOUS_CATEG_BY_CATEGORY';



export const fetchCateg = () => {
    return async (dispatch, getState) => {
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

        let loadedCategories = {};
        resData.data.forEach(categ => {
            loadedCategories = {
                ...loadedCategories, [categ.nomCategorieG]: {}
            }
        });

        dispatch({ type: SET_CATEG, categ: loadedCategories });
    };
};

export const fetchSousCategByCateg = () => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const bearer = 'Bearer ' + token;

        let categ = [];
        const categorie_g = getState().categ.categories;
        let categOriginal = [];

        for (const key in categorie_g) {
            categOriginal.push(key);
            const categModified = key.replace('é', 'e');
            categ.push(categModified);
        }

        //Attention, cette fonction envoie plusieurs dispatch vers les reducers (for let..of..)
        let count = 0;
        for (let cat of categ) {
            let url = `https://oporctunite.envt.fr/oporctunite-api/api/v1/categories/${cat}/sousCategories/categorie`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'authorization': bearer,
                    'Content-Type': 'application/json'
                }
            });
            const resData = await response.json();
            let loadedSousCategories = {};
            resData.data.forEach(c => {
                loadedSousCategories = {
                    ...loadedSousCategories, [c.nomCategorieP]: new SousCategorie(
                        c.nomCategorieP,
                        c.nomCategorieG
                    )
                }
            });

            const categG = categOriginal[count];
            count++;
            dispatch({ type: SET_SOUS_CATEG_BY_CATEGORY, sousCateg: loadedSousCategories, categG });
        }
    };
};