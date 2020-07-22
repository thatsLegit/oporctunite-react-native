import React, { useState, useEffect } from 'react';
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
import EspaceAlloue from '../../../../components/Eleveur/Tests/EspaceAlloue';
import Haletement from '../../../../components/Eleveur/Tests/Haletement';
import BlessuresCorps from '../../../../components/Eleveur/Tests/BlessuresCorps';
import DimensionsCases from '../../../../components/Eleveur/Tests/DimensionsCases';
import Entassement from '../../../../components/Eleveur/Tests/Entassement';
import ExplorationIndividuelle from '../../../../components/Eleveur/Tests/ExplorationIndividuelle';
import Hernies from '../../../../components/Eleveur/Tests/Hernies';
import InfectionsLocales from '../../../../components/Eleveur/Tests/InfectionsLocales';
import Mammite from '../../../../components/Eleveur/Tests/Mammite';
import PeurHommes from '../../../../components/Eleveur/Tests/PeurHommes';
import PropreteCases from '../../../../components/Eleveur/Tests/PropreteCases';
import ProlapsusRectal from '../../../../components/Eleveur/Tests/ProlapsusRectal';
import ProlapsusUterin from '../../../../components/Eleveur/Tests/ProlapsusUterin';
import Constipation from '../../../../components/Eleveur/Tests/Constipation';
import Colors from '../../../../constants/Colors';
import * as testActions from '../../../../store/actions/test';
import * as evalActions from '../../../../store/actions/evaluation';
import * as sousCategActions from '../../../../store/actions/sousCateg';


const TestScreen = props => {

    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(false);
    const [annulationModal, setAnnulationModal] = useState(false);
    const [indexEvaluation, setIndexEvaluation] = useState(0);
    const [needInfo, setNeedInfo] = useState(true);

    const selectedEvaluations = useSelector(state => Object.values(state.eval.evalSelection));
    const selectedEvaluation = selectedEvaluations[indexEvaluation];

    useEffect(() => {
        if (selectedEvaluation && selectedEvaluation.nomEvaluation == 'Dimensions des cases de mise-bas'
            || selectedEvaluation && selectedEvaluation.nomEvaluation == 'Prolapsus rectal'
            || selectedEvaluation && selectedEvaluation.nomEvaluation == 'Prolapsus utérin') {
            setNeedInfo(false);
        }
    }, [selectedEvaluation]);

    let selectedCategorie = useSelector(state => state.categ.categories);

    const dispatch = useDispatch();

    const nextValidationHandler = () => {
        setModalConfirmation(false);
        setIndexEvaluation(indexEvaluation + 1);
    };

    const modalAnnulationTrigger = () => setAnnulationModal(true);
    const modalAnnulationCloser = () => setAnnulationModal(false);
    const modalInfoCloser = () => setInfoModalVisible(false);
    const modalConfirmationCloser = () => setModalConfirmation(false);

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

    if (selectedEvaluations.length == 0) {
        return (
            <View>
                <Text>Aucune évaluation séléctionnée</Text>
            </View>
        );
    }

    loop1:
    for (const key in selectedCategorie) {
        loop2:
        for (const key2 in selectedCategorie[key]) {
            if (key2 == selectedEvaluation.nomCategorieP) {
                selectedCategorie = key;
                break loop1;
            }
        }
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
                            {selectedEvaluation.nomCategorieP}
                        </Text>

                        <Text style={styles.titre2}>
                            {selectedEvaluation.nomEvaluation} ({indexEvaluation + 1} / {selectedEvaluations.length})
                            {needInfo && <TouchableWithoutFeedback onPress={() => setInfoModalVisible(true)}>
                                <EvilIcons name="question" size={30} color="black" />
                            </TouchableWithoutFeedback>}
                        </Text>
                    </View>

                    {selectedEvaluation.nomEvaluation == 'Etat corporel' && <EtatCorporel
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == 'Apport en eau' && <ApportEnEau
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == 'Boiterie' && <Boiterie
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == 'Bursite' && <Bursite
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == 'Mortalité' && <Mortalite
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == 'Stéréotypies' && <Stereotypies
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == "Pose d'anneaux nasaux et coupe de queue" && <PoseAnneau
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == 'Comportement social (positif ou négatif)' && <ComportementSocial
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == 'Surface par truie en m2' && <EspaceAlloue
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == 'Halètement' && <Haletement
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == 'Blessures sur le corps' && <BlessuresCorps
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == 'Dimensions des cases de mise-bas' && <DimensionsCases
                        evaluation={selectedEvaluation}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == 'Entassement' && <Entassement
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == "Exploration individuelle" && <ExplorationIndividuelle
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == 'Hernies' && <Hernies
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == "Infections locales" && <InfectionsLocales
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == "Mammite" && <Mammite
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == "La peur des hommes" && <PeurHommes
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == "Propreté des cases" && <PropreteCases
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == "Prolapsus rectal" && <ProlapsusRectal
                        evaluation={selectedEvaluation}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == "Prolapsus utérin" && <ProlapsusUterin
                        evaluation={selectedEvaluation}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
                        confirmation={modalConfirmation}
                        navigation={props.navigation}
                        onNextValidation={nextValidationHandler}
                        Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                    />}
                    {selectedEvaluation.nomEvaluation == "Constipation" && <Constipation
                        evaluation={selectedEvaluation}
                        modalInfo={infoModalVisible}
                        onCloseInfo={modalInfoCloser}
                        onCloseConfirmation={modalConfirmationCloser}
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