import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Counter from '../../UI/Counter';
import ProgressBar from 'react-native-progress/Bar';
import { FontAwesome } from '@expo/vector-icons';
import ModalPopupInfo from '../../UI/ModalPopupInfo';
import { EvilIcons } from '@expo/vector-icons';
import * as testActions from '../../../store/actions/test';


const LesionVulveEtMetrite = props => {

    const { modalInfo, modalInfo2, evaluation, evaluation2, confirmation, navigation, Vtype } = props;
    const [modalEchantillonVisible, setModalEchantillonVisible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalInfoVisible2, setModalInfoVisible2] = useState(modalInfo2);
    const [modalInput1Visible, setModalInput1Visible] = useState(false);
    const [modalInput2Visible, setModalInput2Visible] = useState(false);
    const [modalInput3Visible, setModalInput3Visible] = useState(false);
    const [modalInput4Visible, setModalInput4Visible] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);
    const [count5, setCount5] = useState(0);
    const [globalCount, setGlobalCount] = useState(0);
    const [globalCount2, setGlobalCount2] = useState(0);

    const dispatch = useDispatch();

    const note = Math.round((((evaluation.nbTruies - ((count) + (count3 * (1 / 2)))) / evaluation.nbTruies) * 10 + Number.EPSILON) * 10) / 10;
    const noteMetrite = Math.round((((evaluation.nbTruies - count4) / evaluation.nbTruies) * 10 + Number.EPSILON) * 10) / 10;

    const validationHandler = async () => {
        await dispatch(testActions.ajouterTest(note, evaluation.nomEvaluation));
        await dispatch(testActions.ajouterTest(noteMetrite, evaluation2.nomEvaluation));

        if (Vtype == 'valider') {
            modalConfirmationCloser();
            navigation.navigate('TestRecap');
        } else { //Suivant case
            props.onNextValidation();
        }
    };

    const changeHandler = (count, sign, value) => {
        if (globalCount + value > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
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
        if (globalCount + value > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
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
        if (globalCount + value > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount3(count3);
        if (sign == 'plus') {
            setGlobalCount(globalCount + value);
        } else {
            setGlobalCount(globalCount - value);
        }
    };
    const changeHandler4 = (count4, sign, value) => {
        if (globalCount2 + value > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount4(count4);
        if (sign == 'plus') {
            setGlobalCount2(globalCount2 + value);
        } else {
            setGlobalCount2(globalCount2 - value);
        }
    };
    const changeHandler5 = (count5, sign, value) => {
        if (globalCount2 + value > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount5(count5);
        if (sign == 'plus') {
            setGlobalCount2(globalCount2 + value);
        } else {
            setGlobalCount2(globalCount2 - value);
        }
    };

    const modalInput1Closer = () => setModalInput1Visible(false);
    const modalInput2Closer = () => setModalInput2Visible(false);
    const modalInput3Closer = () => setModalInput3Visible(false);
    const modalInput4Closer = () => setModalInput4Visible(false);
    const modalEchantillonCloser = () => setModalEchantillonVisible(false);

    const modalInfoCloser = () => {
        setModalInfoVisible(false);
        props.onCloseInfo();
    };
    const modalInfoCloser2 = () => {
        setModalInfoVisible2(false);
        props.onCloseInfo2();
    };
    const modalConfirmationCloser = useCallback(() => {
        setModalConfirmation(false); //local component
        props.onCloseConfirmation(); //parent component
    });

    useEffect(() => {
        setModalInfoVisible(modalInfo);
        setModalInfoVisible2(modalInfo2);
        if (confirmation && globalCount == evaluation.nbTruies) {
            setModalConfirmation(confirmation);
            return;
        }
        if (confirmation) {
            modalConfirmationCloser();
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
        }
    }, [modalInfo, modalInfo2, confirmation, globalCount]);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', height: '7%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <ProgressBar progress={((globalCount + globalCount2) / 2) / evaluation.nbTruies} width={200} />
                    </View>
                    <Text style={styles.counterText}>   {(globalCount + globalCount2) / 2} / {evaluation.nbTruies} </Text>
                    <TouchableWithoutFeedback onPress={() => {
                        setModalEchantillonVisible(true);
                    }}>
                        <EvilIcons name="question" size={30} color="black" />
                    </TouchableWithoutFeedback>
                </View>
                <Text style={styles.counterAttentionText}> 2 choix par truie obligatoire </Text>
            </View>
            <View style={{ height: '82%' }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                 Absence/légères lésions sur la vulve{" "}
                                <Text onPress={() => setModalInput1Visible(true)}>
                                    <FontAwesome name="question-circle" size={24} color="black" />
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Counter onChange={changeHandler2} max={evaluation.nbTruies} />
                        </View>
                    </View>
                    <View >
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                 Lésions modérées{" "}
                                <Text onPress={() => setModalInput2Visible(true)}>
                                    <FontAwesome name="question-circle" size={24} color="black" />
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Counter onChange={changeHandler3} max={evaluation.nbTruies} />
                        </View>
                    </View>
                    <View >
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Lésions sévères {" "}
                                <Text onPress={() => setModalInput3Visible(true)}>
                                    <FontAwesome name="question-circle" size={24} color="black" />
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Counter onChange={changeHandler} max={evaluation.nbTruies} />
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                 Absence de métrite{" "}
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Counter onChange={changeHandler5} max={evaluation.nbTruies} />
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Présence de métrite {" "}
                                <Text onPress={() => setModalInput4Visible(true)}>
                                    <FontAwesome name="question-circle" size={24} color="black" />
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Counter onChange={changeHandler4} max={evaluation.nbTruies} />
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/*Modal définition des champs*/}
            <ModalPopupInfo
                visible={modalInput1Visible}
                onClose={modalInput1Closer}
                text='Pas de dommage sur la vulve, ou petites lésions (moins de 2cm), ou tissu cicatriciel visible.'
                buttonText='Fermer'
            />
            <ModalPopupInfo
                visible={modalInput2Visible}
                onClose={modalInput2Closer}
                text='Blessure large de plus de 2cm visible, mais dans un processus de guérison (croûte formé ou tissu cicatriciel formé) ou une vulve déformée.'
                buttonText='Fermer'
            />
            <ModalPopupInfo
                visible={modalInput3Visible}
                onClose={modalInput3Closer}
                text='Blessure large de plus de 2cm qui saigne.'
                buttonText='Fermer'
            />
            <ModalPopupInfo
                visible={modalInput4Visible}
                onClose={modalInput4Closer}
                text='30 truies autour de la mise-bas + 10 truies après 2 jours de mise-bas.'
                buttonText='Fermer'
            />
            {/*Modal infos sur l'évaluation*/}
            <ModalPopupInfo
                visible={modalInfoVisible}
                onClose={modalInfoCloser}
                text={evaluation.description}
                buttonText='Fermer'
            />
            <ModalPopupInfo
                visible={modalInfoVisible2}
                onClose={modalInfoCloser2}
                text={evaluation2.description}
                buttonText='Fermer'
            />
            {/*Modal infos sur la composition de l'échantillon*/}
            <ModalPopupInfo
                visible={modalEchantillonVisible}
                onClose={modalEchantillonCloser}
                text='30 truies (dont 15 en milieu de gestation et 15 en fin de gestation) + 10 truies en lactation autour du sevrage.'
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
        marginBottom: 15,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 15
    },
    counterText: {
        fontFamily: 'open-sans-bold',
        fontSize: 15
    },
    counterAttentionText: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
        color: "red",
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17,
        marginLeft: 20
    }
});


export default LesionVulveEtMetrite;