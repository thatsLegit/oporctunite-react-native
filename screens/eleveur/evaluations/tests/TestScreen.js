import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import { EvilIcons } from '@expo/vector-icons';
import EtatCorporel from '../../../../components/Eleveur/Tests/EtatCorporel'
import ApportEnEau from '../../../../components/Eleveur/Tests/ApportEnEau'
import Colors from '../../../../constants/Colors';


const TestScreen = props => {

    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [indexEvaluation, setIndexEvaluation] = useState(0);
    const selectedEvaluations = useSelector(state => Object.values(state.eval.evalSelection));

    const selectedEvaluation = selectedEvaluations.map(eva => eva.nomEvaluation)[indexEvaluation];
    const selectedEvaluationSC = selectedEvaluations.map(eva => eva.nomCategorieP)[indexEvaluation];
    let selectedcategorie = useSelector(state => state.categ.categories);
    for (const key in selectedcategorie) {
        for (const key2 in selectedcategorie[key]) {
            if (key2 == selectedEvaluationSC) { selectedcategorie = key }
        }
    }
    const currentNbTruies = selectedEvaluations.map(eva => eva.nbTruies)[indexEvaluation];
    const currentPhoto1 = selectedEvaluations.map(eva => eva.photo1)[indexEvaluation];

    const btnSuivant = () => {
        return (
            <TouchableOpacity
                style={styles.footerBtn}
                onPress={() => setIndexEvaluation(indexEvaluation + 1)}
            >
                <Text style={styles.footerText}>Suivant </Text>
            </TouchableOpacity>
        )
    }

    const btnValider = () => {
        return (
            <TouchableOpacity
                style={styles.footerBtn}
                onPress={() => props.navigation.navigate('TestRecap')}
            >
                <Text style={styles.footerText}>Valider </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titre}>
                    {selectedcategorie}
                </Text>

                <Text style={styles.titre1}>
                    {selectedEvaluationSC}
                </Text>

                <Text style={styles.titre2}>
                    {selectedEvaluation} ({indexEvaluation + 1} / {selectedEvaluations.length}) {" "}
                    <TouchableWithoutFeedback onPress={() => {
                        setInfoModalVisible(true);
                    }}>
                        <EvilIcons name="question" size={30} color="black" />
                    </TouchableWithoutFeedback>
                </Text>
            </View>

            {selectedEvaluation == 'Etat corporel' && <EtatCorporel nbTruies={currentNbTruies} photo1={currentPhoto1} modalInfo={infoModalVisible} />}
            {selectedEvaluation == 'Apport en eau' && <ApportEnEau />}

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={() => { props.navigation.navigate('CategSelection') }}
                >
                    <Text style={styles.footerText}>Annuler </Text>
                </TouchableOpacity>
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
    container: {
        flex: 1
    },
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