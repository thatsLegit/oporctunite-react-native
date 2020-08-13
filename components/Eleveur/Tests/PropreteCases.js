import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, Dimensions, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Counter from '../../UI/Counter';
import { FontAwesome } from '@expo/vector-icons';
import ModalPopupInfo from '../Evaluations/ModalPopupInfo';
import { EvilIcons } from '@expo/vector-icons';
import * as testActions from '../../../store/actions/test';


const PropreteCases = props => {

    const { modalInfo, evaluation, confirmation, navigation, Vtype } = props;
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalEchantillonVisible, setModalEchantillonVisible] = useState(false);
    const [modalInput1Visible, setModalInput1Visible] = useState(false);
    const [modalInput2Visible, setModalInput2Visible] = useState(false);
    const [modalInput3Visible, setModalInput3Visible] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);

    const dispatch = useDispatch();

    const note = Math.round(((count / (count + count2 + count3)) * 10 + (count2 / (count + count2 + count3)) * 5 + Number.EPSILON) * 10) / 10;

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
    const changeHandler2 = (count, sign, value) => {
        setCount2(count);
    };
    const changeHandler3 = (count, sign, value) => {
        setCount3(count);
    };

    const modalInput1Closer = () => setModalInput1Visible(false);
    const modalInput2Closer = () => setModalInput2Visible(false);
    const modalInput3Closer = () => setModalInput3Visible(false);
    const modalEchantillonCloser = () => setModalEchantillonVisible(false);

    const modalInfoCloser = () => {
        setModalInfoVisible(false);
        props.onCloseInfo();
    };
    const modalConfirmationCloser = useCallback(() => {
        setModalConfirmation(false); //local component
        props.onCloseConfirmation(); //parent component
    });

    useEffect(() => {
        setModalInfoVisible(modalInfo);
        if (confirmation && (count != 0 || count2 != 0 || count3 != 0)) {
            setModalConfirmation(confirmation);
            return;
        }
        if (confirmation) {
            modalConfirmationCloser();
            Alert.alert('Erreur', `Il faut renseigner au moins une case pour valider cette évaluation.`, [{ text: 'Compris', style: 'destructive' }]);
        }
    }, [modalInfo, confirmation, count, count2, count3]);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', height: '10%', paddingTop: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.counterText}>   {count + count2 + count3} case(s) </Text>
                    <TouchableWithoutFeedback onPress={() => {
                        setModalEchantillonVisible(true);
                    }}>
                        <EvilIcons name="question" size={30} color="black" />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={{ height: '82%' }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View>
                            <View>
                                <Text style={styles.text}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Nombre de cases propres {" "}
                                    <TouchableWithoutFeedback onPress={() => {
                                        setModalInput1Visible(true);
                                    }}>
                                        <FontAwesome name="question-circle" size={24} color="black" />
                                    </TouchableWithoutFeedback>
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
                                Nombre de cases sales {" "}
                                    <TouchableWithoutFeedback onPress={() => {
                                        setModalInput2Visible(true);
                                    }}>
                                        <FontAwesome name="question-circle" size={24} color="black" />
                                    </TouchableWithoutFeedback>
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Image style={styles.photo} source={require('../../../assets/img/evaluations/Proprete-de-la-case-photo1.png')} />
                                <Counter onChange={changeHandler2} max={null} />
                            </View>
                        </View>

                        <View>
                            <View>
                                <Text style={styles.text}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Nombre de cases très sales {" "}
                                    <TouchableWithoutFeedback onPress={() => {
                                        setModalInput3Visible(true);
                                    }}>
                                        <FontAwesome name="question-circle" size={24} color="black" />
                                    </TouchableWithoutFeedback>
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Image style={styles.photo} source={require('../../../assets/img/evaluations/Proprete-de-la-case-photo1.png')} />
                                <Counter onChange={changeHandler3} max={evaluation.nbTruies} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/*Modal définition des champs*/}
            <ModalPopupInfo
                visible={modalInput1Visible}
                onClose={modalInput1Closer}
                text="Une case propre correspond à une surface souillée de fécès inférieure à 25% de la surface totale de la case, une délimitation très claire entre la zone propre et la zone sale étant évidemment présente."
                buttonText='Fermer'
            />
            <ModalPopupInfo
                visible={modalInput2Visible}
                onClose={modalInput2Closer}
                text="Une case plutôt sale inclut une surface couverte de fécès inférieure à la moitié de la surface du sol associée à une absence de séparation claire entre la zone de défécation et la zone de repos."
                buttonText='Fermer'
            />
            <ModalPopupInfo
                visible={modalInput3Visible}
                onClose={modalInput3Closer}
                text="Une case très sale correspond à une case dont plus de la moitié de la surface du sol est souillée de fécès avec une absence de séparation entre les zones."
                buttonText='Fermer'
            />
            {/*Modal infos sur la composition de l'échantillon*/}
            <ModalPopupInfo
                visible={modalEchantillonVisible}
                onClose={modalEchantillonCloser}
                text="L'évaluation est réalisée sur l'ensemble de l'élevage."
                buttonText='Fermer'
            />
            {/*Modal infos sur l'évaluation*/}
            <ModalPopupInfo
                visible={modalInfoVisible}
                onClose={modalInfoCloser}
                text={evaluation.description}
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
    photo: {
        height: Dimensions.get('window').height / 3,
        width: Dimensions.get('window').width / 2
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17,
        marginLeft: 20,
        paddingVertical: 15
    }
});


export default PropreteCases;