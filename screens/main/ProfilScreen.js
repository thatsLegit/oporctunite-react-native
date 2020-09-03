import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Image, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import NetInfo from '@react-native-community/netinfo';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { FontAwesome } from '@expo/vector-icons';

import Spinner from 'react-native-loading-spinner-overlay';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import * as categActions from '../../store/actions/categ';
import * as sousCategActions from '../../store/actions/sousCateg';
import * as evalActions from '../../store/actions/evaluation';
import * as ficheActions from '../../store/actions/fiche';
import * as utilisateurActions from '../../store/actions/utilisateur';
import {
    dropTests, fetchAllTests,
    dropBilan, insertNoteGlobaleEvaluations
} from '../../helper/db/requetes';
import { createTableTest, createTableFavoris, createTableUserData } from '../../helper/db/init';
import ModalPopupInfo from '../../components/UI/ModalPopupInfo';
import CustomTable from '../../components/UI/Table';


const ProfilScreen = props => {
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [alreadyFetched, setAlreadyFetched] = useState(false);
    const [isConnected, setIsConnected] = useState();
    const [message, setMessage] = useState({});
    const { token, maj, idutilisateur } = useSelector(state => state.auth);
    const { utilisateur, elevage } = useSelector(state => state.utilisateur);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (!state.isConnected) {
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
        await dispatch(utilisateurActions.fetchUtilisateur(isConnected));
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
        if (isConnected !== undefined) {
            createTableTest(idutilisateur);
            createTableFavoris(idutilisateur);
            createTableUserData(idutilisateur);
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
                }
                dataHandler(isConnected);
            }
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

    //Tableau expliquant le mode hors ligne si hors ligne
    const tableHead = ['', 'En ligne', 'Hors-ligne'];
    const tableTitle = ['Réaliser des évaluations', 'Consulter le bilan', 'Mettre à jour le bilan', 'Lire les fiches conseils', 'Recommandations', 'Données personnelles'];
    const tableData = [
        ['oui', 'oui'],
        ['oui', 'oui'],
        ['oui', 'non'],
        ['oui', 'non'],
        ['oui', 'oui'],
        ['lire', 'lire/modifier']
    ];

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1.5, alignItems: 'center', paddingTop: isConnected ? 20 : 30 }}>
                {isConnected &&
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: 'https://oporctunite.envt.fr/oporctunite-api/img/photos/' + utilisateur.utilisateurPhoto }}
                            resizeMode="cover"
                        />
                    </View>
                }
                <CustomTable style={{ flex: isConnected ? 3 : 2, paddingTop: 30 }}>
                    {isConnected && (
                        <View style={{ alignSelf: 'flex-end' }}>
                            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Parametre', { isConnected: isConnected })}>
                                <FontAwesome name="pencil-square-o" size={24} color="black" />
                            </TouchableWithoutFeedback>
                        </View>)
                    }
                    <Text style={styles.text}>
                        {"Nom d'élevage: " + elevage.nomElevage}
                    </Text>
                    <Text style={styles.text}>
                        {"Adresse: " + utilisateur.codePostal}, {utilisateur.adresse}, {utilisateur.ville}
                    </Text>
                    <Text style={styles.text}>
                        {"Email: " + utilisateur.email}
                    </Text>
                    <Text style={styles.text}>
                        {"Téléphone: " + utilisateur.telephone}
                    </Text>
                    <Text style={styles.text}>
                        {"Taille de l'élevage: " + elevage.tailleElevage}
                    </Text>
                </CustomTable>
            </View>
            {!isConnected && (
                <View style={styles.tableContainer}>
                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row data={tableHead} flexArr={[2, 1, 1]} style={styles.head} textStyle={styles.tableText} />
                        <TableWrapper style={styles.wrapper}>
                            <Col data={tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.tableText} />
                            <Rows data={tableData} flexArr={[0.5, 0.5]} style={styles.row} textStyle={styles.tableText} />
                        </TableWrapper>
                    </Table>
                </View>)
            }
            {modal && <ModalPopupInfo
                visible={modal}
                onClose={modalCloser}
                text={message.text}
                buttonText='Fermer'
                type={message.type}
                align={message.type == 'success' ? true : false}
            />}

            <View style={styles.version}>
                <Text>Version du 30/08</Text>
                <Text>Corrections erreurs de syntaxe + bug bilan graphique bâton des évaluations</Text>
            </View>
        </View>
    );
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Profil',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu' s
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navData.navigation.toggleDrawer()}
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
    //Table
    tableContainer: { flex: 1, padding: 16, paddingTop: -16 },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    tableText: { textAlign: 'center' },
    version: { alignItems: "center", justifyContent: 'center' }
});


export default ProfilScreen;