import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button, Platform, RefreshControl, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import RadarChart from '../../../components/Chart/RadarChart';
import { CustomHeaderButton } from '../../../components/UI/HeaderButton';
import Spinner from 'react-native-loading-spinner-overlay';
import { dropBilan, insertNoteGlobaleEvaluations } from '../../../helper/db/requetes'
import NetInfo from '@react-native-community/netinfo';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';


const BilanScreen = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [message, setMessage] = useState({});
    const [modal, setModal] = useState(false);
    const { token, maj } = useSelector(state => state.auth);
    const dispatch = useDispatch();

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
    }, []);

    const notesHandler = useCallback(async () => {
        setIsRefreshing(true);
        await dropBilan();
        await majBilan();
        setIsRefreshing(false);
    }, [dispatch]);

    useEffect(() => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                setIsConnected(false);
                setMessage({ text: "Votre connexion est faible ou absente, certaines fonctionnalités seront limitées.", type: 'danger' });
                setModal(true);
                setIsLoading(false);
            } else {
                notesHandler().then(() => setIsLoading(false));
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
                <RadarChart 
                    navigation= {() => props.navigation.navigate('BilanCategorieScreen')}
                />              
                
            </View>
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