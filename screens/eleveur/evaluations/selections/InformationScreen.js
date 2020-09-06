import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import TopNavigationForm from '../../../../components/Navigation/TopNavigationForm';
import Colors from '../../../../constants/Colors';
import Shadow from '../../../../components/UI/Shadow';
import * as evalActions from '../../../../store/actions/evaluation';
import ModalPopupInfo from '../../../../components/UI/ModalPopupInfo';
import Table from '../../../../components/UI/Table';

//Ecran d'info récapitulant la séléction et permettant de lier certaines évaluations

const EvalInfoScreen = props => {
    //Ensemble des evals
    const evaluations = useSelector(state => Object.values(state.sousCateg.sousCategories).flat());

    //Evals séléctionnées
    const selectedEvaluations = useSelector(state => Object.values(state.eval.evalSelection).sort((a, b) => a.priorite - b.priorite));

    const [modal, setModal] = useState(true);
    const skipped = useRef(false); //pour la liaison d'évals
    const dispatch = useDispatch();

    //Déclenché lorsqu'on lie deux evals
    const linkHandler = evaluation => dispatch(evalActions.ajouterALaSelection(evaluation));

    const modalCloser = () => setModal(false);

    //Fonction appelée pour afficher chaque éval séléctionnée
    const evalInfoHandler = (item, index) => {
        //Passer à l'éval suivante car l'éval est liée à la précédente ?
        if (skipped.current) {
            skipped.current = false;
            return;
        }
        const idLiaison = item.idLiaison;
        let evalLiee;
        let alreadySelected = false;
        //Cas 1 : liaison possible et les 2 evals liables sont deja dans la liste des évals séléctionnées
        if (idLiaison != "0") {
            for (var i = index + 1; i < selectedEvaluations.length; i++) {
                if (selectedEvaluations[i].idLiaison == idLiaison) {
                    alreadySelected = true;
                    evalLiee = selectedEvaluations[i];
                    break;
                }
            }
        } else {
            //Cas 2 : aucune liaison possible
            return (
                <View>
                    <Text style={styles.item}>{item.nomEvaluation}</Text>
                    <Text style={styles.temps}>Temps de réalisation estimé : 2 minutes.</Text>
                    <Text style={styles.temps}>Nombre de truies à évaluer : {item.nbTruies != null ? item.nbTruies : 'indéfini'}.</Text>
                </View>
            );
        }
        //Cas 1 : afficher l'eval double
        if (alreadySelected) {
            skipped.current = true;
            return (
                <View>
                    <Text style={styles.item}>{item.nomEvaluation} et {evalLiee.nomEvaluation}</Text>
                    <Text style={styles.temps}>Temps de réalisation estimé : 3 minutes.</Text>
                    <Text style={styles.temps}>Nombre de truies à évaluer : {item.nbTruies != null ? item.nbTruies : 'indéfini'}.</Text>
                </View>
            );
            //Cas 3 : liaison possible mais une seule séléctionnée : on propose de lier
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
            <Table style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={(
                        <View style={styles.header}>
                            <Text style={styles.titre}>
                                Evaluations séléctionnées
                            </Text>
                        </View>
                    )}
                    keyExtractor={item => item.nomEvaluation}
                    data={selectedEvaluations}
                    ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                    renderItem={(itemData) => evalInfoHandler(itemData.item, itemData.index)}
                />
                <ModalPopupInfo
                    visible={modal}
                    onClose={modalCloser}
                    text={<Text>Certaines évaluations peuvent apparaître avec un symbole {" "}
                        <Entypo name="add-to-list" size={24} color="black" />
                    . {" "}Cela signifie que l'évaluation peut être réalisée en même temps qu'une autre pour gagner du temps !
                    </Text>}
                    buttonText='Compris'
                    align
                />
            </Table>
        </View>
    );
};


const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.accent,
        borderRadius: 10,
        alignItems: "center",
        fontFamily: 'open-sans-bold'
    },
    titre: {
        fontSize: 18,
        paddingBottom: 10,
        fontFamily: 'open-sans',
        paddingTop: 10
    },
    item: {
        paddingVertical: 25,
        fontSize: 16,
        textDecorationLine: 'underline',
        paddingLeft: 5
    },
    temps: {
        paddingVertical: 10,
        paddingLeft: 5
    },
    liaisonButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 20,
        padding: 5
    },
    liaisonText: {
        fontSize: 15,
        fontFamily: 'open-sans-bold',
        paddingHorizontal: 10
    },
    itemSeparator: {
        height: StyleSheet.hairlineWidth,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
    }
});


export default EvalInfoScreen;