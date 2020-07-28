import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Alert, Keyboard, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import Counter from '../../UI/Counter';
import ProgressBar from 'react-native-progress/Bar';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import { EvilIcons } from '@expo/vector-icons';
import * as testActions from '../../../store/actions/test';
import Chrono from '../../UI/Chrono';


const DyspneeEtHaletement = props => {

    const { modalInfo, evaluation, confirmation, navigation, Vtype } = props;
    const [modalEchantillonVisible, setModalEchantillonVisible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);
    const [globalCount, setGlobalCount] = useState(0);

    const dispatch = useDispatch();

    const note = Math.round(((count2 / globalCount) * 10 + Number.EPSILON) * 10) / 10;
    const note2 = Math.round(((count3 / globalCount) * 10 + Number.EPSILON) * 10) / 10;
    const validationHandler = async () => {
        // A modifier selon la manière dont seront stockés les noms des évaluations simples dans l'évaluation composée
        await dispatch(testActions.ajouterTest(note, evaluation.nomEvaluation));
        //await dispatch(testActions.ajouterTest(note2, evaluation.nomEvaluation2));
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

    const changeHandler2 = (count, sign, value) => {
        if (globalCount + value > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount2(count);
        if (sign == 'plus') {
            setGlobalCount(globalCount + value);
        } else {
            setGlobalCount(globalCount - value);
        }
    };

    const changeHandler3 = (count, sign, value) => {
        if (globalCount + value > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount3(count);
        if (sign == 'plus') {
            setGlobalCount(globalCount + value);
        } else {
            setGlobalCount(globalCount - value);
        }
    };

    const changeHandler4 = (count, sign, value) => {
        if (globalCount + value > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount4(count);
        if (sign == 'plus') {
            setGlobalCount(globalCount + value);
        } else {
            setGlobalCount(globalCount - value);
        }
    };
    const modalEchantillonCloser = () => setModalEchantillonVisible(false);

    const modalInfoCloser = () => {
        setModalInfoVisible(false); //local component
        props.onCloseInfo();  //parent component
    };

    const modalConfirmationCloser = useCallback(() => {
        setModalConfirmation(false); //local component
        props.onCloseConfirmation(); //parent component
    });

    useEffect(() => {
        setModalInfoVisible(modalInfo);
        if (confirmation && globalCount == evaluation.nbTruies) {
            setModalConfirmation(confirmation);
            return;
        }
        if (confirmation) {
            modalConfirmationCloser();
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
        }
    }, [modalInfo, confirmation, globalCount]);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', height: '10%', paddingTop: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <ProgressBar progress={globalCount / evaluation.nbTruies} width={200} />
                    </View>
                    <Text style={styles.counterText}>   {globalCount} / {evaluation.nbTruies} </Text>
                    <TouchableWithoutFeedback onPress={() => {
                        setModalEchantillonVisible(true);
                    }}>
                        <EvilIcons name="question" size={30} color="black" />
                    </TouchableWithoutFeedback>            
                </View>
            </View>
            <View>
                <View style={{ height: '90%' }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View>
                                <Text style={{ ...styles.text, paddingTop: 15 }}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                    Pas de dyspnée, ni halètement {" "}
                                </Text>
                            </View>
                            <View style={{ ...styles.counter, paddingTop: 15 }}>
                                <Counter onChange={changeHandler2} max={evaluation.nbTruies} />
                            </View>

                            <View>
                                <Text style={{ ...styles.text, paddingTop: 15 }}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                    Présence de dyspnée {" "}
                                </Text>
                            </View>
                            <View style={{ ...styles.counter, paddingTop: 15 }}>
                                <Counter onChange={changeHandler} max={evaluation.nbTruies} />
                            </View>

                            <View>
                                <Text style={{ ...styles.text, paddingTop: 15 }}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                    Présence de truies qui halètent {" "}
                                </Text>
                            </View>
                            <View style={{ ...styles.counter, paddingTop: 15 }}>
                                <Counter onChange={changeHandler3} max={evaluation.nbTruies} />
                            </View>

                            <View>
                                <Text style={{ ...styles.text, paddingTop: 15 }}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                    Présence de dyspnée et d'halètement {" "}
                                </Text>
                            </View>
                            <View style={{ ...styles.counter, paddingTop: 15 }}>
                                <Counter onChange={changeHandler4} max={evaluation.nbTruies} />
                            </View>
                            <Chrono temps={5} />
                        </View>
                    </ScrollView>
                </View>
            </View>


            {/*Modal infos sur la composition de l'échantillon*/}
            <ModalPopupInfo
                visible={modalEchantillonVisible}
                onClose={modalEchantillonCloser}
                text='30 truies (dont 10 truies en début de gestation, 10 truies en milieu de gestation et 10 truies en fin de gestation) + 10 truies en lactation.'
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
    counter: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    counterText: {
        fontFamily: 'open-sans-bold',
        fontSize: 20
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17,
        marginLeft: 20
    }
});

export default DyspneeEtHaletement;