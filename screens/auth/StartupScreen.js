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
            const { token, userId, expiryDate } = transformedData;

            //Checking if the token is valid
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
                dispatch(authActions.setDidTryAutoLogin());
                return;
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();

            //Everything is OK
            //props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId, token, expirationTime));
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