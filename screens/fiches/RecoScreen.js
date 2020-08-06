import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Platform, FlatList, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import Table from '../../components/UI/Table';
import * as bilanActions from '../../store/actions/bilan';
import Spinner from 'react-native-loading-spinner-overlay';
import { fetchBilan, dropBilan, fetchMoyenneCategorieBilan } from '../../helper/db/requetes';
import NetInfo from '@react-native-community/netinfo';


const RecoScreen = props => {
    const [isConnected, setIsConnected] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const dispatch = useDispatch();

    let categReco = [];
    const noteCateg = useSelector(state => state.bilan.noteCateg);
    const noteGlobaleCateg = useSelector(state => state.bilan.noteGlobaleCateg);

    if (Object.keys(noteCateg).length == 4) {
        for (const categ of Object.keys(noteCateg)) {
            if (noteCateg[categ] < noteGlobaleCateg[categ]) {
                categReco.push(categ);
            }
        }
    }

    const fichesReco = useSelector(state => Object.values(state.fiche.fiches).filter(fiche => categReco.includes(fiche.nomCategorieG)));

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
        await fetchMoyenneCategorieBilan();
        setIsRefreshing(false);
    }, [dispatch]);

    const horsLigneHandler = useCallback(async () => {
        setIsRefreshing(true);
        fetchBilan();
        setIsRefreshing(false);
    }, [dispatch]);

    useEffect(() => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                horsLigneHandler().then(() => setIsLoading(false));
                setIsConnected(false);
            } else {
                notesHandler().then(() => setIsLoading(false));
            }
        });
    }, [notesHandler, dispatch]);


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
            <ButtonComponent onPress={() => props.navigation.navigate('Fiche', { fiche: item })}>
                <Text style={styles.titre}>{item.titreFiche}</Text>
                <Text style={styles.categorie}>{item.nomCategorieG}</Text>
            </ButtonComponent>
        );
    };

    let ButtonComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }

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
                        onRefresh={notesHandler}
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