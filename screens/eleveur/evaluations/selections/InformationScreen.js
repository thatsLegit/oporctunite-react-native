import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import TopNavigationForm from '../../../../components/Navigation/TopNavigationForm';


const EvalInfoScreen = props => {
    const selectedEvaluations = useSelector(state => Object.values(state.eval.evalSelection));
    const liaisons = useSelector(state => Object.values(state.eval.liaisons));
    console.log(liaisons);

    const evalInfoHandler = item => {
        return (
            <View>
                <Text style={styles.item}>{item.nomEvaluation}</Text>
                <Text style={styles.temps}>Temps de réalisation estimé : 2 minutes.</Text>
                <Text style={styles.temps}>Nombre de truies à évaluer : {item.nbTruies != null ? item.nbTruies : 'indéfini'}.</Text>
            </View>
        );
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
                renderItem={(itemData) => evalInfoHandler(itemData.item)}
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