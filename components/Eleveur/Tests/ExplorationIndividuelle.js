import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Alert, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import Counter from '../../UI/Counter';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import * as testActions from '../../../store/actions/test';
import Colors from '../../../constants/Colors';
import Shadow from '../../../components/UI/Shadow';
import InputBorder from '../../../components/UI/InputBorder';


const ExplorationIndividuelle = props => {

    const { modalInfo, confirmation, navigation, evaluation, Vtype } = props;
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalGroupeVisible, setModalGroupeVisible] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [demarrage, setDemarrage] = useState(true);
    const [noKeyboard, setNokeyboard] = useState(true);
    const [page, setPage] = useState(0);
    const [init, setInit] = useState(false);
    const [notes, setNotes] = useState([]);
    const [pageActuelle, setPageActuelle] = useState(1);
    const [taille, setTaille] = useState(0);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);

    const dispatch = useDispatch();

    const validationHandler = async () => {
        const syncNotes = [...notes, Math.round((((count2 + count3) / count) * 10 + Number.EPSILON) * 10) / 10];
        const noteFinale = syncNotes.reduce((sum, n) => sum + n, 0) / syncNotes.length;
        await dispatch(testActions.ajouterTest(noteFinale, evaluation.nomEvaluation));

        if (Vtype == 'valider') {
            modalConfirmationCloser();
            navigation.navigate('TestRecap');
        } else { //Suivant case
            props.onNextValidation();
        }
    };

    const start = () => {
        if (taille == "") {
            setTaille(0);
            Alert.alert('Erreur', `Veuillez entrer un nombre valide pour la taille de vos groupes.`, [{ text: 'Compris', style: 'destructive' }]);
            return;
        }
        if (taille == 0) {
            Alert.alert('Erreur', `Veuillez entrer un nombre valide pour la taille de vos groupes.`, [{ text: 'Compris', style: 'destructive' }]);
            return;
        }
        if (taille >= 40) {
            setPage(4);
        } else if (taille <= 15) {
            setPage(1);
        } else {
            setPage(2);
        }
        setDemarrage(false);
    };

    const changeHandler = count => setCount(count);
    const changeHandler2 = count => setCount2(count);
    const changeHandler3 = count => setCount3(count);

    const modalGroupeCloser = () => setModalGroupeVisible(false);

    const modalInfoCloser = () => {
        setModalInfoVisible(false);
        props.onCloseInfo();
    };

    const modalConfirmationCloser = useCallback(() => {
        setModalConfirmation(false); //local component
        props.onCloseConfirmation(); //parent component
    });

    const keyboardHandler = pol => {
        setNokeyboard(pol);
    }

    useEffect(() => {
        setModalInfoVisible(modalInfo);
        if (confirmation && pageActuelle == page && count3 != 0) {
            setModalConfirmation(confirmation);
            return;
        } if (confirmation) {
            modalConfirmationCloser();
            Alert.alert('Erreur', `Veuillez évaluer vos ${page} groupes avant de continuer.`, [{ text: 'Compris', style: 'destructive' }]);
        }
    }, [modalInfo, confirmation, pageActuelle, page, count3]);

    if (demarrage) {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.demarrage}>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.bigText}>Taille moyenne de vos groupes :{" "}</Text>
                            <TouchableWithoutFeedback onPress={() => {
                                setModalGroupeVisible(true);
                            }}>
                                <FontAwesome name="question-circle" size={24} color="black" />
                            </TouchableWithoutFeedback>
                        </View>
                        <InputBorder>
                            <TextInput
                                onFocus={() => keyboardHandler(false)}
                                onBlur={() => keyboardHandler(true)}
                                style={styles.text}
                                onChangeText={(num) => num.length > 0 ? setTaille(parseInt(num)) : setTaille("")}
                                value={taille.toString()}
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={3}
                            />
                        </InputBorder>
                        {(Platform.OS == 'android' ? noKeyboard : true) && (
                            <Shadow style={styles.button}>
                                <TouchableOpacity onPress={() => start()}>
                                    <Shadow>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }}>
                                            <Text style={styles.buttonText}>Suite</Text>
                                            <MaterialIcons style={{ paddingTop: 3 }} name="navigate-next" size={31} color="white" />
                                        </View>
                                    </Shadow>
                                </TouchableOpacity>
                            </Shadow>
                        )}
                    </View>
                    {/*Modal infos sur l'évaluation*/}
                    <ModalPopupInfo
                        visible={modalInfoVisible}
                        onClose={modalInfoCloser}
                        text={evaluation.description}
                        buttonText='Fermer'
                    />
                    {/*Modal infos sur les groupes*/}
                    <ModalPopupInfo
                        visible={modalGroupeVisible}
                        onClose={modalGroupeCloser}
                        text={<Text>
                            Les petits groupes (moins de 15 truies) sont évalués sur 4 cases. {"\n"}{"\n"}
                                Les grand groupes (plus de 40 truies) sont évalués sur 1 case. {"\n"}{"\n"}
                                Les groupes intermédiaires sont évalués sur 2 cases.
                            </Text>}
                        buttonText='Fermer'
                    />
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', height: '10%', justifyContent: 'center' }}>
                <Text style={styles.groupText}>Groupe {pageActuelle} sur {page}</Text>
            </View>
            <View style={{ height: '80%' }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1 }}>

                        <Text style={styles.text}>
                            Les comportements enregistrés sont : {"\n"}{"\n"}
                            * investigation de l'enclos (S) est définie comme le renifflement, le bruit, le léchage ou le machônnement de n'importe quel matériel présent dans l'enclos.{"\n"}{"\n"}
                            * Exploration du matériel d'enrichissement (E) est définie comme le jeu/l'investigation à travers la paille ou autre enrichissement matériel. Ces paramètres sont évalués en même temps que les comportements sociaux.{"\n"}{"\n"}
                            * Les animaux ne montrant pas de comportements positifs ou négatifs ou d'exploration devront être enregistrés comme au repos (R ) ou "autre" (O), qui est définit comme "les autres comportements actifs" tel que manger, boire ou reniffler l'air.
                        </Text>

                        <View>
                            <View>
                                <Text style={{ ...styles.text, paddingTop: 10 }}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Nombre total d'animaux dans l'enclos
                            </Text>
                            </View>
                            <View style={styles.counter}>
                                <Counter onChange={changeHandler} max={null} reinitialiser={init} />
                            </View>
                        </View>

                        <View>
                            <View>
                                <Text style={{ ...styles.text, paddingTop: 10 }}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Nombre d'animaux explorant l'enclos (S)
                            </Text>
                            </View>
                            <View style={styles.counter}>
                                <Counter onChange={changeHandler2} max={null} reinitialiser={init} />
                            </View>
                        </View>

                        <View>
                            <View>
                                <Text style={{ ...styles.text, paddingTop: 10 }}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Nombre d'animaux explorant le matériel (E)
                            </Text>
                            </View>
                            <View style={styles.counter}>
                                <Counter onChange={changeHandler3} max={null} reinitialiser={init} />
                            </View>
                        </View>

                        {pageActuelle < page &&
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
                                <Shadow style={styles.button}>
                                    <TouchableOpacity onPress={() => {
                                        if (count == 0 && count2 == 0) {
                                            Alert.alert('Erreur', `Veuillez renseigner tous les champs avant de valider.`, [{ text: 'Compris', style: 'destructive' }]);
                                            return;
                                        }
                                        setPageActuelle(pageActuelle + 1);
                                        setNotes([...notes, Math.round((((count2 + count3) / count) * 10 + Number.EPSILON) * 10) / 10]);
                                        setCount(0);
                                        setCount2(0);
                                        setCount3(0);
                                        setInit(!init);
                                    }}>
                                        <Shadow>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }}>
                                                <Text style={styles.buttonText}>Suite</Text>
                                                <MaterialIcons style={{ paddingTop: 3 }} name="navigate-next" size={31} color="white" />
                                            </View>
                                        </Shadow>
                                    </TouchableOpacity>
                                </Shadow>
                            </View>}
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
        </View >
    );
};


const styles = StyleSheet.create({
    demarrage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80
    },
    counter: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
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
        borderRadius: 10,
        marginTop: 50
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


export default ExplorationIndividuelle;