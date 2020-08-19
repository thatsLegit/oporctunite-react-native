import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableWithoutFeedback, Alert, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import Table from '../../components/UI/Table';
import { SearchBar } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import { EvilIcons } from '@expo/vector-icons';

const SearchScreen = props => {
    const fiches = useSelector(state => Object.values(state.fiche.fiches));
    const saved = useSelector(state => Object.keys(state.fiche.save));
    const savedFiches = useSelector(state => state.fiche.save);
    const [isConnected, setIsConnected] = useState(true);
    const [search, setSearch] = useState('');
    const [dataSource, setDataSource] = useState([]);


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

    const SearchFilterFunction = text => {
        const newData = fiches.filter(function (item) {
            const itemData = item.titreFiche ? item.titreFiche.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setSearch(text);
        setDataSource(newData);
    };

    const fichesHandler = item => {
        if (!isConnected && saved.includes(item.titreFiche)) {
            return (
                <View style={{ borderRadius: 5 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Fiche', { fiche: savedFiches[item.titreFiche] })}>
                        <Text style={styles.titre}>{savedFiches[item.titreFiche].titreFiche}</Text>
                        <Text style={styles.categorie}>{savedFiches[item.titreFiche].nomCategorieG}</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        if (!isConnected) {
            return (
                <View style={{ backgroundColor: 'rgba(191, 191, 191, 0.9)', borderRadius: 5 }}>
                    <Text style={styles.titre}>{item.titreFiche}</Text>
                    <Text style={styles.categorie}>{item.nomCategorieG}</Text>
                </View>
            );
        }
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
            <SearchBar
                lightTheme
                round
                searchIcon={{ size: 24 }}
                onChangeText={text => SearchFilterFunction(text)}
                onClear={text => SearchFilterFunction('')}
                placeholder="Rechercher une fiche..."
                value={search}
            />
            <Table style={{ flex: 1, paddingTop: 20 }}>
                <FlatList
                    keyExtractor={item => item.titreFiche}
                    data={dataSource.length == 0 ? fiches : dataSource}
                    ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                    renderItem={(itemData) => fichesHandler(itemData.item)}
                />
            </Table>
        </View>
    );
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Rechercher une fiche',
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
            <TouchableWithoutFeedback onPress={() => {

                Alert.alert("Informations", "Pour pouvoir accèder aux fiches il faut posséder une connexion internet, autrement seulement l'accès au nom des fiches et catégories seront disponibles à titre informatif.",);
            }}>
                <EvilIcons name="question" size={35} color={Platform.OS == 'android' ? "white" : "grey"} />
            </TouchableWithoutFeedback>
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


export default SearchScreen;