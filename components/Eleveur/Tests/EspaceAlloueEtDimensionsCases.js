import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, Dimensions, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckBox } from "native-base";
import Colors from '../../../constants/Colors';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import Shadow from '../../../components/UI/Shadow';
import * as testActions from '../../../store/actions/test';
import InputBorder from '../../../components/UI/InputBorder';


const EspaceAlloueEtDimensionsCases = props => {

    const { modalInfo, confirmation, navigation, evaluation, evaluation2, Vtype } = props;
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalInputVisible, setModalInputVisible] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [choixCochette, setChoixCochette] = useState(true);
    const [demarrage, setDemarrage] = useState(true);
    const [notes, setNotes] = useState([]);
    const [notes2, setNotes2] = useState([]);
    const [adequat, setAdequat] = useState();
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

        const noteDimensionCase = adequat ? 10 : 0;
        const syncNotes2 = [...notes2, noteDimensionCase];
        const noteFinaleDim = syncNotes.reduce((sum, n) => sum + n, 0) / syncNotes2.length;
        await dispatch(testActions.ajouterTest(noteFinaleDim, evaluation2.nomEvaluation));

        if (Vtype == 'valider') {
            modalConfirmationCloser();
            navigation.navigate('TestRecap');
        } else { //Suivant case
            props.onNextValidation();
        }
    };

    const modalInputCloser = () => setModalInputVisible(false);
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
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.demarrage}>
                        <Text style={styles.bigText}>Votre élevage comprend-t-il des groupes de cochettes ?{"\n"}</Text>
                        <View style={styles.innerDemarrage}>
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
                                <Shadow>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }}>
                                        <Text style={styles.buttonText}>Suite</Text>
                                        <MaterialIcons style={{ paddingTop: 3 }} name="navigate-next" size={31} color="white" />
                                    </View>
                                </Shadow>
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
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', height: '10%', justifyContent: 'center', paddingTop: 10 }}>
                {choixCochette && <Text style={styles.groupText}>Groupe des cochettes </Text>}
                {!choixCochette && <Text style={styles.groupText}>Groupe des truies </Text>}
            </View>
            <View style={{ height: '80%' }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.espaceAlloue}>
                            <View style={styles.innerEspaceAlloue}>
                                <Text style={styles.text}>Nombre d'animaux dans le groupe : </Text>
                                <InputBorder>
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
                                </InputBorder>
                            </View>

                            <View style={styles.innerEspaceAlloue}>
                                <Text style={styles.text}>Superficie de la case en m2 : </Text>
                                <InputBorder>
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
                                </InputBorder>
                            </View>
                        </View>

                        <View style={styles.dimensionCases}>
                            <View style={styles.innerDimensionCases}>
                                <View style={{ marginHorizontal: 20 }}>
                                    <CheckBox
                                        onPress={() => setAdequat(true)}
                                        color={Colors.primary}
                                        checked={adequat}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.text}>
                                        La case de mise-bas est de taille adéquate pour la truie {" "}
                                        <TouchableWithoutFeedback onPress={() => {
                                            setModalInputVisible(true);
                                        }}>
                                            <FontAwesome name="question-circle" size={24} color="black" />
                                        </TouchableWithoutFeedback>
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.image}>
                                <Image style={styles.photo} source={require('../../../assets/img/evaluations/Dimensions-des-cases-de-mise-bas-photo1.png')} />
                            </View>

                            <View style={styles.innerDimensionCases}>
                                <View style={{ marginHorizontal: 20 }}>
                                    <CheckBox
                                        onPress={() => setAdequat(false)}
                                        color={Colors.primary}
                                        checked={!adequat}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.text}>La case de mise-bas n'est pas adaptée</Text>
                                </View>
                            </View>
                            <View style={styles.image}>
                                <Image style={styles.photo} source={require('../../../assets/img/evaluations/Dimensions-des-cases-de-mise-bas-photo1.png')} />
                            </View>
                        </View>

                        {choixCochette &&
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                                <Shadow style={{ ...styles.button, marginBottom: 30 }}>
                                    <TouchableOpacity onPress={() => {
                                        if (count == 0 || count2 == 0) {
                                            Alert.alert('Erreur', `Veuillez renseigner tous les champs de l'évaluation.`, [{ text: 'Compris', style: 'destructive' }]);
                                            return;
                                        }
                                        const surfaceParAnimal = Math.round((count2 / count) * 100) / 100;
                                        const note = surfaceParAnimal >= 1.64 ? 10 : 0;
                                        const noteDimension = adequat ? 10 : 0;
                                        setNotes2([noteDimension]);
                                        setNotes([note]);
                                        setCount(0);
                                        setCount2(0);
                                        setChoixCochette(false);
                                    }}>
                                        <Shadow>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }}>
                                                <Text style={styles.buttonText}>Suite</Text>
                                                <MaterialIcons style={{ paddingTop: 3 }} name="navigate-next" size={31} color="white" />
                                            </View>
                                        </Shadow>
                                    </TouchableOpacity>
                                </Shadow>
                            </View>
                        }
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
            <ModalPopupInfo
                visible={modalInputVisible}
                onClose={modalInputCloser}
                text="La taille de la case est considérée comme adéquate quand les truies ont un espace de confort qui leur permettent de se tenir debout et de s'allonger."
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
    espaceAlloue: {
        paddingTop: 5,
        paddingBottom: 10
    },
    dimensionCases: {
        alignItems: 'center'
    },
    innerDemarrage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50
    },
    innerEspaceAlloue: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingLeft: 10
    },
    innerDimensionCases: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        fontFamily: 'open-sans',
        fontSize: 15,
        marginLeft: 15
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17
    },
    photo: {
        height: Dimensions.get('window').height / 4,
        width: Dimensions.get('window').width / 1.3
    },
    demarrage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17
    },
    bigText: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: Colors.primary
    },
    button: {
        width: "35%",
        height: 35,
        backgroundColor: Colors.accent,
        borderRadius: 10,
        alignItems: "center",
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    },
    groupText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    image: {
        paddingTop: 10,
        paddingBottom: 25
    }
});


export default EspaceAlloueEtDimensionsCases;