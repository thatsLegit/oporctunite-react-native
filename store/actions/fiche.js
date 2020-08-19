import {
    insertFiche, dropFiches, fetchAllFiches,
    insertFavoris, dropFavoris, fetchAllFavoris, fetchFichesFavoris
} from '../../helper/db/requetes';
//Models
import Fiche from '../../models/Fiche';
//Actions
export const SET_FICHES = 'SET_FICHES';
export const SET_FAVORIS = 'SET_FAVORIS';
export const ADD_FAVORIS = 'ADD_FAVORIS';
export const DELETE_FAVORIS = 'DELETE_FAVORIS';


export const fetchFiches = isConnected => {
    return async (dispatch, getState) => {

        const maj = getState().auth.maj;
        let loadedFiches = {};

        if (isConnected && maj) {
            const token = getState().auth.token;
            const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/fiches";
            const bearer = 'Bearer ' + token;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'authorization': bearer,
                    'Content-Type': 'application/json'
                }
            });

            const resData = await response.json();
            await dropFiches();

            for (const fiche of resData.data) {
                await insertFiche(fiche.titreFiche, fiche.urlImage, fiche.nomCategorieG);
                loadedFiches = {
                    ...loadedFiches, [fiche.titreFiche]: new Fiche(
                        fiche.titreFiche,
                        fiche.urlImage,
                        fiche.nomCategorieG
                    )
                }
            };

        } else {
            const fiches = await fetchAllFiches();

            for (const fiche of fiches.rows._array) {
                loadedFiches = {
                    ...loadedFiches, [fiche.titreFiche]: new Fiche(
                        fiche.titreFiche,
                        fiche.urlImage,
                        fiche.nomCategorieG
                    )
                }
            }
        }

        dispatch({ type: SET_FICHES, fiches: loadedFiches });
    };
};

export const fetchFavoris = isConnected => {
    return async (dispatch, getState) => {

        const idutilisateur = getState().auth.idutilisateur;
        let loadedFavoris = {};

        if (isConnected) {
            const token = getState().auth.token;
            const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/favoris";
            const bearer = 'Bearer ' + token;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'authorization': bearer,
                    'Content-Type': 'application/json'
                }
            });

            const resData = await response.json();
            await dropFavoris(idutilisateur);

            for (const favoris of resData.data) {
                await insertFavoris(idutilisateur, favoris.titreFiche, favoris.dateFavoris);
                const fiche = await fetchFichesFavoris(favoris.titreFiche);
                loadedFavoris = {
                    ...loadedFavoris, [fiche.rows._array[0].titreFiche]: new Fiche(
                        fiche.rows._array[0].titreFiche,
                        fiche.rows._array[0].urlImage,
                        fiche.rows._array[0].nomCategorieG
                    )
                };
            }

        } else {
            const favoris = await fetchAllFavoris(idutilisateur);

            for (const fav of favoris.rows._array) {
                const fiche = await fetchFichesFavoris(fav.titreFiche);
                loadedFavoris = {
                    ...loadedFavoris, [fiche.titreFiche]: new Fiche(
                        fiche.titreFiche,
                        fiche.urlImage,
                        fiche.nomCategorieG
                    )
                };
            }
        }

        dispatch({ type: SET_FAVORIS, favoris: loadedFavoris });
    };
};

export const ajouterFavoris = fiche => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/favoris";
        const bearer = 'Bearer ' + token;

        const titreFiche = fiche.titreFiche;

        await fetch(url, {
            method: 'POST',
            headers: {
                'authorization': bearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titreFiche
            })
        });

        dispatch({ type: ADD_FAVORIS, fiche });
    }
}

export const supprimerFavoris = titreFiche => {
    return async (dispatch, getState) => {

        let modifiedTitle = titreFiche.replace(/ /g, '+');

        const token = getState().auth.token;
        const url = `https://oporctunite.envt.fr/oporctunite-api/api/v1/favoris/${modifiedTitle}`;
        const bearer = 'Bearer ' + token;

        await fetch(url, {
            method: 'DELETE',
            headers: {
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        });

        dispatch({ type: DELETE_FAVORIS, titreFiche });
    }
}