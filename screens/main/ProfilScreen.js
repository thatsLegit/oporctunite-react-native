import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import NetInfo from '@react-native-community/netinfo';

import Spinner from 'react-native-loading-spinner-overlay';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import * as categActions from '../../store/actions/categ';
import * as sousCategActions from '../../store/actions/sousCateg';
import * as evalActions from '../../store/actions/evaluation';
import * as ficheActions from '../../store/actions/fiche';
import { dropTests, fetchAllTests } from '../../helper/db/requetes';
import ModalPopupInfo from '../../components/Eleveur/Evaluations/ModalPopupInfo';


const ProfilScreen = props => {
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState({});
    const { token, maj } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const categHandler = useCallback(async (isConnected) => {
        await dispatch(categActions.fetchCateg(isConnected));
        await dispatch(categActions.fetchSousCategByCateg());
        await dispatch(sousCategActions.fetchSousCateg(isConnected));
        await evalActions.fetchEvaluations(token, maj, isConnected);
        await dispatch(sousCategActions.fetchEvaluationBySousCateg());
        await dispatch(evalActions.fetchLiaisons(isConnected));
        await dispatch(ficheActions.fetchFiches(isConnected));
        setIsLoading(false);
    }, []);

    const modalCloser = () => setModal(false);

    const majTests = useCallback(async () => {
        const result = await fetchAllTests();

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
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                setMessage({ text: "Votre connexion est faible ou absente, certaines fonctionnalités seront limitées.", type: 'danger' });
                setModal(true);
                setIsLoading(false);
            } else {
                majTests();
                dropTests();
            }
            categHandler(state.isConnected);
        });
    }, []);


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
        <View>
            <Text style={{ textAlign: "center", paddingVertical: 10 }}>
                Jeudi 6 août, mode hors ligne
            </Text>
            <Button title='Paramètres' onPress={() => { props.navigation.navigate('Parametre') }} />
            <ModalPopupInfo
                visible={modal}
                onClose={modalCloser}
                text={message.text}
                buttonText='Fermer'
                type={message.type}
                align={message.type == 'success' ? true : false}
            />
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
        )
    };
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});


export default ProfilScreen;