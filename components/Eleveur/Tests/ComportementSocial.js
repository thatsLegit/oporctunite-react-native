import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Alert, Keyboard, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Counter from '../../UI/Counter';
import { FontAwesome } from '@expo/vector-icons';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import * as testActions from '../../../store/actions/test';
import Colors from '../../../constants/Colors';
import Shadow from '../../../components/UI/Shadow';
import InputBorder from '../../../components/UI/InputBorder';


const ComportementSocial = props => {

    const { modalInfo, confirmation, navigation, evaluation, Vtype } = props;
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalGroupeVisible, setModalGroupeVisible] = useState(false);
    const [modalInput1Visible, setModalInput1Visible] = useState(false);
    const [modalInput2Visible, setModalInput2Visible] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [demarrage, setDemarrage] = useState(true);
    const [page, setPage] = useState(0);
    const [init, setInit] = useState(false);
    const [notes, setNotes] = useState([]);
    const [pageActuelle, setPageActuelle] = useState(1);
    const [taille, setTaille] = useState(0);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);

    const dispatch = useDispatch();

    const validationHandler = async () => {
        const syncNotes = [...notes, Math.round(((count / (count + count2)) * 10 + Number.EPSILON) * 10) / 10];
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

    const modalInput1Closer = () => setModalInput1Visible(false);
    const modalInput2Closer = () => setModalInput2Visible(false);
    const modalGroupeCloser = () => setModalGroupeVisible(false);

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
        if (confirmation && pageActuelle == page && (count != 0 || count2 != 0)) {
            setModalConfirmation(confirmation);
            return;
        } if (confirmation) {
            modalConfirmationCloser();
            Alert.alert('Erreur', `Veuillez évaluer vos ${page} groupes avant de continuer.`, [{ text: 'Compris', style: 'destructive' }]);
        }
    }, [modalInfo, confirmation, pageActuelle, page, count, count2]);

    if (demarrage) {
        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View>
                    <View style={styles.demarrage}>
                        <Text style={styles.bigText}>Taille moyenne de vos groupes :{" "}</Text>
                        <TouchableWithoutFeedback onPress={() => {
                            setModalGroupeVisible(true);
                        }}>
                            <FontAwesome name="question-circle" size={24} color="black" />
                        </TouchableWithoutFeedback>
                        <InputBorder style={{ marginTop: 20 }}>
                            <TextInput
                                style={styles.text}
                                onBlur={() => Keyboard.dismiss()}
                                onChangeText={(num) => num.length > 0 ? setTaille(parseInt(num)) : setTaille("")}
                                value={taille.toString()}
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={3}
                            />
                        </InputBorder>
                        <Shadow style={styles.button}>
                            <TouchableOpacity onPress={() => start()}>
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
                </View>
            </TouchableWithoutFeedback>
        );
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View style={styles.container}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.groupText}>Groupe {pageActuelle} sur {page}</Text>
                    </View>

                    <View style={{ marginVertical: 25 }}>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Nombre d'animaux montrant un comportement social positif {" "}
                                <TouchableWithoutFeedback onPress={() => {
                                    setModalInput1Visible(true);
                                }}>
                                    <FontAwesome name="question-circle" size={24} color="black" />
                                </TouchableWithoutFeedback>
                            </Text>
                        </View>
                        <View style={styles.counter}>
                            <Counter onChange={changeHandler} max={null} reinitialiser={init} />
                        </View>
                    </View>

                    <View style={{ marginVertical: 25 }}>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Nombre d'animaux montrant un comportement social négatif {" "}
                                <TouchableWithoutFeedback onPress={() => {
                                    setModalInput2Visible(true);
                                }}>
                                    <FontAwesome name="question-circle" size={24} color="black" />
                                </TouchableWithoutFeedback>
                            </Text>
                        </View>
                        <View style={styles.counter}>
                            <Counter onChange={changeHandler2} max={null} reinitialiser={init} />
                        </View>
                    </View>

                    {pageActuelle < page &&
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Shadow style={styles.button}>
                                <TouchableOpacity onPress={() => {
                                    if (count == 0 && count2 == 0) {
                                        Alert.alert('Erreur', `Veuillez renseigner tous les champs avant de valider.`, [{ text: 'Compris', style: 'destructive' }]);
                                        return;
                                    }
                                    setPageActuelle(pageActuelle + 1);
                                    setNotes([...notes, Math.round(((count / (count + count2)) * 10 + Number.EPSILON) * 10) / 10]);
                                    setCount(0);
                                    setCount2(0);
                                    setInit(true);
                                }}>
                                    <Shadow><Text style={styles.buttonText}>Suivant</Text></Shadow>
                                </TouchableOpacity>
                            </Shadow>
                        </View>}
                </View>
            </TouchableWithoutFeedback>


            {/*Modal définition des champs*/}
            <ModalPopupInfo
                visible={modalInput1Visible}
                onClose={modalInput1Closer}
                text='Du reniflement, du bruit, du léchage ou des doux mouvements sans agressivité ou réaction de fuite de la part de cet individu.'
                buttonText='Fermer'
            />
            {/*Modal définition des champs*/}
            <ModalPopupInfo
                visible={modalInput2Visible}
                onClose={modalInput2Closer}
                text="Comportement agressif, incluant de la morsure ou de l'agressivité sociale, avec une réponse de la part de l'animal derangé."
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
        </View >
    );
};


const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height / 1.60,
        justifyContent: 'center'
    },
    demarrage: {
        height: Dimensions.get('window').height / 1.60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    counter: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
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
        marginTop: 50,
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
    }
});


export default ComportementSocial;