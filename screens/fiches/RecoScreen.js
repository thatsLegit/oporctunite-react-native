import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Platform, FlatList, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import Table from '../../components/UI/Table';
import * as bilanActions from '../../store/actions/bilan';
import Spinner from 'react-native-loading-spinner-overlay';
import { dropBilan, fetchMoyenneCategorieBilan } from '../../helper/db/requetes';
import NetInfo from '@react-native-community/netinfo';


const RecoScreen = props => {
    const [isConnected, setIsConnected] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [categReco, setCategReco] = useState([]);
    const dispatch = useDispatch();

    const fichesReco = useSelector(state => Object.values(state.fiche.fiches).filter(fiche => categReco.includes(fiche.nomCategorieG)));

    const recoHandler = useCallback(async () => {
        await fetchMoyenneCategorieBilan().then(result => {
            if (result.rows._array.length == 4) {
                let liste = [];
                for (const element of result.rows._array) {
                    if (element.moyenneCateg < element.moyenneGlobaleCateg) {
                        liste.push(element.nomCateg);
                    }
                }
                setCategReco(liste);
            }
        });
    }, []);

    const notesHandler = useCallback(async () => {
        await dropBilan();
        await dispatch(bilanActions.fetchBilanDatabase());
    }, [dispatch]);

    const refreshHandler = () => {
        setIsRefreshing(true);
        notesHandler();
        recoHandler();
        setIsRefreshing(false);
    };

    useEffect(() => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                setIsLoading(false);
                setIsConnected(false);
            } else {
                setIsRefreshing(true);
                notesHandler();
                setIsLoading(false);
                setIsRefreshing(false);
            }
        });
    }, [notesHandler, dispatch]);

    useEffect(() => {
        recoHandler();
    }, [dispatch]);


    const fichesHandler = item => {
        if (!isConnected) {
            return (
                <View>
                    <Text style={styles.titre}>{item.titreFiche}</Text>
                    <Text style={styles.categorie}>{item.nomCategorieG}</Text>
                </View>
            );
        }
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('Fiche', { fiche: item })}>
                <Text style={styles.titre}>{item.titreFiche}</Text>
                <Text style={styles.categorie}>{item.nomCategorieG}</Text>
            </TouchableOpacity>
        );
    };

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

    if (!isConnected && categReco.length) {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ paddingVertical: 25, marginHorizontal: 5 }}>
                    <Text style={styles.commentaire}>Nous nous basons sur vos résultats aux évaluations pour vous proposer les fiches conseils les plus pertinentes.</Text>
                </View>
                <Table style={{ flex: 1 }}>
                    <FlatList
                        keyExtractor={item => item.titreFiche}
                        data={fichesReco}
                        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                        renderItem={(itemData) => fichesHandler(itemData.item)}
                    />
                </Table>
            </View>
        );
    }

    if (isConnected && categReco.length) {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ paddingVertical: 30, marginHorizontal: 5 }}>
                    <Text style={styles.commentaire}>Nous nous basons sur vos résultats aux évaluations pour vous proposer les fiches conseils les plus pertinentes.</Text>
                </View>
                <Table style={{ flex: 1 }}>
                    <FlatList
                        refreshing={isRefreshing}
                        onRefresh={refreshHandler}
                        keyExtractor={item => item.titreFiche}
                        data={fichesReco}
                        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                        renderItem={(itemData) => fichesHandler(itemData.item)}
                    />
                </Table>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingVertical: 30, marginHorizontal: 5 }}>
                <Text style={styles.commentaire}>Nous nous basons sur vos résultats aux évaluations pour vous proposer les fiches conseils les plus pertinentes.</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.commentaire}>
                    Réalisez au moins une évaluation dans chaque catégorie pour avoir accès à des recommandations personnalisées !
            </Text>
            </View>
        </View>
    )
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Recommandations',
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
    itemSeparator: {
        height: StyleSheet.hairlineWidth,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    titre: {
        paddingVertical: 25,
        fontSize: 16,
        textDecorationLine: 'underline',
        paddingLeft: 5
    },
    categorie: {
        paddingVertical: 10,
        paddingLeft: 5
    },
    commentaire: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'open-sans'
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});


export default RecoScreen;