//actions
export const SET_NOTE_CATEG = 'SET_NOTE_CATEG';
export const SET_NOTE_GLOBALE_CATEG = 'SET_NOTE_GLOBALE_CATEG';


export const fetchNoteCategories = () => {
    return async (dispatch) => {
        const response = await fetch('https://oporctunite.envt.fr/oporctunite-api/api/v1/eleveurs/FR03838/bilans/categorie');
        const resData = await response.json();
        
        let loadedNoteCategories = {};
        resData.data.forEach(categ => {
            loadedNoteCategories = {
                ...loadedNoteCategories, [categ.nomCategorieG]: categ.moyenneG
            }
        });

        dispatch({ type: SET_NOTE_CATEG, bilan: loadedNoteCategories });
    };
};


export const fetchNoteGlobaleCategories = () => {
    return async (dispatch) => {
        const response = await fetch('https://oporctunite.envt.fr/oporctunite-api/api/v1/bilans/categorie');
        const resData = await response.json();
        let loadedNoteGlobaleCategories = {};
        resData.data.forEach(categ => {
            loadedNoteGlobaleCategories = {
                ...loadedNoteGlobaleCategories, [categ.nomCategorieG]: categ.moyenneG
            }
        });

        dispatch({ type: SET_NOTE_GLOBALE_CATEG, bilan: loadedNoteGlobaleCategories });
    };
};
