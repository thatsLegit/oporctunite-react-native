import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableWithoutFeedback, Dimensions, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Counter from '../../UI/Counter';
import ProgressBar from 'react-native-progress/Bar';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import { EvilIcons } from '@expo/vector-icons';
import * as testActions from '../../../store/actions/test';


const PlaieEpauleEtBursite = props => {

    const { modalInfo, modalInfo2, evaluation, evaluation2, confirmation, navigation, Vtype } = props;
    const [modalEchantillonVisible, setModalEchantillonVisible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalInfoVisible2, setModalInfoVisible2] = useState(modalInfo2);
    const [modalInput2Visible, setModalInput2Visible] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);
    const [count5, setCount5] = useState(0);
    const [globalCount, setGlobalCount] = useState(0);

    const dispatch = useDispatch();

    const note = Math.round((((((evaluation.nbTruies-count)/evaluation.nbTruies) * 10 + ((evaluation.nbTruies-count3) / evaluation.nbTruies) * 5 + Number.EPSILON) * 10) / 10)/15)*10;
    const noteBursite = Math.round((((evaluation.nbTruies-count5)/evaluation.nbTruies) * 10 + Number.EPSILON) * 10) / 10;

    const validationHandler = async () => {
        await dispatch(testActions.ajouterTest(note, evaluation.nomEvaluation));
        await dispatch(testActions.ajouterTest(noteBursite, evaluation2.nomEvaluation));

        if (Vtype == 'valider') {
            modalConfirmationCloser();
            navigation.navigate('TestRecap');
        } else { //Suivant case
            props.onNextValidation();
        }
    };

    const changeHandler = (count, sign, value) => {
        if (globalCount + (value / 2) > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount(count);
        if (sign == 'plus') {
            setGlobalCount(globalCount + (value / 2));
        } else {
            setGlobalCount(globalCount - (value / 2));
        }
    };
    const changeHandler2 = (count2, sign, value) => {
        if (globalCount + (value / 2) > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount2(count2);
        if (sign == 'plus') {
            setGlobalCount(globalCount + (value / 2));
        } else {
            setGlobalCount(globalCount - (value / 2));
        }
    };
    const changeHandler3 = (count3, sign, value) => {
        if (globalCount + (value / 2) > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount3(count3);
        if (sign == 'plus') {
            setGlobalCount(globalCount + (value / 2));
        } else {
            setGlobalCount(globalCount - (value / 2));
        }
    };
    const changeHandler4 = (count, sign, value) => {
        if (globalCount + (value / 2) > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount4(count);
        if (sign == 'plus') {
            setGlobalCount(globalCount + (value / 2));
        } else {
            setGlobalCount(globalCount - (value / 2));
        }
    };
    const changeHandler5 = (count, sign, value) => {
        if (globalCount + (value / 2) > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount5(count);
        if (sign == 'plus') {
            setGlobalCount(globalCount + (value / 2));
        } else {
            setGlobalCount(globalCount - (value / 2));
        }
    };

    const modalEchantillonCloser = () => setModalEchantillonVisible(false);
    const modalInput2Closer = () => setModalInput2Visible(false);

    const modalInfoCloser = () => {
        setModalInfoVisible(false);
        props.onCloseInfo();
    };
    const modalInfoCloser2 = () => {
        setModalInfoVisible2(false);
        props.onCloseInfo2();
    };
    const modalConfirmationCloser = useCallback(() => {
        setModalConfirmation(false); //local component
        props.onCloseConfirmation(); //parent component
    });

    useEffect(() => {
        setModalInfoVisible(modalInfo);
        setModalInfoVisible2(modalInfo2);
        if (confirmation && globalCount == evaluation.nbTruies) {
            setModalConfirmation(confirmation);
            return;
        }
        if (confirmation) {
            modalConfirmationCloser();
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
        }
    }, [modalInfo, modalInfo2, confirmation, globalCount]);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', height: '7%' }}>
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
            <View style={{ height: '80%' }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Pas de lésions sur les épaules observées {" "}
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Counter onChange={changeHandler2} max={evaluation.nbTruies} />
                        </View>
                    </View>

                    <View>
                        <View >
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Lésions modérées
                                <TouchableWithoutFeedback onPress={() => {
                                    setModalInput2Visible(true);
                                }}>
                                    <EvilIcons name="question" size={30} color="black" />
                                </TouchableWithoutFeedback>
                            </Text>
                        </View>
                        <View style={styles.content} >
                            <Image style={styles.photo} source={{ uri: evaluation.photo1 }} />
                            <Counter onChange={changeHandler3} max={evaluation.nbTruies} />
                        </View>
                    </View>

                    <View>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Une lésion/blessure ouverte {" "}
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Image style={styles.photo} source={{ uri: evaluation.photo1 }} />
                            <Counter onChange={changeHandler} max={evaluation.nbTruies} />
                        </View>
                    </View>

                    <View >
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Une ou plusieurs petites bursites sur le même membre ou une grosse bursite {" "}
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Counter onChange={changeHandler4} max={evaluation.nbTruies} />
                        </View>
                    </View>
                    <View >
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Plusieurs grosses bursites sur le même membre ou une très grosse bursite, ou toutes bursite erodée {" "}
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Counter onChange={changeHandler5} max={evaluation.nbTruies} />
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
            <ModalPopupInfo
                visible={modalInfoVisible2}
                onClose={modalInfoCloser2}
                text={evaluation2.description}
                buttonText='Fermer'
            />
            {/*Modal d'explication des champs*/}
            <ModalPopupInfo
                visible={modalInput2Visible}
                onClose={modalInput2Closer}
                text={"Mise en évidence d'une vieille lésion (cicatrice formée) ou d'une récente blessure qui est en voie de guérisson ou rougissante sans pénétration du tissu."}
                buttonText='Fermer'
            />
            {/*Modal infos sur la composition de l'échantillon*/}
            <ModalPopupInfo
                visible={modalEchantillonVisible}
                onClose={modalEchantillonCloser}
                text='10 truies (dont 5 truies autour du sevrage et 5 truies deux jours à une semaine après mise-bas).'
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
    content: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 15
    },
    counterText: {
        fontFamily: 'open-sans-bold',
        fontSize: 15
    },
    photo: {
        height: Dimensions.get('window').height / 5,
        width: Dimensions.get('window').width / 2
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17,
        marginLeft: 20
    }
});


export default PlaieEpauleEtBursite;