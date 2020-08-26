import React, { useReducer, useCallback, useState, useEffect } from 'react';
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, Alert, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';
import Shadow from '../../components/UI/Shadow';


const formReducer = (state, action) => {
    if (action.type === 'FORM_INPUT_UPDATE') {
        const updatedValues = { //Udpate the currently changed input
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = { //updated validity of given input in consequence
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true; //Check the global form validity
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const AuthScreen = props => {
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            login: '',
            password: ''
        },
        inputValidities: {
            login: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('Erreur :/', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = authActions.signup(formState.inputValues.login, formState.inputValues.password);
        } else {
            action = authActions.login(formState.inputValues.login, formState.inputValues.password);
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: 'FORM_INPUT_UPDATE',
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        }, [dispatchFormState]
    );

    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'android' ? "" : "padding"} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}>
                <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient} >
                    <View style={styles.authContainer}>
                        <ScrollView>
                            <Input
                                id="login"
                                label="Identifiant"
                                keyboardType="default"
                                required
                                minLength={5}
                                autoCapitalize="none"
                                errorText="Veuillez saisir un identifiant."
                                onInputChange={inputChangeHandler}
                                initialValue=""
                            />
                            <Input
                                id="password"
                                label="Mot de passe"
                                keyboardType="default"
                                secureTextEntry
                                required
                                minLength={5}
                                autoCapitalize="none"
                                errorText="Veuillez saisir un mot de passe valide."
                                onInputChange={inputChangeHandler}
                                initialValue=""
                            />
                            <View style={styles.buttons}>
                                <Shadow style={styles.buttonConnect}>
                                    <Button
                                        title="Connexion"
                                        color={Colors.primary}
                                        onPress={authHandler}
                                    />
                                </Shadow>
                                {<Shadow style={styles.buttonSwitch}>
                                    {isLoading ? <ActivityIndicator size="small" color={Colors.primary} /> :
                                        <Button
                                            title='Pas encore de compte ?'
                                            color='grey'
                                            onPress={() => {
                                                Alert.alert("L'inscription n'est pas encore disponible sur l'application mobile. Rendez-vous sur oporctunite.envt.fr pour créer votre compte O'porctunité");
                                            }}
                                        />}
                                </Shadow>}
                            </View>
                        </ScrollView>
                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    buttons: {
        alignItems: 'center'
    },
    buttonConnect: {
        width: '60%',
        borderRadius: 10,
        backgroundColor: 'rgba(255,232,255,1)',
        borderColor: 'grey',
        borderWidth: 0.5,
        marginTop: 25,
    },
    buttonSwitch: {
        marginTop: 50
    }
});


export default AuthScreen;
