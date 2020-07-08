import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Alert, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import Counter from '../../UI/Counter';
import ProgressBar from 'react-native-progress/Bar';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import { EvilIcons } from '@expo/vector-icons';
import * as testActions from '../../../store/actions/test';


const Stereotypies = props => {

    const { modalInfo, confirmation, navigation, nomEvaluation, Vtype, nbTruies } = props;
    const [modalEchantillonVisible, setModalEchantillonVisible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [globalCount, setGlobalCount] = useState(0);

    const dispatch = useDispatch();

    const note = Math.round(((count / globalCount) * 10 + Number.EPSILON) * 10) / 10;

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
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View>
                    <View style={styles.container}>
                        <View style={styles.headerContainer}>
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

                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <View>
                                <View>
                                    <Text style={styles.text}>
                                        <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Pas de comportement de stéréotypie observé
                            </Text>
                                </View>
                                <View style={styles.content}>
                                    <Counter onChange={changeHandler} max={nbTruies} />
                                </View>
                            </View>

                            <View style={{ marginVertical: 25 }}>
                                <View>
                                    <Text style={styles.text}>
                                        <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Mise en évidence de comportement de stéréotypie observé
                            </Text>
                                </View>
                                <View style={styles.content}>
                                    <Counter onChange={changeHandler2} max={nbTruies} />
                                </View>
                            </View>
                        </View>
                    </View>


                    {/*Modal infos sur l'évaluation*/}
                    <ModalPopupInfo
                        visible={modalInfoVisible}
                        onClose={modalInfoCloser}
                        text={<Text>Le comportement de stéréotypie est défini comme la séquence d'actes moteurs invariants qui n'apporte pas de gain évident au but pour l'animal.{"\n"}
                            les stéréotypies évaluées sont les faux mâchonnements, le roulement de langue, le grincement de dents, les morsures d'abreuvoirs, le lèchement de sol.{"\n"}
                            Chaque truie doit être observée 15 secondes au minimum.
                        </Text>}
                        buttonText='Fermer'
                    />
                    {/*Modal infos sur la composition de l'échantillon*/}
                    <ModalPopupInfo
                        visible={modalEchantillonVisible}
                        onClose={modalEchantillonCloser}
                        text="40 truies (dont 1/3 en début de gestation, 1/3 en milieu de gestation et 1/3 en fin de gestation)."
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
            </TouchableWithoutFeedback>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        height: Dimensions.get('window').height / 1.60,
        alignItems: 'center'
    },
    headerContainer: {
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
    text: {
        fontFamily: 'open-sans',
        fontSize: 17,
        marginLeft: 20
    }
});


export default Stereotypies;