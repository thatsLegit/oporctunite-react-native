import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import PDFReader from 'rn-pdf-reader-js';
import { EntypoHeaderButton, MaterialCommunityHeaderButton } from '../../components/UI/HeaderButton';
import Menu, { MenuItem } from 'react-native-material-menu';
import { Text, View, Alert, Modal, StyleSheet } from 'react-native';
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
    const [modalDL, setModalDL] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    let menu = null;
    const path = FileSystem.documentDirectory + slugify(props.route.params.fiche.titreFiche, { locale: 'fr' }) + '.pdf';

    const dispatch = useDispatch();

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
            setModalDelete(true);
            setTimeout(() => {
                setModalDelete(false);
                setIsDownloaded(false);
            }, 1000);
        } else {
            const connection = await NetInfo.fetch();
            if (!connection.isInternetReachable) {
                return new Alert.alert('Hors-ligne', "Cette action requiert d'être connecté à un réseau", [{ text: 'Compris', style: 'destructive' }])
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
                    setModalDL(true);
                    setTimeout(() => {
                        setDownloadProgress(0);
                        setIsDownloaded(true);
                        setModalDL(false);
                    }, 1000);
                } catch (e) {
                    console.error(e);
                }
            }
        };
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
    }, [isFavorite, isDownloaded]);


    return (
        <View style={{ flex: 1 }}>
            <PDFReader
                noLoader={false}
                withPinchZoom={true}
                source={{
                    uri: props.route.params.fiche.urlImage
                }}
            />
            <Modal
                visible={modalDL}
                transparent={true}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <AnimatedCircularProgress
                            size={100}
                            width={2}
                            fill={downloadProgress}
                            tintColor="#00e0ff"
                            backgroundColor="#3d5875"
                            duration={1500}>
                            {
                                () => (
                                    <Text>
                                        {downloadProgress * 100} %
                                    </Text>
                                )
                            }
                        </AnimatedCircularProgress>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={modalDelete}
                transparent={true}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <AnimatedCircularProgress
                            size={100}
                            width={2}
                            fill={downloadProgress}
                            tintColor="#00e0ff"
                            backgroundColor="#3d5875"
                            duration={1500}>
                            {
                                () => (
                                    <Text>
                                        Fiche supprimée
                                    </Text>
                                )

                            }
                        </AnimatedCircularProgress>
                    </View>
                </View>
            </Modal>
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

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        margin: 20,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
});


export default FicheScreen;