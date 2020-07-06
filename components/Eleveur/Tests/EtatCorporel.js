import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, Dimensions, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Counter from '../../UI/Counter';
import ProgressBar from 'react-native-progress/Bar';
import { FontAwesome } from '@expo/vector-icons';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import { EvilIcons } from '@expo/vector-icons';
import * as testActions from '../../../store/actions/test';


const EtatCorporel = props => {

    const { modalInfo, nbTruies, confirmation, navigation, nomEvaluation, Vtype } = props;
    const [modalEchantillonVisible, setModalEchantillonVisible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalInput1Visible, setModalInput1Visible] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    const [globalCount, setGlobalCount] = useState(0);

    const dispatch = useDispatch();

    const note = Math.round((((count2 / nbTruies) * 10 + (count3 / nbTruies) * 5 + Number.EPSILON) * 10)) / 10;

    const validationHandler = async () => {
        await dispatch(testActions.ajouterTest(note, nomEvaluation));

        if (Vtype == 'valider') {
            modalConfirmationCloser();
            navigation.navigate('TestRecap');
        } else { //Suivant case
            props.onNextValidation();
        }
    };

    const changeHandler = (count, sign, value) => {
        if (globalCount + value > nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount(count);
        if (sign == 'plus') {
            setGlobalCount(globalCount + value);
        } else {
            setGlobalCount(globalCount - value);
        }
    };
    const changeHandler2 = (count2, sign, value) => {
        if (globalCount + value > nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount2(count2);
        if (sign == 'plus') {
            setGlobalCount(globalCount + value);
        } else {
            setGlobalCount(globalCount - value);
        }
    };
    const changeHandler3 = (count3, sign, value) => {
        if (globalCount + value > nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount3(count3);
        if (sign == 'plus') {
            setGlobalCount(globalCount + value);
        } else {
            setGlobalCount(globalCount - value);
        }
    };

    const modalInput1Closer = () => {
        setModalInput1Visible(false);
    };
    const modalInfoCloser = () => {
        setModalInfoVisible(false);
        props.onCloseInfo();
    };
    const modalEchantillonCloser = () => {
        setModalEchantillonVisible(false);
    };
    const modalConfirmationCloser = useCallback(() => {
        setModalConfirmation(false); //local component
        props.onCloseConfirmation(); //parent component
    });

    useEffect(() => {
        setModalInfoVisible(modalInfo);
        if (confirmation && globalCount == nbTruies) {
            setModalConfirmation(confirmation);
        }
        if (confirmation && globalCount != nbTruies) {
            modalConfirmationCloser();
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
        }
    }, [modalInfo, confirmation, globalCount]);

    return (
        <View>
            <View style={styles.counterContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.counterText}>   {globalCount} / {nbTruies} </Text>
                    <TouchableWithoutFeedback onPress={() => {
                        setModalEchantillonVisible(true);
                    }}>
                        <EvilIcons name="question" size={30} color="black" />
                    </TouchableWithoutFeedback>
                </View>
                <ProgressBar progress={globalCount / nbTruies} width={200} />
            </View>
            <View style={{ height: Dimensions.get('window').height / 1.60 }}>
                <ScrollView>
                    <View>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Nombre de truies maigres {" "}
                                <TouchableWithoutFeedback onPress={() => {
                                    setModalInput1Visible(true);
                                }}>
                                    <FontAwesome name="question-circle" size={24} color="black" />
                                </TouchableWithoutFeedback>
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Image style={styles.photo1} source={{ uri: props.photo1 }} />
                            <Counter onChange={changeHandler} max={nbTruies} />
                        </View>
                    </View>

                    <View style={{ marginVertical: 25 }}>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Nombre de truies normales {" "}
                                <TouchableWithoutFeedback>
                                    <FontAwesome name="question-circle" size={24} color="black" />
                                </TouchableWithoutFeedback>
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Image style={styles.photo1} source={{ uri: props.photo1 }} />
                            <Counter onChange={changeHandler2} max={nbTruies} />
                        </View>
                    </View>

                    <View style={{ marginVertical: 25 }}>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Nombre de truies grasses {" "}
                                <TouchableWithoutFeedback>
                                    <FontAwesome name="question-circle" size={24} color="black" />
                                </TouchableWithoutFeedback>
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Image style={styles.photo1} source={{ uri: props.photo1 }} />
                            <Counter onChange={changeHandler3} max={nbTruies} />
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/*Modal définition des champs*/}
            <ModalPopupInfo
                visible={modalInput1Visible}
                onClose={modalInput1Closer}
                text='Une pression ferme avec la paume de la main permet de ressentir les reliefs osseux de la hanche et du dos.'
                buttonText='Fermer'
            />
            {/*Modal infos sur l'évaluation*/}
            <ModalPopupInfo
                visible={modalInfoVisible}
                onClose={modalInfoCloser}
                text='Regarder les saillies osseuses, la colonne vertebrale, les hanches et les arêtes osseuses doivent être inspectées et palpées.'
                buttonText='Fermer'
            />
            {/*Modal infos sur la composition de l'échantillon*/}
            <ModalPopupInfo
                visible={modalEchantillonVisible}
                onClose={modalEchantillonCloser}
                text='30 truies (dont 15 en milieu de gestation et 15 en fin de gestation) + 10 truies autour du sevrage.'
                buttonText='Fermer'
            />
            {/*Modal pour la confirmation de la validation*/}
            <ModalPopupInfo
                visible={modalConfirmation}
                onClose={modalConfirmationCloser}
                text='Valider définitivement les données saisies ?'
                buttonText='Annuler'
                confirmation
                onValidation={validationHandler}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    counterContainer: {
        alignItems: 'center',
        marginBottom: 35,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    counterText: {
        fontFamily: 'open-sans-bold',
        fontSize: 20
    },
    photo1: {
        minWidth: 125,
        maxWidth: 200,
        maxHeight: 250,
        minHeight: 150
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17,
        marginLeft: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
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
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});


export default EtatCorporel;