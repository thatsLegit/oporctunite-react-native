import React, { useState, useReducer, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import * as utilisateurActions from '../../store/actions/utilisateur';
import Colors from '../../constants/Colors';
import ModalPopupInfo from '../../components/Eleveur/Evaluations/ModalPopupInfo';
import Table from '../../components/UI/Table';
import Input from '../../components/UI/Input';

//Pour la validation des champs
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
    } else if (action.type === 'RESET_INPUTS') {
        return action.initialState;
    }
    return state;
};

const ParametreScreen = props => {
    const isConnected = props.route.params.isConnected;
    const { utilisateur, elevage } = useSelector(state => state.utilisateur);
    const [modalConfirmation, setModalConfirmation] = useState(false);
    const [modalAnnulation, setModalAnnulation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const initialState = {
        inputValues: {
            nomElevage: elevage.nomElevage,
            codePostal: utilisateur.codePostal.toString(),
            adresse: utilisateur.adresse.toString(),
            ville: utilisateur.ville,
            email: utilisateur.email,
            telephone: utilisateur.telephone.toString(),
            tailleElevage: elevage.tailleElevage.toString()
        },
        inputValidities: {
            nomElevage: true,
            codePostal: true,
            adresse: true,
            ville: true,
            email: true,
            telephone: true,
            tailleElevage: true
        },
        formIsValid: true
    }

    //Validation des champs
    const [formState, dispatchFormState] = useReducer(formReducer, initialState);

    const modalAnnulationCloser = () => setModalAnnulation(false);
    const modalConfirmationCloser = () => setModalConfirmation(false);

    //Annulation
    const annulationHandler = () => {
        props.navigation.goBack();
        setModalAnnulation(false);
        dispatchFormState({
            type: 'RESET_INPUTS',
            initialState
        });
    };

    useEffect(() => {
        if (error) {
            Alert.alert('Erreur :/', error, [{ text: 'OK' }]);
        }
    }, [error]);

    //Confirmation
    const confirmationHandler = async () => {
        setError(null);
        setIsLoading(true);
        for (const [key, value] of formState.inputValues) {
            try {
                await dispatch(utilisateurActions.changerDonneesPersos(key, value));
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        }
        setIsLoading(false);
        setModalConfirmation(false);
        props.navigation.goBack();
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


    //Loading spinner
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator
                    size='large'
                    color={Colors.primary}
                />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: isConnected ? 20 : 30 }}>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : -40} style={{ height: '92%' }} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1 }}>
                        {isConnected &&
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: 'https://oporctunite.envt.fr/oporctunite-api/img/photos/' + utilisateur.utilisateurPhoto }}
                                        resizeMode="cover"
                                    />
                                </View>
                            </View>
                        }
                        <Table style={{ flex: isConnected ? 3 : 1, paddingTop: 30 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Input
                                    id="nomElevage"
                                    label="Nom de l'élevage"
                                    keyboardType="default"
                                    required
                                    minLength={2}
                                    autoCapitalize="none"
                                    errorText="Veuillez saisir un nom d'élevage valide."
                                    onInputChange={inputChangeHandler}
                                    initialValue={elevage.nomElevage}
                                    initiallyValid={true}
                                />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Input
                                    id="codePostal"
                                    label="Code postal"
                                    keyboardType="number-pad"
                                    required
                                    cp
                                    errorText="Veuillez saisir un code postal valide."
                                    onInputChange={inputChangeHandler}
                                    initialValue={utilisateur.codePostal.toString()}
                                    initiallyValid={true}
                                />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Input
                                    id="adresse"
                                    label="Adresse"
                                    keyboardType="default"
                                    required
                                    minLength={2}
                                    autoCapitalize="none"
                                    errorText="Veuillez saisir une adresse valide."
                                    onInputChange={inputChangeHandler}
                                    initialValue={utilisateur.adresse}
                                    initiallyValid={true}
                                />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Input
                                    id="ville"
                                    label="Ville"
                                    keyboardType="default"
                                    required
                                    minLength={2}
                                    autoCapitalize="none"
                                    errorText="Veuillez saisir un nom de ville, commune existante."
                                    onInputChange={inputChangeHandler}
                                    initialValue={utilisateur.adresse}
                                    initiallyValid={true}
                                />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Input
                                    id="email"
                                    label="Email"
                                    keyboardType='email-address'
                                    required
                                    email
                                    errorText="Veuillez saisir une adresse email valide."
                                    onInputChange={inputChangeHandler}
                                    initialValue={utilisateur.email}
                                    initiallyValid={true}
                                />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Input
                                    id="telephone"
                                    label="Téléphone"
                                    keyboardType='number-pad'
                                    required
                                    telephone
                                    errorText="Veuillez saisir un numéro de téléphone valide."
                                    onInputChange={inputChangeHandler}
                                    initialValue={utilisateur.telephone.toString()}
                                    initiallyValid={true}
                                />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Input
                                    id="tailleElevage"
                                    label="Taille d'élevage"
                                    keyboardType='number-pad'
                                    required
                                    tailleElevage
                                    errorText="Veuillez saisir une taille d'élevage valide."
                                    onInputChange={inputChangeHandler}
                                    initialValue={elevage.tailleElevage.toString()}
                                    initiallyValid={true}
                                />
                            </View>
                        </Table>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={{ ...styles.footer, height: '8%' }}>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={() => setModalAnnulation(true)}
                >
                    <Text style={styles.footerText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={() => {
                        if (formState.formIsValid) {
                            setModalConfirmation(true)
                        } else {
                            Alert.alert('Erreur de saisie', 'Vérifier la validité des données saisies', [{ text: 'Compris', style: 'destructive' }]);
                        }
                    }}
                >
                    <Text style={styles.footerText}>Sauvegarder</Text>
                </TouchableOpacity>
            </View>

            <ModalPopupInfo
                visible={modalAnnulation}
                onClose={modalAnnulationCloser}
                text="Êtes-vous sûrs de vouloir annuler les modifications en cours ?"
                buttonText='Annuler'
                confirmation
                onValidation={() => annulationHandler()}
            />
            <ModalPopupInfo
                visible={modalConfirmation}
                onClose={modalConfirmationCloser}
                text="Sauvegarder les modifications en cours ?"
                buttonText='Annuler'
                confirmation
                onValidation={() => confirmationHandler()}
            />
        </View>
    );
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Modifier mes données',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    imageContainer: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        borderRadius: Dimensions.get('window').width * 0.5 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    text: {
        paddingVertical: 8
    },
    footer: {
        flexDirection: "row",
        position: 'absolute',
        bottom: 0
    },
    footerBtn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.accent,
        color: "#FFF",
        height: "100%",
        width: "50%",
        borderColor: 'white',
        borderWidth: 1
    },
    footerText: {
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        color: "#FFF"
    },
    centered: { //spinner
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default ParametreScreen;