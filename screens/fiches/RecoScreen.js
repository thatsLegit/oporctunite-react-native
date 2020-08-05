import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Table from '../../components/UI/Table';


const RecoScreen = props => {
    const fichesReco = useSelector(state => Object.values(state.fiche.fiches));

    const fichesHandler = item => {
        return (
            <View>
                <Text style={styles.titre}>{item.titreFiche}</Text>
                <Text style={styles.categorie}>{item.nomCategorieG}</Text>
            </View>
        );
    };

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
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Recommandations',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
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


export default RecoScreen;