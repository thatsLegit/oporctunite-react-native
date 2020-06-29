import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Test1 from '../../../../components/Eleveur/Tests/Test1'
import Test2 from '../../../../components/Eleveur/Tests/Test2'
import { useSelector } from 'react-redux';


const TestScreen = props => {

    const [indexEvaluation, setIndexEvaluation] = useState(0);

    const selectedEvaluations = useSelector(state => Object.values(state.eval.evalSelection).map(eva => eva.nomEvaluation));
    const selectedEvaluation = selectedEvaluations[indexEvaluation];
    console.log(selectedEvaluations);

    const selectedEvaluationsSC = useSelector(state => Object.values(state.eval.evalSelection).map(eva => eva.nomCategorieP));
    const selectedEvaluationSC = selectedEvaluationsSC[indexEvaluation];

    let evaluations = [];
    useSelector(state => Object.values(state.sousCateg.sousCategories).forEach(scateg => scateg.forEach(e => evaluations.push(e))));
    console.log(evaluations);

    const btnSuivant = () => {
        return (
            <TouchableOpacity
                style={styles.footerBtn}
                onPress={() => { btn() }}
            >
                <Text style={styles.footerText}>Suivant </Text>
            </TouchableOpacity>
        )
    }

    const btnValider = () => {
        return (
            <TouchableOpacity
                style={styles.footerBtn}
                onPress={() => { props.navigation.navigate('TestRecap') }}
            >
                <Text style={styles.footerText}>Valider </Text>
            </TouchableOpacity>
        )
    }
    const btn = () => {
        if ((selectedEvaluations.length > (indexEvaluation + 1))) {
            btnSuivant();
            setIndexEvaluation(indexEvaluation + 1);
        }
        else if (selectedEvaluations.length === (indexEvaluation + 1)) {
            btnValider();
        }
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
                {((evaluations.map(eva => eva.nomEvaluation).indexOf(selectedEvaluation)) == 0) ? <Test1 /> : null}
                {((evaluations.map(eva => eva.nomEvaluation).indexOf(selectedEvaluation)) == 1) ? <Test2 /> : null}
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
    },
    footerText: {
        fontSize: 18,
        color: "#FFF"
    }
});


export default TestScreen;