export const SET_NOTE_CATEG = 'SET_NOTE_CATEG';
export const SET_NOTE_GLOBALE_CATEG = 'SET_NOTE_GLOBALE_CATEG';

export const SET_NOTE_SOUS_CATEG = 'SET_NOTE_SOUS_CATEG';
export const SET_NOTE_GLOBALE_SOUS_CATEG = 'SET_NOTE_GLOBALE_SOUS_CATEG';

export const SET_NOTE_EVALUATIONS = 'SET_NOTE_EVALUATIONS';
export const SET_NOTE_GLOBALE_EVALUATIONS = 'SET_NOTE_GLOBALE_EVALUATIONS';

export const fetchNoteCategories = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/bilans/categories/elevage";
        const bearer = 'Bearer ' + token;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        });
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
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/bilans/categories";
        const bearer = 'Bearer ' + token;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        });

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
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/bilans/sous-categories/elevage";
        const bearer = 'Bearer ' + token;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        });

        const resData = await response.json();

        let loadedNoteSousCategories = {};
        resData.data.forEach(sousCateg => {
            loadedNoteSousCategories = {
                ...loadedNoteSousCategories, [sousCateg.nomCategorieP]: { [sousCateg.moyenneP]: sousCateg.nomCategorieG }
            }
        });

        dispatch({ type: SET_NOTE_SOUS_CATEG, bilan: loadedNoteSousCategories });
    };
};

export const fetchNoteGlobaleSousCategories = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/bilans/sous-categories";
        const bearer = 'Bearer ' + token;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        });

        const resData = await response.json();
        let loadedNoteGlobaleSousCategories = {};
        resData.data.forEach(sousCateg => {
            loadedNoteGlobaleSousCategories = {
                ...loadedNoteGlobaleSousCategories, [sousCateg.nomCategorieP]: { [sousCateg.moyenneP]: sousCateg.nomCategorieG }
            }
        });

        dispatch({ type: SET_NOTE_GLOBALE_SOUS_CATEG, bilan: loadedNoteGlobaleSousCategories });
    };
};

export const fetchNoteEvaluations = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/bilans/evaluations/elevage";
        const bearer = 'Bearer ' + token;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        });

        const resData = await response.json();

        let loadedNoteEvaluations = {};
        resData.data.forEach(eva => {
            loadedNoteEvaluations = {
                ...loadedNoteEvaluations,  [eva.idTest]: {[eva.nomEvaluation]: {[eva.dateT]: eva.valeur}}
            }
        });

        dispatch({ type: SET_NOTE_EVALUATIONS, bilan: loadedNoteEvaluations });
    };
};

export const fetchNoteGlobaleEvaluations = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/bilans/evaluations";
        const bearer = 'Bearer ' + token;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        });

        const resData = await response.json();
        let loadedNoteGlobaleEvaluations = {};
        resData.data.forEach(eva => {
            loadedNoteGlobaleEvaluations = {
                ...loadedNoteGlobaleEvaluations, [eva.nomEvaluation]: eva.moyenneE
            }
        });

        dispatch({ type: SET_NOTE_GLOBALE_EVALUATIONS, bilan: loadedNoteGlobaleEvaluations });
    };
};