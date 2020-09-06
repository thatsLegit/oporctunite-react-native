import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Platform, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import NetInfo from '@react-native-community/netinfo';
import Table from '../../components/UI/Table';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';


const FavScreen = props => {
    const favoris = useSelector(state => Object.values(state.fiche.favoris)); //fiches favories contenues dans le store
    const saved = useSelector(state => state.fiche.save); //fiches favories enregistrées sur l'appareil, référencées dans le store
    const [isConnected, setIsConnected] = useState(true);

    //Event listener pour la connexion
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

    const fichesHandler = item => {
        //la fiche est enregistrée sur l'appareil
        if (!isConnected && saved.includes(item.titreFiche) && Platform.OS == 'ios') {
            return (
                <View style={{ borderRadius: 5 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Fiche', { fiche: item })}>
                        <Text style={styles.titre}>{item.titreFiche}</Text>
                        <Text style={styles.categorie}>{item.nomCategorieG}</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        //fiche non-enregistrée, pas de connexion
        if (!isConnected) {
            return (
                <View style={{ backgroundColor: 'rgba(191, 191, 191, 0.9)', borderRadius: 5 }}>
                    <Text style={styles.titre}>{item.titreFiche}</Text>
                    <Text style={styles.categorie}>{item.nomCategorieG}</Text>
                </View>
            );
        }
        //fiche enregistrée, connecté
        return (
            <View style={{ borderRadius: 5 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Fiche', { fiche: item })}>
                    <Text style={styles.titre}>{item.titreFiche}</Text>
                    <Text style={styles.categorie}>{item.nomCategorieG}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Il y a des fiches favories */}
            {favoris.length != 0 && (
                <Table style={{ flex: 1, paddingTop: 20 }}>
                    <FlatList
                        keyExtractor={item => item.titreFiche}
                        data={favoris}
                        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                        renderItem={(itemData) => fichesHandler(itemData.item)}
                    />
                </Table>
            )}
            {/* Pas de fiches mises en fav */}
            {favoris.length == 0 && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                    <ScrollView>
                        <Text style={styles.commentaire}>
                            Les fiches que vous mettez en favoris sont affichées ici.
                        </Text>
                    </ScrollView>
                </View>
            )}
        </View>
    );
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Favoris',
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
    }
});


export default FavScreen;