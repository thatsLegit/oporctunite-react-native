import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Alert, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import Counter from '../../UI/Counter';
import ProgressBar from 'react-native-progress/Bar';
import { FontAwesome } from '@expo/vector-icons';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import { EvilIcons } from '@expo/vector-icons';
import * as testActions from '../../../store/actions/test';
import Chrono from '../../UI/Chrono';


const Haletement = props => {

    const { modalInfo, nbTruies, confirmation, navigation, nomEvaluation, Vtype } = props;
    const [modalEchantillonVisible, setModalEchantillonVisible] = useState(false);
    const [modalInput1Visible, setModalInput1Visible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [count, setCount] = useState(0);
    const [globalCount, setGlobalCount] = useState(0);

    const dispatch = useDispatch();

    const note = Math.round((((nbTruies - count) / nbTruies) * 10 + Number.EPSILON) * 10) / 10;

    const validationHandler = async () => {
        await dispatch(testActions.ajouterTest(note, nomEvaluation));

        if (Vtype == 'valider') {
            modalConfirmationCloser();
            navigation.navigate('TestRecap');
        } else { //Suivant case
            props.onNextValidation();
        }
    };

    const changeHandler = (count, sign) => {
        if (globalCount + 1 > nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount(count);
        if (sign == 'plus') {
            setGlobalCount(globalCount + 1);
        } else {
            setGlobalCount(globalCount - 1);
        }
    };

    const timeCompleteHandler = () => {
        if (globalCount < nbTruies) {
            setGlobalCount(globalCount + 1)
        } else {
            return (
                Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${nbTruies}.`, [{ text: 'Compris', style: 'destructive' }])
            );
        }
    };

    const modalInput1Closer = () => setModalInput1Visible(false);
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
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles.container}>
                        <View>
                            <View>
                                <Text style={styles.text}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                    Nombre de truies présentant des signes d'halètement {" "}
                                    <TouchableWithoutFeedback onPress={() => {
                                        setModalInput1Visible(true);
                                    }}>
                                        <FontAwesome name="question-circle" size={24} color="black" />
                                    </TouchableWithoutFeedback>
                                </Text>
                            </View>
                            <View style={styles.counter}>
                                <Counter onChange={changeHandler} max={nbTruies} disableInput />
                            </View>
                            <Chrono onTimeComplete={timeCompleteHandler} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            {/*Modal définition des champs*/}
            <ModalPopupInfo
                visible={modalInput1Visible}
                onClose={modalInput1Closer}
                text="Respiration rapide, brève et saccadée effectuée par la bouche. Si la fréquence respiratoire est supérieure à 28 mouvements par minute, on consièdre qu'il y a halètement."
                buttonText='Fermer'
            />
            {/*Modal infos sur l'évaluation*/}
            <ModalPopupInfo
                visible={modalInfoVisible}
                onClose={modalInfoCloser}
                text="A prendre pendant le repos de l'animal (attendre 10 minutes suite à l'arrivée de l'évaluateur)"
                buttonText='Fermer'
            />
            {/*Modal infos sur la composition de l'échantillon*/}
            <ModalPopupInfo
                visible={modalEchantillonVisible}
                onClose={modalEchantillonCloser}
                text='40 truies: 30 truies en gestation + 10 truies en lactation'
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
    container: {
        marginTop: 20,
        height: Dimensions.get('window').height / 1.60,
        alignItems: 'center'
    },
    counter: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
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


export default Haletement;