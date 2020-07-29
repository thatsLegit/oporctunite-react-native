import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import TopNavigationForm from '../../../../components/Navigation/TopNavigationForm';


const EvalInfoScreen = props => {
    const evaluations = useSelector(state => Object.values(state.sousCateg.sousCategories));
    const selectedEvaluations = useSelector(state => Object.values(state.eval.evalSelection));

    const evalInfoHandler = (item, index) => {
        const idLiaison = item.idLiaison;
        let evalLiee;
        let alreadySelected;
        if (idLiaison != "0") {
            for (var i = index + 1; i < selectedEvaluations.length; i++) {
                if (selectedEvaluations[i].idLiaison == idLiaison) {
                    console.log('entered1');
                    alreadySelected = true;
                    evalLiee = selectedEvaluations[i];
                    break;
                }
            }
        } else {
            return (
                <View>
                    <Text style={styles.item}>{item.nomEvaluation}</Text>
                    <Text style={styles.temps}>Temps de réalisation estimé : 3 minutes.</Text>
                    <Text style={styles.temps}>Nombre de truies à évaluer : {item.nbTruies != null ? item.nbTruies : 'indéfini'}.</Text>
                </View>
            );
        }
        if (alreadySelected) {
            console.log('entered2');
            return (
                <View>
                    <Text style={styles.item}>{item.nomEvaluation} et {evalLiee.nomEvaluation}</Text>
                    <Text style={styles.temps}>Temps de réalisation estimé : 3 minutes.</Text>
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
        marginTop: 50,
        alignItems: "center",
        fontFamily: 'open-sans-bold'
    },
    titre1: {
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'open-sans'
    },
    item: {
        marginVertical: 25,
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    temps: {
        marginVertical: 20
    }
});


export default EvalInfoScreen;