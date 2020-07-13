import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import Counter from '../../UI/Counter';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import * as testActions from '../../../store/actions/test';


const EspaceAlloue = props => {

    const { modalInfo, confirmation, navigation, evaluation, Vtype } = props;
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [globalCount, setGlobalCount] = useState(0);

    const dispatch = useDispatch();

    const note = Math.round(((count / globalCount) * 10 + Number.EPSILON) * 10) / 10;

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
        if (sign == 'plus') {
            setGlobalCount(globalCount + value);
        } else {
            setGlobalCount(globalCount - value);
        }
    };
    const changeHandler2 = (count2, sign, value) => {
        setCount2(count2);
        if (sign == 'plus') {
            setGlobalCount(globalCount + value);
        } else {
            setGlobalCount(globalCount - value);
        }
    };

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
        if (confirmation && globalCount > 0) {
            setModalConfirmation(confirmation);
        }
        if (confirmation && globalCount == 0) {
            modalConfirmationCloser();
            Alert.alert('Erreur', `Il faut réaliser l'évaluation sur au moins 1 animal.`, [{ text: 'Compris', style: 'destructive' }]);
        }
    }, [modalInfo, confirmation, globalCount]);


    return (
        <View>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View>
                    <View style={styles.container}>
                        <View>
                            <View>
                                <Text style={styles.text}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                L'espace est adéquat
                            </Text>
                            </View>
                            <View style={styles.counter}>
                                <Counter onChange={changeHandler} max={null} />
                            </View>
                        </View>

                        <View style={{ marginVertical: 25 }}>
                            <View>
                                <Text style={styles.text}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                L'espace est inadéquat
                            </Text>
                            </View>
                            <View style={styles.counter}>
                                <Counter onChange={changeHandler2} max={null} />
                            </View>
                        </View>
                    </View>

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
            </TouchableWithoutFeedback>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        height: Dimensions.get('window').height / 1.60,
        justifyContent: 'center'
    },
    counter: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17,
        marginLeft: 20
    }
});


export default EspaceAlloue;