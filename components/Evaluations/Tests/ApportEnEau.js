import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, Dimensions, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Counter from '../../UI/Counter';
import { FontAwesome } from '@expo/vector-icons';
import ModalPopupInfo from '../../UI/ModalPopupInfo';
import { EvilIcons } from '@expo/vector-icons';
import * as testActions from '../../../store/actions/test';


const ApportEnEau = props => {

    const { modalInfo, confirmation, navigation, evaluation, Vtype } = props;
    const [modalEchantillonVisible, setModalEchantillonVisible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalInput1Visible, setModalInput1Visible] = useState(false);
    const [modalInput2Visible, setModalInput2Visible] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);

    const dispatch = useDispatch();

    const note = Math.round(((count / (count + count2)) * 10 + Number.EPSILON) * 10) / 10;

    const validationHandler = async () => {
        await dispatch(testActions.ajouterTest(note, evaluation.nomEvaluation));

        if (Vtype == 'valider') {
            modalConfirmationCloser();
            navigation.navigate('TestRecap');
        } else { //Suivant case
            props.onNextValidation();
        }
    };

    const changeHandler = (count, sign, value) => {
        setCount(count);
    };
    const changeHandler2 = (count2, sign, value) => {
        setCount2(count2);
    };

    const modalInput1Closer = () => setModalInput1Visible(false);
    const modalInput2Closer = () => setModalInput2Visible(false);
    const modalEchantillonCloser = () => setModalEchantillonVisible(false);
    const modalInfoCloser = () => {
        setModalInfoVisible(false); //local component
        props.onCloseInfo(); //parent component
    };
    const modalConfirmationCloser = useCallback(() => {
        setModalConfirmation(false); //local component
        props.onCloseConfirmation(); //parent component
    });

    useEffect(() => {
        setModalInfoVisible(modalInfo);
        if (confirmation && (count != 0 || count2 != 0)) {
            setModalConfirmation(confirmation);
            return;
        }
        if (confirmation) {
            modalConfirmationCloser();
            Alert.alert('Erreur', `Il faut au moins un abreuvoir pour valider cette évaluation.`, [{ text: 'Compris', style: 'destructive' }]);
        }
    }, [modalInfo, confirmation, count, count2]);


    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', height: '10%', paddingTop: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.counterText}>   {count + count2} abreuvoirs </Text>
                    <TouchableWithoutFeedback onPress={() => {
                        setModalEchantillonVisible(true);
                    }}>
                        <EvilIcons name="question" size={30} color="black" />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={{ height: '90%' }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ paddingBottom: 15 }}>
                            <View>
                                <Text style={styles.text}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                    Abreuvoir adéquat {" "}
                                    <Text onPress={() => setModalInput1Visible(true)}>
                                        <FontAwesome name="question-circle" size={24} color="black" />
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Image style={styles.photo} source={require('../../../assets/img/evaluations/Proprete-de-la-case-photo1.png')} />
                                <Counter onChange={changeHandler} max={null} />
                            </View>
                        </View>

                        <View>
                            <View>
                                <Text style={styles.text}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                    Abreuvoir inadéquat {" "}
                                    <Text onPress={() => setModalInput2Visible(true)}>
                                        <FontAwesome name="question-circle" size={24} color="black" />
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Image style={styles.photo} source={require('../../../assets/img/evaluations/Proprete-de-la-case-photo1.png')} />
                                <Counter onChange={changeHandler2} max={null} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/*Modal définition des champs*/}
            <ModalPopupInfo
                visible={modalInput1Visible}
                onClose={modalInput1Closer}
                text="Abreuvoir avec un bon fonctionnement permettant une absence de compétition et une absence de souillure."
                buttonText='Fermer'
            />
            {/*Modal définition des champs*/}
            <ModalPopupInfo
                visible={modalInput2Visible}
                onClose={modalInput2Closer}
                text='Abreuvoir avec un mauvais fonctionnement et/ou ne permettant pas une absence de compétition et/ou une absence de souillure.'
                buttonText='Fermer'
            />
            {/*Modal infos sur l'évaluation*/}
            <ModalPopupInfo
                visible={modalInfoVisible}
                onClose={modalInfoCloser}
                text="L'apport en eau doit permettre de répondre aux 10% du poids net des truies en eau. On prend en compte la fonctionnalité de l'abreuvoir et la qualité de l'eau. L'abreuvoir est considété comme propre s'il ne présente pas de fecès ou de moisissure."
                buttonText='Fermer'
            />
            {/*Modal infos sur la composition de l'échantillon*/}
            <ModalPopupInfo
                visible={modalEchantillonVisible}
                onClose={modalEchantillonCloser}
                text="L'évaluation est réalisée sur l'ensemble de l'élevage."
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
    content: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    counterText: {
        fontFamily: 'open-sans-bold',
        fontSize: 20
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17,
        marginLeft: 20,
        paddingVertical: 5
    },
    photo: {
        height: Dimensions.get('window').height / 5,
        width: Dimensions.get('window').width / 2
    }
});


export default ApportEnEau;