import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { EvilIcons } from '@expo/vector-icons';
import ModalPopupInfo from '../../../../components/Eleveur/Evaluations/ModalPopupInfo';
import EtatCorporel from '../../../../components/Eleveur/Tests/EtatCorporel';
import ApportEnEau from '../../../../components/Eleveur/Tests/ApportEnEau';
import Boiterie from '../../../../components/Eleveur/Tests/Boitierie';
import Bursite from '../../../../components/Eleveur/Tests/Bursite';
import Mortalite from '../../../../components/Eleveur/Tests/Mortalite';
import Stereotypies from '../../../../components/Eleveur/Tests/Stereotypies';
import PoseAnneau from '../../../../components/Eleveur/Tests/PoseAnneau';
import ComportementSocial from '../../../../components/Eleveur/Tests/ComportementSocial';
import Colors from '../../../../constants/Colors';
import * as testActions from '../../../../store/actions/test';
import * as evalActions from '../../../../store/actions/evaluation';
import * as sousCategActions from '../../../../store/actions/sousCateg';


const TestScreen = props => {

    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(false);
    const [annulationModal, setAnnulationModal] = useState(false);
    const [indexEvaluation, setIndexEvaluation] = useState(0);
    const selectedEvaluations = useSelector(state => Object.values(state.eval.evalSelection));
    const selectedEvaluation = selectedEvaluations.map(eva => eva.nomEvaluation)[indexEvaluation];
    const selectedEvaluationSC = selectedEvaluations.map(eva => eva.nomCategorieP)[indexEvaluation];
    let selectedCategorie = useSelector(state => state.categ.categories);
    for (const key in selectedCategorie) {
        for (const key2 in selectedCategorie[key]) {
            if (key2 == selectedEvaluationSC) { selectedCategorie = key }
        }
    }
    const currentNbTruies = selectedEvaluations.map(eva => eva.nbTruies)[indexEvaluation];
    const currentPhoto1 = selectedEvaluations.map(eva => eva.photo1)[indexEvaluation];
    const currentPhoto2 = selectedEvaluations.map(eva => eva.photo2)[indexEvaluation];
    const dispatch = useDispatch();


    const nextValidationHandler = () => {
        setModalConfirmation(false);
        setIndexEvaluation(indexEvaluation + 1);
    };
    const modalAnnulationTrigger = () => {
        setAnnulationModal(true);
    };
    const modalAnnulationCloser = () => {
        setAnnulationModal(false);
    };
    const annulationHandler = async () => {
        await dispatch(testActions.annulerTests());
        await dispatch(evalActions.supprimerEvalSelection());
        await dispatch(sousCategActions.supprimerSousCategSelection());
        props.navigation.navigate('CategSelection');
        setAnnulationModal(false);
    };

    const btnSuivant = () => {
        return (
            <TouchableOpacity
                style={styles.footerBtn}
                onPress={() => { setModalConfirmation(true) }}
            >
                <Text style={styles.footerText}>Suivant </Text>
            </TouchableOpacity>
        )
    }
    const btnValider = () => {
        return (
            <TouchableOpacity
                style={styles.footerBtn}
                onPress={() => setModalConfirmation(true)}
            >
                <Text style={styles.footerText}>Valider </Text>
            </TouchableOpacity>
        );
    };

    const modalInfoCloser = () => {
        setInfoModalVisible(false);
    };
    const modalConfirmationCloser = () => {
        setModalConfirmation(false);
    };

    if (selectedEvaluations.length == 0) {
        return (
            <View>
                <Text>Aucune évaluation séléctionnée</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={10} behavior={"position"}>
                <View>
                    <View style={styles.header}>
                        <Text style={styles.titre}>
                            {selectedCategorie}
                        </Text>

                        <Text style={styles.titre1}>
                            {selectedEvaluationSC}
                        </Text>

                        <Text style={styles.titre2}>
                            {selectedEvaluation} ({indexEvaluation + 1} / {selectedEvaluations.length})
                    <TouchableWithoutFeedback onPress={() => {
                                setInfoModalVisible(true);
                            }}>
                                <EvilIcons name="question" size={30} color="black" />
                            </TouchableWithoutFeedback>
                        </Text>
                    </View>

                    {selectedEvaluation == 'Etat corporel' && <EtatCorporel
                        nbTruies={currentNbTruies}
                        photo1={currentPhoto1}
                        photo2={currentPhoto2}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        nomEvaluation={selectedEvaluation}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation == 'Apport en eau' && <ApportEnEau
                        photo1={currentPhoto1}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        nomEvaluation={selectedEvaluation}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation == 'Boiterie' && <Boiterie
                        nbTruies={currentNbTruies}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        nomEvaluation={selectedEvaluation}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation == 'Bursite' && <Bursite
                        nbTruies={currentNbTruies}
                        photo1={currentPhoto1}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        nomEvaluation={selectedEvaluation}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation == 'Mortalité' && <Mortalite
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        nomEvaluation={selectedEvaluation}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation == 'Stéréotypies' && <Stereotypies
                        nbTruies={currentNbTruies}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        nomEvaluation={selectedEvaluation}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation == "Pose d'anneaux nasaux et coupe de queue" && <PoseAnneau
                        nbTruies={currentNbTruies}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        nomEvaluation={selectedEvaluation}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation == 'Comportement social (positif ou négatif)' && <ComportementSocial
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        nomEvaluation={selectedEvaluation}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                </View>
            </KeyboardAvoidingView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={() => modalAnnulationTrigger()}
                >
                    <Text style={styles.footerText}>Annuler </Text>
                </TouchableOpacity>
                <ModalPopupInfo
                    visible={annulationModal}
                    onClose={modalAnnulationCloser}
                    text="Êtes-vous sûrs de vouloir annuler la série d'évaluations en cours ?"
                    buttonText='Annuler'
                    confirmation
                    onValidation={annulationHandler}
                />
                {((indexEvaluation + 1) == (selectedEvaluations.length)) ? btnValider() : btnSuivant()}
            </View>
        </View>
    );
};

export const screenOptions = {
    headerLeft: null,
    headerTitleStyle: { alignSelf: 'center' },
    headerTitle: 'Evaluation'
};

const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center",
    },
    titre: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: 'red'
    },
    titre1: {
        fontSize: 14,
        fontFamily: 'open-sans',
        color: 'blue'
    },
    titre2: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        color: 'green'
    },
    footer: {
        flexDirection: "row",
        height: '8%',
        position: 'absolute',
        bottom: 0
    },
    footerBtn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.accent,
        color: "#FFF",
        height: "100%",
        width: "50%",
        borderColor: 'white',
        borderWidth: 1
    },
    footerText: {
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        color: "#FFF"
    }
});


export default TestScreen;