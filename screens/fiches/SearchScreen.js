import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import Table from '../../components/UI/Table';
import { SearchBar } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalPopupInfo from '../../components/Eleveur/Evaluations/ModalPopupInfo';

const SearchScreen = props => {
    const [isConnected, setIsConnected] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState({});

    const fiches = useSelector(state => Object.values(state.fiche.fiches));
    const [search, setSearch] = useState('');
    const [dataSource, setDataSource] = useState([]);

    const modalCloser = () => setModal(false);

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

    const SearchFilterFunction = text=> {
        const newData = fiches.filter(function(item) {
            const itemData = item.titreFiche ? item.titreFiche.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setSearch(text);
        setDataSource(newData);
    };

    const refreshHandler = async () => {
        setIsRefreshing(true);

        const connect = await NetInfo.fetch();
        console.log(connect.isConnected);
        if (!connect.isConnected) {
            setIsConnected(false);
            setMessage({ text: 'Aucune connexion', type: 'danger' });
            setModal(true);
        } else {
            setIsConnected(true);
        }

        setIsRefreshing(false);
    };

    useEffect(() => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                setIsLoading(false);
                setIsConnected(false);
            } else {
                setIsRefreshing(true);
                setIsLoading(false);
                setIsRefreshing(false);
            }
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
            <Table style={{ flex: 1, marginTop:10 }}>
                    <FlatList 
                        refreshing={isRefreshing}
                        onRefresh={refreshHandler}       
                        keyExtractor={item => item.titreFiche}
                        data={dataSource.length==0?fiches:dataSource}
                        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                        renderItem={(itemData) => fichesHandler(itemData.item)}
                    />
                    <ModalPopupInfo
                        visible={modal}
                        onClose={modalCloser}
                        text={message.text}
                        buttonText='Fermer'
                        type={message.type}
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


export default SearchScreen;