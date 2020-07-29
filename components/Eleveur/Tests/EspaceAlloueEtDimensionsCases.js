import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableWithoutFeedback, Keyboard, Image, Alert, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { CheckBox } from "native-base";
import Colors from '../../../constants/Colors';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import Shadow from '../../../components/UI/Shadow';
import * as testActions from '../../../store/actions/test';
import InputBorder from '../../../components/UI/InputBorder';
import { FontAwesome } from '@expo/vector-icons';
import Counter from '../../UI/Counter';

const EspaceAlloueEtDimensionsCases = props => {

    const { modalInfo, confirmation, navigation, evaluation, Vtype } = props;
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalInputVisible, setModalInputVisible] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [choixCochette, setChoixCochette] = useState(true);
    const [notes, setNotes] = useState([]);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [adequat, setAdequat] = useState();
    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);
    const [globalCount, setGlobalCount] = useState(0);
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

        const noteDimension = Math.round(((count3 / (count3 + count4)) * 10 + Number.EPSILON) * 10) / 10;
        await dispatch(testActions.ajouterTest(noteDimension, evaluation.nomEvaluation));

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
    const modalInputCloser = () => setModalInputVisible(false);

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

    const changeHandler = (count, sign, value) => {
        setCount3(count);
    };
    const changeHandler2 = (count2, sign, value) => {
        setCount4(count2);
    };

    return (
        <View style={{ flex: 1 }}>
            <View>
                <View>
                    <View style={{ height: '96%' }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flex: 1 }}>

                            <View>
                                <Text style={styles.text}>Type d'animaux (à cocher) ?{""}</Text>
                                <View style={styles.innerContainer}>
                                    <CheckBox
                                        onPress={() => setChoixCochette(true)}
                                        color={Colors.primary}
                                        checked={choixCochette}
                                    />
                                    <Text style={styles.label}>cochettes</Text>
                                    <CheckBox
                                        onPress={() => setChoixCochette(false)}
                                        color={Colors.primary}
                                        checked={!choixCochette}
                                    />
                                    <Text style={styles.label}>truies</Text>
                                </View>
                                
                            </View>

                            <View style={{ paddingTop: 10 }}>
                                <Text style={{ ...styles.text, paddingTop: 15 }}>Nombre d'animaux dans le groupe : </Text>
                                <View style={styles.innerContainer}>
                                    <InputBorder>
                                        <TextInput
                                            style={{ ...styles.text, paddingTop: 15 }}
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
                                
                            </View>

                            <View style={{ paddingTop: 10 }}>
                                <Text style={{ ...styles.text, paddingTop: 15 }}>Superficie de la case en m2 : </Text>
                                <View style={styles.innerContainer}>
                                    <InputBorder>
                                        <TextInput
                                            style={{ ...styles.text, paddingTop: 15 }}
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


                            <View style={{ paddingTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ ...styles.text, paddingTop: 15 }}>
                                        La case de mise-bas est de taille adéquate pour la truie {" "}
                                    <TouchableWithoutFeedback onPress={() => {
                                            setModalInputVisible(true);
                                    }}>
                                            <FontAwesome name="question-circle" size={24} color="black" />
                                        </TouchableWithoutFeedback>
                                    </Text>
                                    <View style={styles.content}>
                                        <Image style={styles.photo} source={{ uri: evaluation.photo1 }} />
                                        <Counter onChange={changeHandler}/>
                                    </View>
                                </View>
                            </View>
                            

                            <View style={{ paddingTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ ...styles.text, paddingTop: 15 }}>La case de mise-bas n'est pas adaptée</Text>
                                </View>
                                <View style={styles.content}>
                                    <Image style={styles.photo} source={{ uri: evaluation.photo1 }} />
                                    <Counter onChange={changeHandler2} />
                                </View>
                            </View>
                            
                        </View>                 
                    </ScrollView>
                    </View>

                    {/*Modal infos sur l'évaluation*/}
                    <ModalPopupInfo
                        visible={modalInputVisible}
                        onClose={modalInputCloser}
                        text="La taille de la case est considérée comme adéquate quand les truies ont un espace de confort qui leur permettent de se tenir debout et de s'allonger."
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
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17
    },
    label: {
        fontFamily: 'open-sans',
        fontSize: 15,
        paddingLeft: 15
    },
    bigText: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: Colors.primary
    },
    button: {
        marginTop: 15,
        width: "35%",
        height: 35,
        backgroundColor: Colors.accent,
        borderRadius: 10,
        alignItems: "center",
        borderRadius: 10,
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
    },
    photo: {
        height: Dimensions.get('window').height / 5,
        width: Dimensions.get('window').width / 1.5
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 15
    },
});


export default EspaceAlloueEtDimensionsCases;