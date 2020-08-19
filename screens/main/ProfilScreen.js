import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import NetInfo from '@react-native-community/netinfo';

import Spinner from 'react-native-loading-spinner-overlay';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import * as categActions from '../../store/actions/categ';
import * as sousCategActions from '../../store/actions/sousCateg';
import * as evalActions from '../../store/actions/evaluation';
import * as ficheActions from '../../store/actions/fiche';
import {
    dropTests, fetchAllTests,
    dropBilan, insertNoteGlobaleEvaluations
} from '../../helper/db/requetes';
import { createTableTest, createTableFavoris } from '../../helper/db/init';
import ModalPopupInfo from '../../components/Eleveur/Evaluations/ModalPopupInfo';


const ProfilScreen = props => {
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [alreadyFetched, setAlreadyFetched] = useState(false);
    const [isConnected, setIsConnected] = useState(true);
    const [message, setMessage] = useState({});
    const { token, maj, idutilisateur } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (!state.isInternetReachable) {
                setIsConnected(false);
            } else {
                setIsConnected(true);
            }
        });
        return () => {
            unsubscribe();
        }
    });

    const dataHandler = useCallback(async (isConnected) => {
        await dispatch(categActions.fetchCateg(isConnected));
        await dispatch(sousCategActions.fetchSousCateg(isConnected));
        await dispatch(categActions.fetchSousCategByCateg());
        await evalActions.fetchEvaluations(token, maj, isConnected);
        await dispatch(sousCategActions.fetchEvaluationBySousCateg());
        await dispatch(evalActions.fetchLiaisons(isConnected));
        await dispatch(ficheActions.fetchFiches(isConnected));
        await dispatch(ficheActions.fetchFavoris(isConnected));
        await dispatch(ficheActions.fetchFichesSaved());
        setIsLoading(false);
    }, []);

    const modalCloser = () => setModal(false);

    const majBilan = useCallback(async () => {
        const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/bilans/evaluations/all";
        const bearer = 'Bearer ' + token;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        });

        const resData = await response.json();
        let Data = [];
        let i = 0;
        resData.data.forEach(test => {
            Data[i] = [{ "idTest": test.idTest, "nomEvaluation": test.nomEvaluation, "moyenneGlobaleEval": test.moyenneGlobaleEval, "noteEval": test.noteEval, "dateTest": test.dateTest, "nomSousCateg": test.nomSousCateg, "moyenneGlobaleSousCateg": test.moyenneGlobaleSousCateg, "moyenneSousCateg": test.moyenneSousCateg, "nomCateg": test.nomCateg, "moyenneGlobaleCateg": test.moyenneGlobaleCateg, "moyenneCateg": test.moyenneCateg }];
            i++;
        });
        insertNoteGlobaleEvaluations(Data);
    }, [dispatch]);

    const majTests = useCallback(async () => {
        const result = await fetchAllTests(idutilisateur);

        if (!result.rows._array || !result.rows._array.length) {
            return;
        }

        const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/tests";
        const bearer = 'Bearer ' + token;
        let sentence = 'Les résultats aux évaluations suivantes ont été envoyées à nos serveurs (hors-ligne) :\n\n';

        for (const test of result.rows._array) {
            const dateT = test.dateTest;
            const valeur = test.noteEval;
            const nomEvaluation = test.nomEvaluation;
            sentence = sentence + `${nomEvaluation} (${valeur}/10), ${dateT} \n`;

            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': bearer
                },
                body: JSON.stringify({
                    nomEvaluation,
                    valeur,
                    dateT
                })
            });
        };

        setMessage({ text: sentence, type: 'success' });
        setModal(true);

    }, []);

    useEffect(() => {
        createTableTest(idutilisateur);
        createTableFavoris(idutilisateur);
        if (!alreadyFetched) {
            if (isConnected) {
                majTests();
                dropTests(idutilisateur);
                dropBilan();
                majBilan();
                setAlreadyFetched(true);
            } else {
                setMessage({ text: "Votre connexion est faible ou absente, certaines fonctionnalités seront limitées.", type: 'danger' });
                setModal(true);
                setIsLoading(false);
            }
            dataHandler(isConnected);
        }
    }, [isConnected]);


    if (isLoading) {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner
                    visible={isLoading}
                    textContent={'Chargement'}
                    textStyle={{ color: '#FFF' }}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            
            <Image style={styles.photo} source={require('../../assets/img/evaluations/Bursite-photo1.png')} />

            {/* Pour un éleveur */}
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Nom d'élevage
                </Text>
                <Text style={styles.text}>
                    Code postal, adresse, ville
                </Text>
                <Text style={styles.text}>
                    Email
                </Text>
                <Text style={styles.text}>
                    Numéro de téléphone
                </Text>
                <Text style={styles.text}>
                    Taille de l'élevage
                </Text>
            </View>
            <Text style={{bottom:20, position:"absolute"}}>
                Mardi 18 août
            </Text>
        </View>
    );
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Profil',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Paramètre'
                    iconName={Platform.OS === 'android' ? 'md-settings' : 'ios-settings'}
                    
                    onPress={() => navData.navigation.navigate('Parametre')}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    photo: {
        height: Dimensions.get('window').height / 5,
        width: Dimensions.get('window').width / 3,
        backgroundColor:"blue",
        marginVertical:15
    },
    textContainer:{     
        alignItems:"flex-start"
    },
    text:{     
        fontSize:16
    },
    container:{
        alignItems: 'center',
        flex:1,
    }
});


export default ProfilScreen;