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
import LesionVulve from '../../../../components/Eleveur/Tests/LesionVulve';
import Toux from '../../../../components/Eleveur/Tests/Toux';
import Eternuement from '../../../../components/Eleveur/Tests/Eternuement';
import Dyspnee from '../../../../components/Eleveur/Tests/Dyspnee';
import Metrite from '../../../../components/Eleveur/Tests/Metrite';
import Souillure from '../../../../components/Eleveur/Tests/Souillure';
import AspectPeau from '../../../../components/Eleveur/Tests/AspectPeau';
import PlaieEpaule from '../../../../components/Eleveur/Tests/PlaieEpaule';
import InfectionsLocales from '../../../../components/Eleveur/Tests/InfectionsLocales';
import Mammite from '../../../../components/Eleveur/Tests/Mammite';
import PeurHommes from '../../../../components/Eleveur/Tests/PeurHommes';
import PropreteCases from '../../../../components/Eleveur/Tests/PropreteCases';
import ProlapsusRectal from '../../../../components/Eleveur/Tests/ProlapsusRectal';
import ProlapsusUterin from '../../../../components/Eleveur/Tests/ProlapsusUterin';
import Constipation from '../../../../components/Eleveur/Tests/Constipation';
import Diarrhee from '../../../../components/Eleveur/Tests/Diarrhee';

import DyspneeEtHaletement from '../../../../components/Eleveur/Tests/DyspneeEtHaletement';
import SouillureEtAspectPeau from '../../../../components/Eleveur/Tests/SouillureEtAspectPeau';
import TouxEtEternuement from '../../../../components/Eleveur/Tests/TouxEtEternuement';
import ProlapsusUterinEtRectal from '../../../../components/Eleveur/Tests/ProlapsusUterinEtRectal';
import DiarrheeEtConstipation from '../../../../components/Eleveur/Tests/DiarrheeEtConstipation';
import LesionVulveEtMetrite from '../../../../components/Eleveur/Tests/LesionVulveEtMetrite';
import EspaceAlloueEtDimensionsCases from '../../../../components/Eleveur/Tests/EspaceAlloueEtDimensionsCases';
import PlaieEpauleEtBursite from '../../../../components/Eleveur/Tests/PlaieEpauleEtBursite';

import Colors from '../../../../constants/Colors';
import * as testActions from '../../../../store/actions/test';
import * as evalActions from '../../../../store/actions/evaluation';
import * as sousCategActions from '../../../../store/actions/sousCateg';


const TestScreen = props => {

    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [infoModalVisible2, setInfoModalVisible2] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(false);
    const [annulationModal, setAnnulationModal] = useState(false);
    const [indexEvaluation, setIndexEvaluation] = useState(0);
    const [needInfo, setNeedInfo] = useState(true);
    const [needInfo2, setNeedInfo2] = useState(true);

    const selectedEvaluations = useSelector(state => Object.values(state.eval.evalSelection).sort((a, b) => a.priorite - b.priorite));
    const selectedEvaluation = selectedEvaluations[indexEvaluation];

    //Rajouté pour les évals doubles
    const liaisons = useSelector(state => state.eval.liaisons);
    let nextSelectedEvaluation;
    let nomEvalDouble;

    if (selectedEvaluations.length != 0 &&
        selectedEvaluation.idLiaison != "0" &&
        selectedEvaluations[indexEvaluation + 1] &&
        selectedEvaluations[indexEvaluation + 1].idLiaison == selectedEvaluation.idLiaison) {
        for (const key in liaisons) {
            if (key == selectedEvaluation.idLiaison) {
                nomEvalDouble = liaisons[key.toString()].NomEvalDouble;
                nextSelectedEvaluation = selectedEvaluations[indexEvaluation + 1];
            }
        }
    }

    useEffect(() => {
        if (selectedEvaluation && selectedEvaluation.nomEvaluation == 'Dimensions des cases de mise-bas'
            || selectedEvaluation && selectedEvaluation.nomEvaluation == 'Prolapsus rectal'
            || selectedEvaluation && selectedEvaluation.nomEvaluation == 'Prolapsus utérin') {
            setNeedInfo(false);
        }
        //Rajouté pour les évals doubles
        if (nextSelectedEvaluation && nextSelectedEvaluation.nomEvaluation == 'Dimensions des cases de mise-bas'
            || nextSelectedEvaluation && nextSelectedEvaluation.nomEvaluation == 'Prolapsus rectal'
            || nextSelectedEvaluation && nextSelectedEvaluation.nomEvaluation == 'Prolapsus utérin') {
            setNeedInfo2(false);
        }
    }, [selectedEvaluation]);

    let selectedCategorie = useSelector(state => state.categ.categories);
    let selectedCategorie2 = selectedCategorie; //Rajouté pour les évals doubles

    const dispatch = useDispatch();

    const nextValidationHandler = () => {
        setModalConfirmation(false);
        setIndexEvaluation(indexEvaluation + (nomEvalDouble ? 2 : 1));
    };

    const modalAnnulationTrigger = () => setAnnulationModal(true);
    const modalAnnulationCloser = () => setAnnulationModal(false);
    const modalInfoCloser = () => setInfoModalVisible(false);
    const modalInfoCloser2 = () => setInfoModalVisible2(false); //Rajouté pour les évals doubles
    const modalConfirmationCloser = () => setModalConfirmation(false);

    const annulationHandler = async () => {
        await dispatch(testActions.annulerTests());
        await dispatch(evalActions.supprimerEvalSelection());
        await dispatch(sousCategActions.supprimerSousCategSelection());
        props.navigation.navigate('CategSelection');
        setAnnulationModal(false);
    };

    const btnNext = text => {
        return (
            <TouchableOpacity
                style={styles.footerBtn}
                onPress={() => { setModalConfirmation(true) }}
            >
                <Text style={styles.footerText}>{text} </Text>
            </TouchableOpacity>
        );
    };

    //Pour éviter bug undefined is not an object
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
    //Rajouté pour les évals doubles
    if (nomEvalDouble) {
        loop1:
        for (const key in selectedCategorie2) {
            loop2:
            for (const key2 in selectedCategorie2[key]) {
                if (key2 == nextSelectedEvaluation.nomCategorieP) {
                    selectedCategorie2 = key;
                    break loop1;
                }
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1, height: '92%' }} keyboardVerticalOffset={10} behavior={"position"}>
                <View>
                    {!nomEvalDouble ? (<View style={{ alignItems: "center", height: '15%', paddingVertical: 5 }}>
                        <Text style={styles.titre}>
                            {selectedCategorie}
                        </Text>
                        <Text style={styles.titre1}>
                            {selectedEvaluation.nomCategorieP}
                        </Text>
                        <Text style={styles.titre2}>
                            {selectedEvaluation.nomEvaluation}
                            {needInfo && <TouchableWithoutFeedback onPress={() => setInfoModalVisible(true)}>
                                <EvilIcons name="question" size={30} color="black" />
                            </TouchableWithoutFeedback>}{" "}
                            ({indexEvaluation + 1} / {selectedEvaluations.length})
                        </Text>
                    </View>) :
                        (<View style={{ alignItems: "center", height: '15%', paddingVertical: 5 }}>
                            <Text style={styles.titre}>
                                {selectedCategorie != selectedCategorie2 ?
                                    selectedCategorie + " et " + selectedCategorie2 :
                                    selectedCategorie}
                            </Text>
                            <Text style={styles.titre1}>
                                {selectedEvaluation.nomCategorieP != nextSelectedEvaluation.nomCategorieP ?
                                    selectedEvaluation.nomCategorieP + " et " + nextSelectedEvaluation.nomCategorieP :
                                    selectedEvaluation.nomCategorieP}
                            </Text>
                            <Text style={styles.titre2}>
                                {selectedEvaluation.nomEvaluation}
                                {needInfo ? <TouchableWithoutFeedback onPress={() => setInfoModalVisible(true)}>
                                    <EvilIcons name="question" size={30} color="black" />
                                </TouchableWithoutFeedback> : " "}
                                et{" "}
                                {nextSelectedEvaluation.nomEvaluation}
                                {needInfo2 && <TouchableWithoutFeedback onPress={() => setInfoModalVisible2(true)}>
                                    <EvilIcons name="question" size={30} color="black" />
                                </TouchableWithoutFeedback>}{" "}
                                ({indexEvaluation + 2} / {selectedEvaluations.length})
                            </Text>
                        </View>)
                    }

                    {!nomEvalDouble ? (
                        <View style={{ height: '85%' }}>
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
                            {selectedEvaluation.nomEvaluation == 'Lésions de la vulve' && <LesionVulve
                                evaluation={selectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {selectedEvaluation.nomEvaluation == 'Toux' && <Toux
                                evaluation={selectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {selectedEvaluation.nomEvaluation == 'Eternuement' && <Eternuement
                                evaluation={selectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {selectedEvaluation.nomEvaluation == 'Dyspnée' && <Dyspnee
                                evaluation={selectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {selectedEvaluation.nomEvaluation == 'Métrite' && <Metrite
                                evaluation={selectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {selectedEvaluation.nomEvaluation == 'Souillure' && <Souillure
                                evaluation={selectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {selectedEvaluation.nomEvaluation == 'Aspect de la peau' && <AspectPeau
                                evaluation={selectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {selectedEvaluation.nomEvaluation == 'Plaie à l’épaule' && <PlaieEpaule
                                evaluation={selectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {selectedEvaluation.nomEvaluation == 'Infections locales' && <InfectionsLocales
                                evaluation={selectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {selectedEvaluation.nomEvaluation == 'Mammite' && <Mammite
                                evaluation={selectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {selectedEvaluation.nomEvaluation == 'La peur des hommes' && <PeurHommes
                                evaluation={selectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {selectedEvaluation.nomEvaluation == 'Propreté des cases' && <PropreteCases
                                evaluation={selectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {selectedEvaluation.nomEvaluation == 'Prolapsus rectal' && <ProlapsusRectal
                                evaluation={selectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {selectedEvaluation.nomEvaluation == 'Prolapsus utérin' && <ProlapsusUterin
                                evaluation={selectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {selectedEvaluation.nomEvaluation == 'Constipation' && <Constipation
                                evaluation={selectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {selectedEvaluation.nomEvaluation == 'Diarrhée' && <Diarrhee
                                evaluation={selectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 1) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                        </View>) :
                        (<View style={{ height: '85%' }}>
                            {nomEvalDouble == 'Dyspnée et halètement' && <DyspneeEtHaletement
                                evaluation={selectedEvaluation}
                                evaluation2={nextSelectedEvaluation}
                                modalInfo={infoModalVisible}
                                modalInfo2={infoModalVisible2}
                                onCloseInfo={modalInfoCloser}
                                onCloseInfo2={modalInfoCloser2}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 2) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {nomEvalDouble == 'Diarrhée et constipation' && <DiarrheeEtConstipation
                                evaluation={selectedEvaluation}
                                evaluation2={nextSelectedEvaluation}
                                modalInfo={infoModalVisible}
                                modalInfo2={infoModalVisible2}
                                onCloseInfo={modalInfoCloser}
                                onCloseInfo2={modalInfoCloser2}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 2) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {nomEvalDouble == "Plaie à l'épaule et bursite" && <PlaieEpauleEtBursite
                                evaluation={selectedEvaluation}
                                evaluation2={nextSelectedEvaluation}
                                modalInfo={infoModalVisible}
                                modalInfo2={infoModalVisible2}
                                onCloseInfo={modalInfoCloser}
                                onCloseInfo2={modalInfoCloser2}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 2) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {nomEvalDouble == "Prolapsus utérin et rectal" && <ProlapsusUterinEtRectal
                                evaluation={selectedEvaluation}
                                evaluation2={nextSelectedEvaluation}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 2) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {nomEvalDouble == "Toux et éternuement" && <TouxEtEternuement
                                evaluation={selectedEvaluation}
                                evaluation2={nextSelectedEvaluation}
                                modalInfo={infoModalVisible}
                                modalInfo2={infoModalVisible2}
                                onCloseInfo={modalInfoCloser}
                                onCloseInfo2={modalInfoCloser2}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 2) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {nomEvalDouble == "Souillures et aspect de la peau" && <SouillureEtAspectPeau
                                evaluation={selectedEvaluation}
                                evaluation2={nextSelectedEvaluation}
                                modalInfo={infoModalVisible}
                                modalInfo2={infoModalVisible2}
                                onCloseInfo={modalInfoCloser}
                                onCloseInfo2={modalInfoCloser2}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 2) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {nomEvalDouble == "Lésions de la vulve et métrite" && <LesionVulveEtMetrite
                                evaluation={selectedEvaluation}
                                evaluation2={nextSelectedEvaluation}
                                modalInfo={infoModalVisible}
                                modalInfo2={infoModalVisible2}
                                onCloseInfo={modalInfoCloser}
                                onCloseInfo2={modalInfoCloser2}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 2) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                            {nomEvalDouble == "Surface par truie en m2 et dimensions de la case de mise-bas" && <EspaceAlloueEtDimensionsCases
                                evaluation={selectedEvaluation}
                                evaluation2={nextSelectedEvaluation}
                                modalInfo={infoModalVisible}
                                onCloseInfo={modalInfoCloser}
                                onCloseConfirmation={modalConfirmationCloser}
                                confirmation={modalConfirmation}
                                navigation={props.navigation}
                                onNextValidation={nextValidationHandler}
                                Vtype={(indexEvaluation + 2) == (selectedEvaluations.length) ? 'valider' : 'suivant'}
                            />}
                        </View>)
                    }
                </View>
            </KeyboardAvoidingView>

            <View style={{ ...styles.footer, height: '8%' }}>
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
                {(indexEvaluation + (nomEvalDouble ? 2 : 1) == selectedEvaluations.length) ? btnNext('Valider') : btnNext('Suivant')}
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
    titre: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: 'red'
    },
    titre1: {
        fontSize: 14,
        fontFamily: 'open-sans',
        color: 'blue',
        textAlign: 'center'
    },
    titre2: {
        textAlign: 'center',
        fontSize: 18.5,
        fontFamily: 'open-sans-bold',
        color: 'green'
    },
    footer: {
        flexDirection: "row",
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