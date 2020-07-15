import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { CheckBox } from "native-base";
import Colors from '../../../constants/Colors';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import * as testActions from '../../../store/actions/test';


const EspaceAlloue = props => {

    const { modalInfo, confirmation, navigation, evaluation, Vtype } = props;
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [choixCochette, setChoixCochette] = useState(false);
    const [choixTruies, setChoixTruies] = useState(false);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);

    const dispatch = useDispatch();

    const superficie = Math.round((count / count2) * 10 + Number.EPSILON) / 10;

    const aireParAnimal = Math.round((superficie / count) * 100) / 100
        ? choixTruies
        : Math.round((superficie / count2) * 100) / 100;

    const note = () => {
        if (choixCochette) {
            return 10 ? aireParAnimal >= 1.64 : 0
        } else {

        }
    }

    const validationHandler = async () => {
        await dispatch(testActions.ajouterTest(note(), evaluation.nomEvaluation));

        if (Vtype == 'valider') {
            modalConfirmationCloser();
            navigation.navigate('TestRecap');
        } else { //Suivant case
            props.onNextValidation();
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
        if (confirmation && count > 0 && count2 > 0 && (choixTruies || choixCochette)) {
            setModalConfirmation(confirmation);
        }
        if (confirmation && (count == 0 || count2 == 0) && !choixTruies && !choixCochette) {
            modalConfirmationCloser();
            Alert.alert('Erreur', `Veuillez renseigner tous les champs requis pour l'évaluation.`, [{ text: 'Compris', style: 'destructive' }]);
        }
    }, [modalInfo, confirmation, choixTruies, choixCochette, count, count2]);


    return (
        <View>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View>
                    <View style={styles.container}>

                        <View style={styles.innerContainer}>
                            <Text style={styles.text}>Type d'animaux : </Text>
                            <CheckBox
                                onPress={() => setChoixCochette(!choixCochette)}
                                color={Colors.primary}
                                checked={choixCochette}
                            />
                            <Text style={styles.label}>Cochettes</Text>

                            <CheckBox
                                onPress={() => setChoixTruies(!choixTruies)}
                                color={Colors.primary}
                                checked={choixTruies}
                            />
                            <Text style={styles.label}>Truies</Text>
                        </View>

                        <View style={styles.innerContainer}>
                            <Text style={styles.text}>Nombre d'animaux dans le groupe : </Text>
                            <View style={styles.inputBorder}>
                                <TextInput
                                    style={styles.text}
                                    onBlur={() => {
                                        if (count == "") {
                                            setCount(0);
                                        }
                                    }}
                                    onChangeText={(num) => num.length > 0 ? setCount(parseInt(num)) : setCount("")}
                                    value={count.toString()}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='number-pad'
                                    maxLength={3}
                                />
                            </View>
                        </View>

                        <View style={styles.innerContainer}>
                            <Text style={styles.text}>Superficie de la case en m2 </Text>
                            <View style={styles.inputBorder}>
                                <TextInput
                                    style={styles.text}
                                    onBlur={() => {
                                        if (count2 == "") {
                                            setCount2(0);
                                        }
                                    }}
                                    onChangeText={(num) => num.length > 0 ? setCount2(parseInt(num)) : setCount2("")}
                                    value={count2.toString()}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='number-pad'
                                    maxLength={3}
                                />
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
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17
    },
    label: {
        fontFamily: 'open-sans',
        fontSize: 15,
        marginLeft: 15
    },
    inputBorder: {
        width: "15%",
        borderColor: Colors.primary,
        borderWidth: 3,
        borderRadius: 10,
        padding: 5
    }
});


export default EspaceAlloue;