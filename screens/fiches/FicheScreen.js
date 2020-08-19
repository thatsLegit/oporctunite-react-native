import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import PDFReader from 'rn-pdf-reader-js';
import { EntypoHeaderButton, MaterialCommunityHeaderButton, AntDesignHeaderButton } from '../../components/UI/HeaderButton';
import Menu, { MenuItem } from 'react-native-material-menu';
import { Text, View, Alert, StyleSheet } from 'react-native';
import { Entypo, Feather, Foundation } from '@expo/vector-icons';
import * as ficheActions from '../../store/actions/fiche';
import Fiche from '../../models/Fiche';
import NetInfo from '@react-native-community/netinfo';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as FileSystem from 'expo-file-system';
const slugify = require('slugify');


//Modal semi-transparent avec un spinner indiquant l'enregistrement ou la mise en favoris de la fiche.
const FicheScreen = props => {
    const isFavorite = useSelector(state => Object.keys(state.fiche.favoris).some(titre => titre == props.route.params.fiche.titreFiche));
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [isConnected, setIsConnected] = useState(true);

    let menu = null;
    const path = FileSystem.documentDirectory + slugify(props.route.params.fiche.titreFiche, { locale: 'fr' }) + '.pdf';

    const dispatch = useDispatch();

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

    useEffect(() => {
        FileSystem.getInfoAsync(path).then(result => {
            if (result.exists) {
                setIsDownloaded(true);
            }
        });
    }, []);

    const setMenuRef = ref => menu = ref;

    const showMenu = () => {
        menu.show();
    };

    const saveHandler = async () => {
        menu.hide();
        if (isDownloaded) {
            await FileSystem.deleteAsync(path);
            dispatch(ficheActions.deleteFicheSaved(props.route.params.fiche.titreFiche));
            setModalDelete(true);
            setTimeout(() => {
                setModalDelete(false);
                setIsDownloaded(false);
            }, 2500);
        } else {
            const callback = progress => {
                setDownloadProgress(progress.totalBytesWritten / progress.totalBytesExpectedToWrite);
            };

            const downloadResumable = await FileSystem.createDownloadResumable(
                props.route.params.fiche.urlImage,
                path,
                {},
                callback
            );

            try {
                await downloadResumable.downloadAsync();
                dispatch(ficheActions.addFicheSaved(new Fiche(
                    props.route.params.fiche.titreFiche,
                    path,
                    props.route.params.fiche.nomCategorieG,
                )));
                setTimeout(() => {
                    setDownloadProgress(0);
                    setIsDownloaded(true);
                }, 1000);
            } catch (e) {
                console.error(e);
            }
        };
    }

    const favorisHandler = async () => {
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
    };

    useEffect(() => {
        if (isConnected) {
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
                            isDownloaded ? (
                                <Text style={{ textAlignVertical: 'center' }}>
                                    <Foundation name="page-delete" size={23} color="black" />{"   "}
                                    <Text>Effacer</Text>
                                </Text>
                            ) : (
                                    <Text style={{ textAlignVertical: 'center' }}>
                                        <Feather name="download" size={23} color="black" />{"   "}
                                        <Text>Enregistrer</Text>
                                    </Text>
                                )
                        }
                        </MenuItem>
                    </Menu>
                )
            });
        } else {
            props.navigation.setOptions({
                headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={AntDesignHeaderButton}>
                        <Item
                            title='warning'
                            iconName='exclamationcircleo'
                            onPress={() => Alert.alert('Vous etes actuellement hors-ligne. Retrouvez une connexion pour effectuer des actions sur cette fiche.')}
                        />
                    </HeaderButtons>
                )
            });
        }
    }, [isFavorite, isDownloaded, isConnected]);


    if (modalDelete) {
        return (
            <View style={styles.centeredView}>
                <Text style={{ textAlign: 'center' }}>
                    La fiche {props.route.params.fiche.titreFiche} a bien été supprimée de votre appareil.{"\n"}{"\n"}
                    Elle ne sera plus disponible en étant 'hors-ligne'.
                </Text>
            </View>
        );
    }

    if (downloadProgress == 0 && !isDownloaded) {
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
    }

    if (downloadProgress == 0 && isDownloaded) {
        return (
            <View style={{ flex: 1 }}>
                <PDFReader
                    noLoader={false}
                    withPinchZoom={true}
                    source={{
                        uri: path
                    }}
                />
            </View>
        );
    }

    return (
        <View style={styles.centeredView}>
            <AnimatedCircularProgress
                size={100}
                width={2}
                fill={downloadProgress}
                tintColor="#00e0ff"
                backgroundColor="#3d5875">
                {
                    (fill) => (
                        <Text>
                            {Math.trunc(fill * 100)} %
                        </Text>
                    )
                }
            </AnimatedCircularProgress>
        </View>);

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

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});


export default FicheScreen;