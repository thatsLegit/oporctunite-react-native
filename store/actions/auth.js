import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AUTO_LOGIN = 'SET_DID_TRY_AUTO_LOGIN';


let timer;

export const setDidTryAutoLogin = () => {
    return { type: SET_DID_TRY_AUTO_LOGIN };
};

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        clearLogoutTimer(); //clear timer before setting a new one
        dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, userId, token });
    };
};

export const logout = () => {
    clearLogoutTimer(); //clear timer
    AsyncStorage.removeItem('userData'); //clear local storage token
    return { type: LOGOUT }; //clear redux state
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

//Automatic logout on token expiration ?
const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime)
    };
};

export const login = (login, password) => {
    return async dispatch => {
        const response = await fetch('http://localhost:5000/api/v1/auth/login', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login,
                password: password,
                returnSecureToken: true
            })
        });

        //Gestion des erreurs

        const resData = await response.json();
        //const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        console.log(resData);
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
        //saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        userId,
        expiryDate: expirationDate.toISOString()
    }));
};