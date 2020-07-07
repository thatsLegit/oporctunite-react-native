import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, Dimensions, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Counter from '../../UI/Counter';
import ProgressBar from 'react-native-progress/Bar';
import { FontAwesome } from '@expo/vector-icons';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import { EvilIcons } from '@expo/vector-icons';
import * as testActions from '../../../store/actions/test';


const Bursite = props => {

    const { modalInfo, nbTruies, confirmation, navigation, nomEvaluation, Vtype } = props;
    const [modalEchantillonVisible, setModalEchantillonVisible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    const [globalCount, setGlobalCount] = useState(0);

    const dispatch = useDispatch();

    const note = Math.round((((count / nbTruies) * 10 + (count2 / nbTruies) * 5 + Number.EPSILON) * 10)) / 10;

    const validationHandler = async () => {
        await dispatch(testActions.ajouterTest(note, nomEvaluation));

        if (Vtype == 'valider') {
            modalConfirmationCloser();
            navigation.navigate('TestRecap');
        } else { //Suivant case
            props.onNextValidation();
        }
    };

    const changeHandler = (count, sign, value) => {
        if (globalCount + value > nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
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
        if (globalCount + value > nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
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
        if (globalCount + value > nbTruies && sign == 'plus') {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
            return 'error';
        }
        setCount3(count3);
        if (sign == 'plus') {
            setGlobalCount(globalCount + value);
        } else {
            setGlobalCount(globalCount - value);
        }
    };

    const modalInfoCloser = () => {
        setModalInfoVisible(false);
        props.onCloseInfo();
    };
    const modalEchantillonCloser = () => {
        setModalEchantillonVisible(false);
    };
    const modalConfirmationCloser = useCallback(() => {
        setModalConfirmation(false); //local component
        props.onCloseConfirmation(); //parent component
    });

    useEffect(() => {
        setModalInfoVisible(modalInfo);
        if (confirmation && globalCount == nbTruies) {
            setModalConfirmation(confirmation);
        }
        if (confirmation && globalCount != nbTruies) {
            modalConfirmationCloser();
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${nbTruies}.`, [{ text: 'Compris', style: 'destructive' }]);
        }
    }, [modalInfo, confirmation, globalCount]);

    return (
        <View>
            <View style={styles.counterContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.counterText}>   {globalCount} / {nbTruies} </Text>
                    <TouchableWithoutFeedback onPress={() => {
                        setModalEchantillonVisible(true);
                    }}>
                        <EvilIcons name="question" size={30} color="black" />
                    </TouchableWithoutFeedback>
                </View>
                <ProgressBar progress={globalCount / nbTruies} width={200} />
            </View>
            <View style={{ height: Dimensions.get('window').height / 1.60 }}>
                <ScrollView>
                    <View>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Pas de bursite évidente {" "}
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Image style={styles.photo1} source={{ uri: props.photo1 }} />
                            <Counter onChange={changeHandler} max={nbTruies} />
                        </View>
                    </View>

                    <View style={{ marginVertical: 25 }}>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Une ou plusieurs petites bursites sur le même membre ou une grosse bursite {" "}
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Image style={styles.photo1} source={{ uri: props.photo1 }} />
                            <Counter onChange={changeHandler2} max={nbTruies} />
                        </View>
                    </View>

                    <View style={{ marginVertical: 25 }}>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                                Plusieurs grosses bursites sur le même membre ou une très grosse bursite, ou toutes bursite exodée {" "}
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Image style={styles.photo1} source={{ uri: props.photo1 }} />
                            <Counter onChange={changeHandler3} max={nbTruies} />
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/*Modal infos sur l'évaluation*/}
            <ModalPopupInfo
                visible={modalInfoVisible}
                onClose={modalInfoCloser}
                text="La bursite est un sac rempli de liquide résultant d'une blessure d'appui au niveau des points d'appui sur la jambe suite au poids du corps. Elle est prévalente au niveau des jarrets mais elle peut intervenir à d'autres endroits.
                L'évaluation doit se faire sur les membres antérieurs et postérieurs de l'animal sur un profil et chaque bursite doit être évaluée selon les catégories suivantes:
                Petite bursite de la taille d'un raisin ( 1,5-2,0 cm de diamètre)."
                buttonText='Fermer'
            />
            {/*Modal infos sur la composition de l'échantillon*/}
            <ModalPopupInfo
                visible={modalEchantillonVisible}
                onClose={modalEchantillonCloser}
                text='30 truies en gestation + 10 truies en lactation.'
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
        marginBottom: 35,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    counterText: {
        fontFamily: 'open-sans-bold',
        fontSize: 20
    },
    photo1: {
        minWidth: 125,
        maxWidth: 200,
        maxHeight: 250,
        minHeight: 150
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17,
        marginLeft: 20
    }
});


export default Bursite;