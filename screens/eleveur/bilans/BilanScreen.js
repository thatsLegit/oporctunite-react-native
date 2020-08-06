import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Button, Platform, RefreshControl, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import RadarChart from '../../../components/Chart/RadarChart';
import { CustomHeaderButton } from '../../../components/UI/HeaderButton';
import * as bilanActions from '../../../store/actions/bilan';
import Spinner from 'react-native-loading-spinner-overlay';
import { fetchBilan, dropBilan, fetchMoyenneSousCategorieBilan } from '../../../helper/db/requetes'
import NetInfo from '@react-native-community/netinfo';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';

const BilanScreen = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [message, setMessage] = useState({});
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();


    const notesHandler = useCallback(async () => {
        setIsRefreshing(true);
        await dispatch(bilanActions.fetchNoteCategories());
        await dispatch(bilanActions.fetchNoteGlobaleCategories());
        await dispatch(bilanActions.fetchNoteSousCategories());
        await dispatch(bilanActions.fetchNoteGlobaleSousCategories());
        await dispatch(bilanActions.fetchNoteEvaluations());
        await dispatch(bilanActions.fetchNoteGlobaleEvaluations());
        dropBilan();
        await dispatch(bilanActions.fetchBilanDatabase());
        fetchBilan();
        setIsRefreshing(false);
    }, [dispatch]);

    const horsLigneHandler = useCallback(async () => {
        setIsRefreshing(true);
        fetchBilan();
        setIsRefreshing(false);
    }, [dispatch]);

    const modalCloser = () => setModal(false);

    useEffect(() => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                setMessage({ text: "Votre connexion est faible ou absente, certaines fonctionnalités seront limitées.", type: 'danger' });
                setModal(true);
                horsLigneHandler().then(() => setIsLoading(false));;
            } else {
                notesHandler().then(() => setIsLoading(false)); // Vide et remplie la table Bilan
            }
        });
    }, [notesHandler, dispatch]);


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

    if (!isConnected) {
        return (
            <ScrollView>
                <View style={styles.chartContainer}>
                    <View style={styles.chartCaption}>
                        <Text style={styles.chartText}>Graphique comparatif</Text>

                        <View style={styles.label1Container}>
                            <View style={styles.label1}></View>
                            <Text>Résultats de mon elevage</Text>
                        </View>
                        <View style={styles.label2Container}>
                            <View style={styles.label2}></View>
                            <Text>Moyenne des eleveurs</Text>
                        </View>
                    </View>
                    <RadarChart />
                    <Button title='Plus de détails' onPress={() => { props.navigation.navigate('BilanCategorieScreen') }} />
                </View>
            </ScrollView>
        );
    }

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={notesHandler} />}>
            <View style={styles.chartContainer}>
                <View style={styles.chartCaption}>
                    <Text style={styles.chartText}>Graphique comparatif</Text>

                    <View style={styles.label1Container}>
                        <View style={styles.label1}></View>
                        <Text>Résultats de mon elevage</Text>
                    </View>
                    <View style={styles.label2Container}>
                        <View style={styles.label2}></View>
                        <Text>Moyenne des eleveurs</Text>
                    </View>
                </View>
                <RadarChart />
                <Button title='Plus de détails' onPress={() => { props.navigation.navigate('BilanCategorieScreen') }} />
            </View>
            <ModalPopupInfo
                visible={modal}
                onClose={modalCloser}
                text={message.text}
                buttonText='Fermer'
                type={message.type}
                align={message.type == 'success' ? true : false}
            />
        </ScrollView>
    );
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Bilan',
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
    chartContainer: {
        flex: 1,
        alignItems: 'center'
    },
    chartText: {
        fontFamily: 'open-sans-bold',
        marginVertical: 20
    },
    label1: {
        width: 20,
        height: 15,
        backgroundColor: '#2E9BCA',
        marginRight: 10
    },
    label2: {
        width: 20,
        height: 15,
        backgroundColor: '#FF6666',
        marginRight: 10
    },
    chartCaption: {
        flex: 1,
        marginVertical: 20,
    },
    label1Container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    label2Container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
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


export default BilanScreen;