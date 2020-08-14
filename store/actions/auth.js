var jwtDecode = require('jwt-decode');
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AUTO_LOGIN = 'SET_DID_TRY_AUTO_LOGIN';
export const SET_UTILISATEUR = 'SET_UTILISATEUR';


export const setDidTryAutoLogin = () => {
    return { type: SET_DID_TRY_AUTO_LOGIN };
};

//set a date in localStorage on login, 
//on authenticate, if that date is older than 7 days and the user has internet
//set majDate to true in the store
//set the date back to Date.now() in localstorage
//then, the rest of the time majDate is set to false
export const authenticate = (idutilisateur, token, forceUpdate) => {
    return async dispatch => {
        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { majDate } = transformedData;

        const connection = await NetInfo.fetch();

        if ((Date.now() - majDate > 86400000 * 7 || forceUpdate) && connection.isConnected) {
            AsyncStorage.setItem('userData', JSON.stringify({
                ...transformedData,
                majDate: Date.now()
            }));

            dispatch({ type: AUTHENTICATE, idutilisateur, token, maj: true });
        } else {
            dispatch({ type: AUTHENTICATE, idutilisateur, token, maj: false });
        }
    }
};

export const logout = () => {
    AsyncStorage.removeItem('userData'); //clear local storage token
    return { type: LOGOUT }; //clear redux state
};

export const login = (login, password) => {
    return async dispatch => {

        let connection = await NetInfo.fetch();

        if (connection.isConnected) {
            const response = await fetch('https://oporctunite.envt.fr/oporctunite-api/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: login,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Identifiant ou mot de passe incorrect!');
            }

            const resData = await response.json();
            const decoded = jwtDecode(resData.token);
            const idutilisateur = decoded.idutilisateur;

            saveDataToStorage(idutilisateur, resData.token);
            dispatch(authenticate(idutilisateur, resData.token, true));

        } else throw new Error('Pas de connexion internet, connexion impossible.');
    };
};

export const signup = (login, password) => {
    return async dispatch => {
        throw new Error("Inscription pour le moment indisponible sur l'appli, vous pouvez créer un compte sur notre site web O'porctunité !");
    }
};

export const setUtilisateur = () => {
    return async (dispatch, getState) => {
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

        const resData = await response.json();
        dispatch({ type: SET_UTILISATEUR, utilisateur: resData.utilisateur, elevage: resData.elevage });
    };
};

const saveDataToStorage = async (idutilisateur, token) => {
    const majDate = Date.now();
    await AsyncStorage.setItem('userData', JSON.stringify({
        token,
        idutilisateur,
        majDate
    }));
};