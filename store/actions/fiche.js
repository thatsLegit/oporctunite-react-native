import {
    insertFiche, dropFiches, fetchAllFiches,
    insertFavoris, dropFavoris, fetchAllFavoris, fetchFichesFavoris
} from '../../helper/db/requetes';
const slugify = require('slugify');
import * as FileSystem from 'expo-file-system';
//Models
import Fiche from '../../models/Fiche';
//Actions
export const SET_FICHES = 'SET_FICHES';
export const SET_FAVORIS = 'SET_FAVORIS';
export const ADD_FAVORIS = 'ADD_FAVORIS';
export const DELETE_FAVORIS = 'DELETE_FAVORIS';
export const SET_SAVE = 'SET_SAVE';
export const ADD_SAVE = 'ADD_SAVE';
export const DELETE_SAVE = 'DELETE_SAVE';


export const fetchFiches = isConnected => {
    return async (dispatch, getState) => {

        const maj = getState().auth.maj;
        let loadedFiches = {};

        //Une fois tous les 7j min, si on a une co :
        //insert/drop toutes les lignes de la table fiche (sqlite)
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
            //Le reste du temps, fetch les données sur sqlite (en ligne ou hors-ligne)
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

        //Dispatcher dans le store
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

export const fetchFichesSaved = () => {
    return async (dispatch, getState) => {
        const fiches = Object.values(getState().fiche.fiches);
        let savedFiches = [];

        for (let fiche of fiches) {
            let path = FileSystem.documentDirectory + slugify(fiche.titreFiche, { locale: 'fr' }) + '.pdf';
            const result = await FileSystem.getInfoAsync(path);
            if (result.exists) {
                savedFiches.push(fiche.titreFiche);
            }
        }

        dispatch({ type: SET_SAVE, savedFiches });
    }
};

export const deleteFicheSaved = titreFiche => {
    return { type: DELETE_SAVE, titreFiche };
};

export const addFicheSaved = titreFiche => {
    return { type: ADD_SAVE, titreFiche };
};