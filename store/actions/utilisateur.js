import { fetchUserData, dropUserData, insertUserData } from '../../helper/db/requetes';
import NetInfo from '@react-native-community/netinfo';

export const SET_UTILISATEUR = 'SET_UTILISATEUR';
export const UPDATE_PERSONAL_DATA = 'UPDATE_PERSONAL_DATA';


export const fetchUtilisateur = isConnected => {
    return async (dispatch, getState) => {

        const idutilisateur = getState().auth.idutilisateur;

        if (isConnected) {
            const token = getState().auth.token;
            const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/auth/me";
            const bearer = 'Bearer ' + token;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'authorization': bearer,
                    'Content-Type': 'application/json'
                }
            });

            //Dans sqlite: idutilisateur, nomElevage, codePostal, adresse, ville, email, telephone, tailleElevage

            const resData = await response.json();
            const elevage = resData.elevage;
            const utilisateur = resData.utilisateur;

            await dropUserData(idutilisateur);
            await insertUserData(idutilisateur, elevage.nomElevage, utilisateur.codePostal, utilisateur.adresse, utilisateur.ville, utilisateur.email, utilisateur.telephone, elevage.tailleElevage);

            //Dans le store: l'integralité des tables utilisateur et elevage de mysql distante
            dispatch({ type: SET_UTILISATEUR, utilisateur, elevage });

        } else {

            //Si pas de co, dans le store, la même chose que dans sqlite
            const result = await fetchUserData(idutilisateur);
            const userData = result.rows._array[0];

            const elevage = {
                nomElevage: userData.nomElevage,
                tailleElevage: userData.tailleElevage
            };
            const utilisateur = {
                adresse: userData.adresse,
                codePostal: userData.codePostal,
                email: userData.email,
                telephone: userData.telephone,
                ville: userData.ville
            };

            dispatch({ type: SET_UTILISATEUR, utilisateur, elevage });
        }
    };
};

export const changerDonneesPersos = data => {
    return async (dispatch, getState) => {

        const connection = await NetInfo.fetch();

        if (connection.isConnected) {
            //Modif sur l'api
            const token = getState().auth.token;
            const url = 'https://oporctunite.envt.fr/oporctunite-api/api/v1/utilisateurs/userData';
            const bearer = 'Bearer ' + token;

            await fetch(url, {
                method: 'PUT',
                headers: {
                    'authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            //Modif sur le store
            const utilisateurData = {
                codePostal: parseInt(data.codePostal),
                adresse: data.adresse,
                ville: data.ville,
                email: data.email,
                telephone: parseInt(data.telephone),
            };
            const elevageData = {
                nomElevage: data.nomElevage,
                tailleElevage: parseInt(data.tailleElevage)
            };

            dispatch({ type: UPDATE_PERSONAL_DATA, utilisateurData, elevageData });
        } else {
            throw new Error('Pas de connexion internet, action impossible.');
        }
    }
};