//actions
export const SET_NOTE_CATEG = 'SET_NOTE_CATEG';
export const SET_NOTE_GLOBALE_CATEG = 'SET_NOTE_GLOBALE_CATEG';

export const SET_NOTE_SOUS_CATEG = 'SET_NOTE_SOUS_CATEG';
export const SET_NOTE_GLOBALE_SOUS_CATEG = 'SET_NOTE_GLOBALE_SOUS_CATEG';

export const SET_NOTE_EVALUATIONS = 'SET_NOTE_EVALUATIONS';
export const SET_NOTE_GLOBALE_EVALUATIONS = 'SET_NOTE_GLOBALE_EVALUATIONS';

export const fetchNoteCategories = () => {
    return async (dispatch) => {
        const response = await fetch('https://oporctunite.envt.fr/oporctunite-api/api/v1/eleveurs/FR00000/bilans/categorie');
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


export const fetchNoteSousCategories = () => {
    return async (dispatch) => {
        const response = await fetch('https://oporctunite.envt.fr/oporctunite-api/api/v1/eleveurs/FR00000/bilans/sous-categorie');
        const resData = await response.json();
        
        let loadedNoteSousCategories = {};
        resData.data.forEach(sousCateg => {
            loadedNoteSousCategories = {
                ...loadedNoteSousCategories,  [sousCateg.nomCategorieP]: {[sousCateg.moyenneP]: sousCateg.nomCategorieG}  
            }
        });

        dispatch({ type: SET_NOTE_SOUS_CATEG, bilan: loadedNoteSousCategories });
    };
};

export const fetchNoteGlobaleSousCategories = () => {
    return async (dispatch) => {
        const response = await fetch('https://oporctunite.envt.fr/oporctunite-api/api/v1/bilans/sous-categorie');
        const resData = await response.json();
        let loadedNoteGlobaleSousCategories = {};
        resData.data.forEach(sousCateg => {
            loadedNoteGlobaleSousCategories = {
                ...loadedNoteGlobaleSousCategories, [sousCateg.nomCategorieP]: {[sousCateg.moyenneP]: sousCateg.nomCategorieG} 
            }
        });

        dispatch({ type: SET_NOTE_GLOBALE_SOUS_CATEG, bilan: loadedNoteGlobaleSousCategories });
    };
};

export const fetchNoteEvaluations = () => {
    return async (dispatch) => {
        const response = await fetch('https://oporctunite.envt.fr/oporctunite-api/api/v1/eleveurs/FR00000/bilans/evaluation');
        const resData = await response.json();
        
        let loadedNoteEvaluations = {};
        resData.data.forEach(eva => {
            loadedNoteEvaluations = {
                ...loadedNoteEvaluations,  [eva.nomEvaluation]: {[eva.valeur]: eva.dateT}  
            }
        });

        dispatch({ type: SET_NOTE_EVALUATIONS, bilan: loadedNoteEvaluations });
    };
};

export const fetchNoteGlobaleEvaluations = () => {
    return async (dispatch) => {
        const response = await fetch('https://oporctunite.envt.fr/oporctunite-api/api/v1/bilans/evaluation');
        const resData = await response.json();
        let loadedNoteGlobaleEvaluations = {};
        resData.data.forEach(eva => {
            loadedNoteGlobaleEvaluations = {
                ...loadedNoteGlobaleEvaluations, [eva.nomEvaluation]: {[eva.valeur]: eva.dateT} 
            }
        });

        dispatch({ type: SET_NOTE_GLOBALE_EVALUATIONS, bilan: loadedNoteGlobaleEvaluations });
    };
};