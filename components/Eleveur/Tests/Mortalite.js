import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import * as testActions from '../../../store/actions/test';
import Shadow from '../../../components/UI/Shadow';
import Colors from '../../../constants/Colors';
import InputBorder from '../../../components/UI/InputBorder';


const Mortalite = props => {

    const { modalInfo, confirmation, navigation, evaluation, Vtype } = props;
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [A, setA] = useState(0);
    const [M, setM] = useState(0);
    const [mortalite, setMortalite] = useState(0);
    const note = 10 - mortalite / 10;

    const dispatch = useDispatch();

    const validationHandler = async () => {
        await dispatch(testActions.ajouterTest(note, evaluation.nomEvaluation));

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
        if (confirmation && A > 0 && A > M) {
            setModalConfirmation(confirmation);
            return;
        }
        if (confirmation) {
            modalConfirmationCloser();
            Alert.alert('Erreur', `Le nombre total d'animaux doit être positif et supérieur au nombre d'animaux morts ou retrouvés morts (A > M).`, [{ text: 'Compris', style: 'destructive' }]);
        }
    }, [modalInfo, confirmation, A, M]);


    return (
        <View>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View>
                    <View style={styles.container}>
                        <Shadow style={styles.description}>
                            <View>
                                <View>
                                    <Text style={styles.text}>
                                        <Text style={{ fontSize: 20 }}>A = </Text>
                                Le nombre total d'animaux placés dans le bâtiment.
                            </Text>
                                </View>
                            </View>
                            <View style={{ marginVertical: 25 }}>
                                <View>
                                    <Text style={styles.text}>
                                        <Text style={{ fontSize: 20 }}>M = </Text>
                                Nombre total d'animaux qui sont morts ou qui ont été retrouvés morts durant les 12 derniers mois.
                            </Text>
                                </View>
                            </View>
                        </Shadow>

                        <View style={styles.inputsContainer}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.text}>A = </Text>
                                <InputBorder>
                                    <TextInput
                                        style={styles.text}
                                        onBlur={() => {
                                            if (A == "") {
                                                setA(0);
                                            }
                                            if (A != 0 && M != 0) {
                                                setMortalite(Math.round((M / A) * 100));
                                            }
                                        }}
                                        onChangeText={(num) => num.length > 0 ? setA(parseInt(num)) : setA("")}
                                        value={A.toString()}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        keyboardType='number-pad'
                                        maxLength={5}
                                    />
                                </InputBorder>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.text}>M = </Text>
                                <InputBorder>
                                    <TextInput
                                        style={styles.text}
                                        onBlur={() => {
                                            if (M == "") {
                                                setM(0);
                                            }
                                            if (A != 0 && M != 0) {
                                                setMortalite(Math.round((M / A) * 100));
                                            }
                                        }}
                                        onChangeText={(num) => num.length > 0 ? setM(parseInt(num)) : setM("")}
                                        value={M.toString()}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        keyboardType='number-pad'
                                        maxLength={5}
                                    />
                                </InputBorder>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.text}>Mortalité : </Text>
                                <InputBorder>
                                    <Text style={styles.text}>{mortalite} %</Text>
                                </InputBorder>
                            </View>

                        </View>
                    </View>

                    {/*Modal infos sur l'évaluation*/}
                    <ModalPopupInfo
                        visible={modalInfoVisible}
                        onClose={modalInfoCloser}
                        text={
                            <Text>
                                La mortalité est définie comme la mort incontrôlée des animaux (à différencier de l'abattage/euthanasie).{"\n"}
                                <AntDesign name="warning" size={30} color="black" />
                                {"  "}Les morts-nés de doivent pas être pris en compte dans cette évaluation.
                            </Text>
                        }
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
    inputsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: 15
    },
    container: {
        marginTop: 20,
        height: Dimensions.get('window').height / 1.60,
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 18
    },
    description: {
        width: '90%',
        borderColor: Colors.secondary,
        borderWidth: 2,
        borderRadius: 15,
        padding: 10
    }
});


export default Mortalite;