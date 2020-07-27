import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TouchableWithoutFeedback, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { CheckBox } from "native-base";
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import * as testActions from '../../../store/actions/test';
import Colors from '../../../constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';


const DimensionsCases = props => {

    const { confirmation, navigation, evaluation, Vtype } = props;
    const [modalInputVisible, setModalInputVisible] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(confirmation);
    const [adequat, setAdequat] = useState();

    const dispatch = useDispatch();

    const validationHandler = async () => {
        const note = adequat ? 10 : 0;
        console.log(note);
        await dispatch(testActions.ajouterTest(note, evaluation.nomEvaluation));

        if (Vtype == 'valider') {
            modalConfirmationCloser();
            navigation.navigate('TestRecap');
        } else { //Suivant case
            props.onNextValidation();
        }
    };

    const modalInputCloser = () => setModalInputVisible(false);

    const modalConfirmationCloser = useCallback(() => {
        setModalConfirmation(false); //local component
        props.onCloseConfirmation(); //parent component
    });

    useEffect(() => {
        if (confirmation) {
            setModalConfirmation(confirmation);
            return;
        }
        if (confirmation) {
            modalConfirmationCloser();
            Alert.alert('Erreur', `Le nombre total d'animaux doit être positif et supérieur au nombre d'animaux morts ou retrouvés morts (A > M).`, [{ text: 'Compris', style: 'destructive' }]);
        }
    }, [confirmation]);


    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: '90%' }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={styles.innerContainer}>
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
                        <Image style={styles.photo} source={{ uri: evaluation.photo1 }} />

                        <View style={styles.innerContainer}>
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
                        <Image style={styles.photo} source={{ uri: evaluation.photo1 }} />
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
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 15
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
        width: 300,
        height: 200
    }
});


export default DimensionsCases;