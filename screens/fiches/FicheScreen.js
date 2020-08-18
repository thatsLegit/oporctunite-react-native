import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import PDFReader from 'rn-pdf-reader-js';
import { EntypoHeaderButton, MaterialCommunityHeaderButton } from '../../components/UI/HeaderButton';
import Menu, { MenuItem } from 'react-native-material-menu';
import { Text, View, Alert } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import * as ficheActions from '../../store/actions/fiche';
import Fiche from '../../models/Fiche';
import NetInfo from '@react-native-community/netinfo';

//Modal semi-transparent avec un spinner indiquant l'enregistrement ou la mise en favoris de la fiche.
const FicheScreen = props => {
    const isFavorite = useSelector(state => Object.keys(state.fiche.favoris).some(titre => titre == props.route.params.fiche.titreFiche));
    let menu = null;
    const dispatch = useDispatch();

    const setMenuRef = ref => menu = ref;

    const showMenu = () => {
        menu.show();
    };

    const saveHandler = () => {
        menu.hide();
    }

    const favorisHandler = async () => {
        const connection = await NetInfo.fetch();
        if (!connection.isInternetReachable) {
            return new Alert.alert('Hors-ligne', "Cette action requiert d'être connecté à un réseau", [{ text: 'Compris', style: 'destructive' }])
        } else {
            menu.hide();
            if (!isFavorite) {
                dispatch(ficheActions.ajouterFavoris(new Fiche(
                    props.route.params.fiche.titreFiche,
                    props.route.params.fiche.urlImage,
                    props.route.params.fiche.nomCategorieG,
                )));
            } else {
                dispatch(ficheActions.supprimerFavoris(props.route.params.fiche.titreFiche));
            }
        }
    };

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Menu
                    ref={setMenuRef}
                    button={<HeaderButtons HeaderButtonComponent={MaterialCommunityHeaderButton}>
                        <Item
                            title='actions'
                            iconName='dots-vertical'
                            onPress={showMenu}
                        />
                    </HeaderButtons>}
                >
                    <MenuItem onPress={favorisHandler}>{
                        <Text>
                            <Entypo name={isFavorite ? "heart" : "heart-outlined"} size={20} color="black" />{"  "}
                            <Text>{isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}</Text>
                        </Text>
                    }
                    </MenuItem>
                    <MenuItem onPress={saveHandler}>{
                        <Text style={{ textAlignVertical: 'center' }}>
                            <Feather name="download" size={20} color="black" />{"  "}
                            <Text>Enregistrer</Text>
                        </Text>
                    }
                    </MenuItem>
                </Menu>
            )
        });
    }, [isFavorite]);

    return (
        <View style={{ flex: 1 }}>
            <PDFReader
                noLoader={false}
                withPinchZoom={true}
                source={{
                    uri: props.route.params.fiche.urlImage
                }}
            />
        </View>
    );
};


export const screenOptions = navData => {
    return {
        headerTitle: navData.route.params.fiche.titreFiche,
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={EntypoHeaderButton}>
                <Item
                    title='Retour'
                    iconName='back'
                    onPress={() => navData.navigation.goBack()}
                />
            </HeaderButtons>
        )
    };
};


export default FicheScreen;