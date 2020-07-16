import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { CheckBox } from "native-base";
import Colors from '../../../constants/Colors';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import Shadow from '../../../components/UI/Shadow';
import * as testActions from '../../../store/actions/test';


const EspaceAlloue = props => {

    const { modalInfo, confirmation, navigation, evaluation, Vtype } = props;
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [choixCochette, setChoixCochette] = useState(false);
    const [demarrage, setDemarrage] = useState(true);
    const [notes, setNotes] = useState([]);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);

    const dispatch = useDispatch();

    const validationHandler = async () => {
        let coef = 1;
        if (count <= 6) {
            coef = 0.9;
        }
        if (count >= 40) {
            coef = 1.1;
        }
        const surfaceParAnimal = Math.round((count2 / count) * 100) / 100;
        const note = surfaceParAnimal >= 2.25 * coef ? 10 : 0;
        const syncNotes = [...notes, note];
        const noteFinale = syncNotes.reduce((sum, n) => sum + n, 0) / syncNotes.length;
        await dispatch(testActions.ajouterTest(noteFinale, evaluation.nomEvaluation));

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
        if (confirmation && count > 0 && count2 > 0 && !choixCochette) {
            setModalConfirmation(confirmation);
            return;
        }
        if (confirmation) {
            modalConfirmationCloser();
            Alert.alert('Erreur', `Veuillez renseigner tous les champs requis pour l'évaluation.`, [{ text: 'Compris', style: 'destructive' }]);
        }
    }, [modalInfo, confirmation, choixCochette, notes, count, count2]);


    if (demarrage) {
        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View>
                    <View style={styles.demarrage}>
                        <Text style={styles.bigText}>Votre élevage comprend-t-il des groupes de cochettes ?{"\n"}</Text>
                        <View style={styles.innerContainer}>
                            <CheckBox
                                onPress={() => setChoixCochette(true)}
                                color={Colors.primary}
                                checked={choixCochette}
                            />
                            <Text style={styles.label}>Oui</Text>
                            <CheckBox
                                onPress={() => setChoixCochette(false)}
                                color={Colors.primary}
                                checked={!choixCochette}
                            />
                            <Text style={styles.label}>Non</Text>
                        </View>
                        <Shadow style={styles.button}>
                            <TouchableOpacity onPress={() => setDemarrage(false)}>
                                <Shadow><Text style={styles.buttonText}>Suivant</Text></Shadow>
                            </TouchableOpacity>
                        </Shadow>
                    </View>
                    {/*Modal infos sur l'évaluation*/}
                    <ModalPopupInfo
                        visible={modalInfoVisible}
                        onClose={modalInfoCloser}
                        text={evaluation.description}
                        buttonText='Fermer'
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View>
                    <View style={styles.container}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {choixCochette && <Text style={styles.groupText}>Groupe des cochettes </Text>}
                            {!choixCochette && <Text style={styles.groupText}>Groupe des truies </Text>}
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
                            <Text style={styles.text}>Superficie de la case en m2 : </Text>
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

                        {choixCochette &&
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Shadow style={styles.button}>
                                    <TouchableOpacity onPress={() => {
                                        if (count == 0 || count2 == 0) {
                                            Alert.alert('Erreur', `Veuillez renseigner tous les champs de l'évaluation.`, [{ text: 'Compris', style: 'destructive' }]);
                                            return;
                                        }
                                        const surfaceParAnimal = Math.round((count2 / count) * 100) / 100;
                                        const note = surfaceParAnimal >= 1.64 ? 10 : 0;
                                        setNotes([note]);
                                        setCount(0);
                                        setCount2(0);
                                        setChoixCochette(false);
                                    }}>
                                        <Shadow><Text style={styles.buttonText}>Suivant</Text></Shadow>
                                    </TouchableOpacity>
                                </Shadow>
                            </View>}

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
    demarrage: {
        height: Dimensions.get('window').height / 1.60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
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
    bigText: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: Colors.primary
    },
    button: {
        marginTop: 50,
        width: "35%",
        height: 35,
        backgroundColor: Colors.accent,
        borderRadius: 10,
        alignItems: "center",
        borderRadius: 10,
    },
    inputBorder: {
        width: "15%",
        borderColor: Colors.primary,
        borderWidth: 3,
        borderRadius: 10,
        padding: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        padding: 4,
        fontFamily: 'open-sans-bold'
    },
    groupText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }
});


export default EspaceAlloue;