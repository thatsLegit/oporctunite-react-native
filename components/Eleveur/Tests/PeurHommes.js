import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Dimensions, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Counter from '../../UI/Counter';
import ProgressBar from 'react-native-progress/Bar';
import { FontAwesome } from '@expo/vector-icons';
import ModalPopupInfo from '../Evaluations/ModalPopupInfo';
import { EvilIcons } from '@expo/vector-icons';
import * as testActions from '../../../store/actions/test';
import Shadow from '../../../components/UI/Shadow';
import Colors from '../../../constants/Colors';


const PeurHommes = props => {

    const { modalInfo, evaluation, confirmation, navigation, Vtype } = props;
    const [modalEchantillonVisible, setModalEchantillonVisible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalInput1Visible, setModalInput1Visible] = useState(false);
    const [modalInput2Visible, setModalInput2Visible] = useState(false);
    const [modalInput3Visible, setModalInput3Visible] = useState(false);
    const [modalInput4Visible, setModalInput4Visible] = useState(false);
    const [modalInput5Visible, setModalInput5Visible] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    const [globalCount, setGlobalCount] = useState(0);

    const dispatch = useDispatch();

    const note = Math.round(((count / evaluation.nbTruies) * 10 + (count2 / evaluation.nbTruies) * 5 + Number.EPSILON) * 10) / 10;

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
        if (globalCount + value > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
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
        if (globalCount + value > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount2(count2);
        if (sign == 'plus') {
            setGlobalCount(globalCount + value);
        } else {
            setGlobalCount(globalCount - value);
        }
    };
    const changeHandler3 = (count3, sign, value) => {
        if (globalCount + value > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount3(count3);
        if (sign == 'plus') {
            setGlobalCount(globalCount + value);
        } else {
            setGlobalCount(globalCount - value);
        }
    };

    const modalInput1Closer = () => setModalInput1Visible(false);
    const modalInput2Closer = () => setModalInput2Visible(false);
    const modalInput3Closer = () => setModalInput3Visible(false);
    const modalInput4Closer = () => setModalInput4Visible(false);
    const modalInput5Closer = () => setModalInput5Visible(false);
    const modalEchantillonCloser = () => setModalEchantillonVisible(false);

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
        if (confirmation && globalCount == evaluation.nbTruies) {
            setModalConfirmation(confirmation);
            return;
        }
        if (confirmation) {
            modalConfirmationCloser();
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
        }
    }, [modalInfo, confirmation, globalCount]);

    return (
        <View>
            <View style={styles.counterContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <ProgressBar progress={globalCount / evaluation.nbTruies} width={200} />
                    </View>
                    <Text style={styles.counterText}>   {globalCount} / {evaluation.nbTruies} </Text>
                    <TouchableWithoutFeedback onPress={() => {
                        setModalEchantillonVisible(true);
                    }}>
                        <EvilIcons name="question" size={30} color="black" />
                    </TouchableWithoutFeedback>
                </View>
            </View>

            <View style={{ height: Dimensions.get('window').height / 1.6 }}>
                <ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Shadow style={styles.description}>
                            <Text style={{ fontFamily: 'open-sans', fontSize: 17 }}>
                                Les mesures sont différentes selon si les truies sont en groupe {" "}
                                <TouchableWithoutFeedback onPress={() => {
                                    setModalInput4Visible(true);
                                }}>
                                    <EvilIcons name="question" size={30} color="black" />
                                </TouchableWithoutFeedback>
                                {" "} ou en case {" "}
                                <TouchableWithoutFeedback onPress={() => {
                                    setModalInput5Visible(true);
                                }}>
                                    <EvilIcons name="question" size={30} color="black" />
                                </TouchableWithoutFeedback>
                            </Text>
                        </Shadow>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Truies ayant une peur faible de l'homme {" "}
                                <TouchableWithoutFeedback onPress={() => {
                                    setModalInput1Visible(true);
                                }}>
                                    <FontAwesome name="question-circle" size={24} color="black" />
                                </TouchableWithoutFeedback>
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Counter onChange={changeHandler} max={evaluation.nbTruies} />
                        </View>
                    </View>

                    <View style={{ marginTop: 25 }}>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Truies ayant une peur modérée de l'homme {" "}
                                <TouchableWithoutFeedback onPress={() => {
                                    setModalInput2Visible(true);
                                }}>
                                    <FontAwesome name="question-circle" size={24} color="black" />
                                </TouchableWithoutFeedback>
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Counter onChange={changeHandler2} max={evaluation.nbTruies} />
                        </View>
                    </View>

                    <View style={{ marginTop: 25 }}>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Truies ayant une peur importante de l'homme {" "}
                                <TouchableWithoutFeedback onPress={() => {
                                    setModalInput3Visible(true);
                                }}>
                                    <FontAwesome name="question-circle" size={24} color="black" />
                                </TouchableWithoutFeedback>
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Counter onChange={changeHandler3} max={evaluation.nbTruies} />
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/*Modal définition des champs*/}
            <ModalPopupInfo
                visible={modalInput1Visible}
                onClose={modalInput1Closer}
                text="La truie permet à l'évaluateur de la toucher entre les oreilles sans réponse de retrait ou la truie se retire dans l'évaluateur tente de la toucher entre les oreilles mais revient."
                buttonText='Fermer'
            />
            <ModalPopupInfo
                visible={modalInput2Visible}
                onClose={modalInput2Closer}
                text="La truie se retire initialement mais se rapproche quand l'évaluateur est en stade 1 ou quand l'évaluateur est accroupi en face d'elle (stade 1 et 2), ou quand l'évaluateur tente de la toucher entre les oreilles la truie se retire et reste en arrière (stade 3)"
                buttonText='Fermer'
            />
            <ModalPopupInfo
                visible={modalInput3Visible}
                onClose={modalInput3Closer}
                text="La truie se retire quand l'évaluateur est en position 'de départ' ou la truie se retire et reste en retrait quand l'évaluateur s'accroupit face à elle."
                buttonText='Fermer'
            />
            <ModalPopupInfo
                visible={modalInput4Visible}
                onClose={modalInput4Closer}
                align
                text={<Text>
                    La mesure comprend trois stades individuels : {"\n"}{"\n"}
                    <Text style={{ textDecorationLine: 'underline' }}>Stade 1</Text> : sélectionner une truie et bouger pour atteindre la 'position de début' qui se situe à environ 0,5m (dépendant de l'espace disponible) et tendre doucement sa main droite en direction de l'animal. Rester comme cela en bougeant le moins possible dans une position relâchée durant 10s. {"\n"}{"\n"}
                    <Text style={{ textDecorationLine: 'underline' }}>Stade 2</Text> : bouger doucement depuis la 'position de début' vers la truie dans une direction diagonale et regarder la truie sans la fixer. Garder les mains et bras le long du corps. Une fois arrivée à la tête de l'animal, s'accroupir face à elle et rester sans bouger durant 10s. Si la truie ne réagit pas, procéder au stade 3 {"\n"}{"\n"}
                    <Text style={{ textDecorationLine: 'underline' }}>Stade 3</Text> : Essayer de toucher la truie entre les oreilles pendant 10s. S'assurer lors de ce moment que l'évaluateur est en mesure de retirer rapidement sa main et de se mettre en sécurité dans le cas où la truie fait un mouvement soudain.
                    </Text>}
                buttonText='Fermer'
            />
            <ModalPopupInfo
                visible={modalInput5Visible}
                onClose={modalInput5Closer}
                align
                text={<Text>
                    La mesure comprend trois stades individuels : {"\n"}{"\n"}
                    <Text style={{ textDecorationLine: 'underline' }}>Stade 1</Text> : entrer dans l'enclos et marcher doucement et régulièrement autour du périmètre de l'enclos. Ensuite bouger jusqu'à une position "de départ", qui est d'environ 0,5m de la truie test (dépendant de l'espace disponible) et y rester sans mouvement pendant 10s. Si la truie ne bouge pas, procéder au stade 2.{"\n"}{"\n"}
                    <Text style={{ textDecorationLine: 'underline' }}>Stade 2</Text> : bouger doucement depuis la "position de début" vers la tête de la truie puis s'accroupir et tenir la position 10s sans bouger. Si la truie ne bouge pas, passer au stade 3.{"\n"}{"\n"}
                    <Text style={{ textDecorationLine: 'underline' }}>Stade 3</Text> : Essayer de toucher la truie entre les oreilles pendant 10s. Si à n'importe quel moment la truie bouge à cause d'une distraction ou interruption de la part de l'évaluateur, non du à la peur , suivre le sujet jusqu'à sa nouvelle localisation et continuer le test.{"\n"}{"\n"}
                        Continuer du début du stade 3 qui a été interrompu, mais ne pas répéter les précedents stades. Une truie qui se déplace trois fois d'affiler sans avoir peur est enregistrée comme " retirer " pour ce stade.
                    </Text>}
                buttonText='Fermer'
            />
            {/*Modal infos sur l'évaluation*/}
            <ModalPopupInfo
                visible={modalInfoVisible}
                onClose={modalInfoCloser}
                text={evaluation.description}
                buttonText='Fermer'
            />
            {/*Modal infos sur la composition de l'échantillon*/}
            <ModalPopupInfo
                visible={modalEchantillonVisible}
                onClose={modalEchantillonCloser}
                text='20 truies (dont 10 en début de gestation et 10 en fin de gestation).'
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
    counterContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    counterText: {
        fontFamily: 'open-sans-bold',
        fontSize: 15
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17,
        marginLeft: 20
    },
    description: {
        width: '90%',
        borderColor: Colors.secondary,
        borderWidth: 2,
        borderRadius: 15,
        padding: 10
    }
});


export default PeurHommes;