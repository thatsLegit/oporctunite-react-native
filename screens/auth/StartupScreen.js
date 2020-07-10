import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useDispatch } from 'react-redux';

import * as authActions from '../../store/actions/auth';

//Screen for auto-login, intermediate between auth and the application content

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                dispatch(authActions.setDidTryAutoLogin());
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, idutilisateur } = transformedData;

            //Checking if the token is valid
            if (Date.now() >= token.exp * 1000) {
                dispatch(authActions.setDidTryAutoLogin());
                return;
            }

            //Everything is OK
            dispatch(authActions.authenticate(idutilisateur, token));
        };

        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;