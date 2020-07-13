var jwtDecode = require('jwt-decode');
import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AUTO_LOGIN = 'SET_DID_TRY_AUTO_LOGIN';
export const SET_UTILISATEUR = 'SET_UTILISATEUR';


export const setDidTryAutoLogin = () => {
    return { type: SET_DID_TRY_AUTO_LOGIN };
};

export const authenticate = (idutilisateur, token) => {
    return { type: AUTHENTICATE, idutilisateur, token };
};

export const logout = () => {
    AsyncStorage.removeItem('userData'); //clear local storage token
    return { type: LOGOUT }; //clear redux state
};

export const login = (login, password) => {
    return async dispatch => {
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

        dispatch(authenticate(idutilisateur, resData.token));
        saveDataToStorage(idutilisateur, resData.token);
    };
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

const saveDataToStorage = (idutilisateur, token) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        idutilisateur
    }));
};