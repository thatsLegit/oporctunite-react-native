import { insertFiche, dropFiches, fetchAllFiches } from '../../helper/db/requetes';
//Models
import Fiche from '../../models/Fiche';
//Actions
export const SET_FICHES = 'SET_FICHES';


export const fetchFiches = isConnected => {
    return async (dispatch, getState) => {

        const maj = getState().auth.maj;
        let loadedFiches = {};

        //isConnected && maj
        if (1 == 1) {
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
