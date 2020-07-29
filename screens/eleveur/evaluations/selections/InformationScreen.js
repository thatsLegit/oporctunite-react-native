import React, { useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import TopNavigationForm from '../../../../components/Navigation/TopNavigationForm';
import Colors from '../../../../constants/Colors';
import Shadow from '../../../../components/UI/Shadow';
import * as evalActions from '../../../../store/actions/evaluation';


const EvalInfoScreen = props => {
    const evaluations = useSelector(state => Object.values(state.sousCateg.sousCategories).flat());
    const selectedEvaluations = useSelector(state => Object.values(state.eval.evalSelection));
    const skipped = useRef(false);
    const dispatch = useDispatch();

    const linkHandler = (evaluation) => {
        dispatch(evalActions.ajouterALaSelection(evaluation));
    };

    const evalInfoHandler = (item, index) => {
        if (skipped.current) {
            skipped.current = false;
            return;
        }
        const idLiaison = item.idLiaison;
        let evalLiee;
        let alreadySelected = false;
        if (idLiaison != "0") {
            for (var i = index + 1; i < selectedEvaluations.length; i++) {
                if (selectedEvaluations[i].idLiaison == idLiaison) {
                    alreadySelected = true;
                    evalLiee = selectedEvaluations[i];
                    break;
                }
            }
        } else {
            return (
                <View>
                    <Text style={styles.item}>{item.nomEvaluation}</Text>
                    <Text style={styles.temps}>Temps de réalisation estimé : 2 minutes.</Text>
                    <Text style={styles.temps}>Nombre de truies à évaluer : {item.nbTruies != null ? item.nbTruies : 'indéfini'}.</Text>
                </View>
            );
        }
        if (alreadySelected) {
            skipped.current = true;
            return (
                <View>
                    <Text style={styles.item}>{item.nomEvaluation} et {evalLiee.nomEvaluation}</Text>
                    <Text style={styles.temps}>Temps de réalisation estimé : 3 minutes.</Text>
                    <Text style={styles.temps}>Nombre de truies à évaluer : {item.nbTruies != null ? item.nbTruies : 'indéfini'}.</Text>
                </View>
            );
        } else {
            for (const evaluation of evaluations) {
                if (evaluation.idLiaison == idLiaison && evaluation.nomEvaluation != item.nomEvaluation) {
                    evalLiee = evaluation;
                    break;
                }
            };
            return (
                <View>
                    <Text style={styles.item}>{item.nomEvaluation}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Liaisons possibles : </Text>
                        <TouchableOpacity onPress={() => linkHandler(evalLiee)}>
                            <Shadow style={styles.liaisonButton}>

                                <Entypo name="add-to-list" size={24} color="black" />
                                <Text style={styles.liaisonText}> {evalLiee.nomEvaluation}</Text>

                            </Shadow>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.temps}>Temps de réalisation estimé : 2 minutes.</Text>
                    <Text style={styles.temps}>Nombre de truies à évaluer : {item.nbTruies != null ? item.nbTruies : 'indéfini'}.</Text>
                </View>
            );
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <TopNavigationForm
                navigation={props.navigation}
                retour='EvalSelection'
                textRetour='Retour selection'
                valider='Test'
                textValider='Commencer'
                check={false}
            />
            <View style={styles.header}>
                <Text style={styles.titre1}>
                    Evaluations séléctionnées
                </Text>
            </View>
            <FlatList
                keyExtractor={item => item.nomEvaluation}
                data={selectedEvaluations}
                renderItem={(itemData) => evalInfoHandler(itemData.item, itemData.index)}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    header: {
        paddingTop: 50,
        alignItems: "center",
        fontFamily: 'open-sans-bold'
    },
    titre1: {
        fontSize: 18,
        paddingBottom: 10,
        fontFamily: 'open-sans'
    },
    item: {
        paddingVertical: 25,
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    temps: {
        paddingVertical: 20
    },
    liaisonButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.accent,
        borderRadius: 20,
        padding: 5
    },
    liaisonText: {
        fontSize: 15,
        fontFamily: 'open-sans-bold'
    }
});


export default EvalInfoScreen;