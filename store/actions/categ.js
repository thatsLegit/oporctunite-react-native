//models
import SousCategorie from '../../models/SousCategorie';
//actions
export const SET_CATEG = 'SET_CATEG';
export const SET_SOUS_CATEG_BY_CATEGORY = 'SET_SOUS_CATEG_BY_CATEGORY';


export const fetchCateg = () => {
    return async (dispatch) => {
        const response = await fetch('https://oporctunite.envt.fr/oporctunite-api/api/v1/categories');
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

export const fetchSousCategByCateg = (categG) => {
    let categ = categG.replace('é', 'e');
    return async (dispatch) => {
        const response = await fetch(`https://oporctunite.envt.fr/oporctunite-api/api/v1/categories/${categ}/sousCategories/categorie`);
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

        dispatch({ type: SET_SOUS_CATEG_BY_CATEGORY, sousCateg: loadedSousCategories, categG });
    };
};