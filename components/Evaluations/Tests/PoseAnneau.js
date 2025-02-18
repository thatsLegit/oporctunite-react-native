import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Counter from '../../UI/Counter';
import ModalPopupInfo from '../../UI/ModalPopupInfo';
import * as testActions from '../../../store/actions/test';


const PoseAnneau = props => {

    const { modalInfo, confirmation, navigation, evaluation, Vtype } = props;
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    const [globalCount, setGlobalCount] = useState(0);

    const dispatch = useDispatch();

    const note = Math.round(((count / globalCount) * 10 + (count2 / globalCount) * 5 + Number.EPSILON) * 10) / 10;

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
    const changeHandler3 = (count3, sign, value) => {
        setCount3(count3);
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
            return;
        }
        if (confirmation) {
            modalConfirmationCloser();
            Alert.alert('Erreur', `Il faut réaliser l'évaluation sur au moins 1 animal.`, [{ text: 'Compris', style: 'destructive' }]);
        }
    }, [modalInfo, confirmation, globalCount]);


    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: '90%' }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View>
                            <Text style={{ ...styles.text, paddingTop: 20, paddingBottom: 10 }}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Pas de mutilations réalisées
                            </Text>
                            <View style={styles.counter}>
                                <Counter onChange={changeHandler} max={null} />
                            </View>
                        </View>

                        <View>
                            <Text style={{ ...styles.text, paddingTop: 20, paddingBottom: 10 }}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Les mutilations sont réalisées avec l'utilisation d'anesthésiques
                            </Text>
                            <View style={styles.counter}>
                                <Counter onChange={changeHandler2} max={null} />
                            </View>
                        </View>

                        <View>
                            <Text style={{ ...styles.text, paddingTop: 20, paddingBottom: 10 }}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Les mutilations sont réalisées sans l'utilisation d'anesthésiques ou anelgésiques
                            </Text>
                            <View style={styles.counter}>
                                <Counter onChange={changeHandler3} max={null} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
    );
};


const styles = StyleSheet.create({
    counter: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 20
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17,
        marginLeft: 20
    }
});


export default PoseAnneau;