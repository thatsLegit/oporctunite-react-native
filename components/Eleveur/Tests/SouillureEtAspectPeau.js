import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableWithoutFeedback, Dimensions, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Counter from '../../UI/Counter';
import ProgressBar from 'react-native-progress/Bar';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import { EvilIcons } from '@expo/vector-icons';
import * as testActions from '../../../store/actions/test';


const SouillureEtAspectPeau = props => {

    const { modalInfo, evaluation, confirmation, navigation, Vtype } = props;
    const [modalEchantillonVisible, setModalEchantillonVisible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);
    const [count5, setCount5] = useState(0);
    const [globalCount, setGlobalCount] = useState(0);

    const dispatch = useDispatch();

    const note = Math.round(((count2 / evaluation.nbTruies) * 10 + (count3 / evaluation.nbTruies) * 5 + Number.EPSILON) * 10) / 10;
    const noteAspectPeau = Math.round(((count2 / evaluation.nbTruies) * 10 + (count4 / evaluation.nbTruies) * 5 + Number.EPSILON) * 10) / 10;

    const validationHandler = async () => {
        await dispatch(testActions.ajouterTest(note, evaluation.nomEvaluation));
        //await dispatch(testActions.ajouterTest(noteAspectPeau, evaluation.nomEvaluation));

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
    const changeHandler4 = (count4, sign, value) => {
        if (globalCount + value > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount4(count4);
        if (sign == 'plus') {
            setGlobalCount(globalCount + value);
        } else {
            setGlobalCount(globalCount - value);
        }
    };
    const changeHandler5 = (count5, sign, value) => {
        if (globalCount + value > evaluation.nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${evaluation.nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount5(count5);
        if (sign == 'plus') {
            setGlobalCount(globalCount + value);
        } else {
            setGlobalCount(globalCount - value);
        }
    };

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
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', height: '10%', paddingTop: 5 }}>
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
                        <View style={styles.intro}>
                            <Image style={styles.photo} source={{ uri: evaluation.photo1 }} />
                            <Text style={{ fontStyle: 'italic', fontSize: 15 }}>
                                10 % correspond à un quart d'une des trois zones {"\n"}
                                un tiers correspond à une des trois zones
                            </Text>
                        </View>

                        <View>
                            <View>
                                <Text style={styles.text}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                    La truie est propre, sans mise en évidence d'inflammation ou décoloration de la peau {" "}
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Counter onChange={changeHandler2} max={evaluation.nbTruies} />
                            </View>
                        </View>

                        <View>
                            <View>
                                <Text style={styles.text}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                    La truie présente des souillures sur moins d'un tiers de sa surface corporelle{" "}
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Counter onChange={changeHandler3} max={evaluation.nbTruies} />
                            </View>
                        </View>

                        <View >
                            <View>
                                <Text style={styles.text}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                    La truie présente des souillures sur plus d'un tiers de sa surface corporelle {" "}
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Counter onChange={changeHandler} max={evaluation.nbTruies} />
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text style={styles.text}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                    Moins de 10% de la peau est inflammée, décolorée ou tachetée{" "}
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Counter onChange={changeHandler4} max={evaluation.nbTruies} />
                            </View>
                        </View>

                        <View>
                            <View>
                                <Text style={styles.text}>
                                    <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                    Plus de 10% de la peau est inflammée, décolorée ou tachetée {" "}
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Counter onChange={changeHandler5} max={evaluation.nbTruies} />
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
            {/*Modal infos sur la composition de l'échantillon*/}
            <ModalPopupInfo
                visible={modalEchantillonVisible}
                onClose={modalEchantillonCloser}
                text='30 truies (dont 10 en début de gestation, 10 en milieu de gestation et 10 en fin de gestation) + 10 truies en lactation.'
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
        width: Dimensions.get('window').width / 1.5
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17,
        marginLeft: 20
    },
    intro: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25
    },
});


export default SouillureEtAspectPeau;