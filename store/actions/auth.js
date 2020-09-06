var jwtDecode = require('jwt-decode');
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AUTO_LOGIN = 'SET_DID_TRY_AUTO_LOGIN';


export const setDidTryAutoLogin = () => {
    return { type: SET_DID_TRY_AUTO_LOGIN };
};

//localStorage -> get date, 
//if that date is older than 7 days and the user has an internet connexion :
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

        const connection = await NetInfo.fetch();

        //tentative de connexion
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

            //Placement de données utilisateur en cache
            saveDataToStorage(idutilisateur, resData.token);
            //Placement de données utililisateur dans le store
            dispatch(authenticate(idutilisateur, resData.token, true));

        } else
            throw new Error('Pas de connexion internet, connexion impossible.');
    };
};

//Données de cache
const saveDataToStorage = async (idutilisateur, token) => {
    const majDate = Date.now();
    await AsyncStorage.setItem('userData', JSON.stringify({
        token,
        idutilisateur,
        majDate
    }));
};

