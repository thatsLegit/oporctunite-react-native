import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EtatCorporel from '../../../../components/Eleveur/Tests/EtatCorporel'
import ApportEnEau from '../../../../components/Eleveur/Tests/ApportEnEau'
import { useSelector } from 'react-redux';


const TestScreen = props => {

    const [indexEvaluation, setIndexEvaluation] = useState(0);
    const selectedEvaluations = useSelector(state => Object.values(state.eval.evalSelection));

    const selectedEvaluation = selectedEvaluations.map(eva => eva.nomEvaluation)[indexEvaluation];
    const selectedEvaluationSC = selectedEvaluations.map(eva => eva.nomCategorieP)[indexEvaluation];
    const currentNbTruies = selectedEvaluations.map(eva => eva.nbTruies)[indexEvaluation];


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
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <Text style={styles.titre1}>
                    {selectedEvaluationSC}
                </Text>

                <Text style={styles.titre2}>
                    {selectedEvaluation} ({indexEvaluation + 1} / {selectedEvaluations.length})
                </Text>

            </View>
            <View style={styles.contentContainer}>
                {selectedEvaluation == 'Etat corporel' && <EtatCorporel nbTruies={currentNbTruies} />}
                {selectedEvaluation == 'Apport en eau' && <ApportEnEau />}
            </View>

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
        flex: 1,
    },
    header: {
        flex: 2,
        marginTop: 10,
        alignItems: "center",
    },
    titre1: {
        fontSize: 18,
    },
    titre2: {
        fontSize: 16,
    },
    contentContainer: {
        flex: 9,
        marginLeft: 10,
        marginRight: 10,
    },
    footer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    footerBtn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#27AAE1",
        color: "#FFF",
        height: "100%",
        width: "50%",
        borderColor: 'white',
        borderWidth: 1
    },
    footerText: {
        fontSize: 18,
        color: "#FFF"
    }
});


export default TestScreen;