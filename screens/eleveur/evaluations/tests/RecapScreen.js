import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as testActions from '../../../../store/actions/test';
import { FlatList } from 'react-native-gesture-handler';
import Colors from '../../../../constants/Colors';
import Shadow from '../../../../components/UI/Shadow';
import Table from '../../../../components/UI/Table';
import * as evalActions from '../../../../store/actions/evaluation';
import * as sousCategActions from '../../../../store/actions/sousCateg';
import Spinner from 'react-native-loading-spinner-overlay';
import { fetchAllTests } from '../../../../helper/db/requetes';


const TestRecapScreen = props => {

    const idutilisateur = useSelector(state => state.auth.idutilisateur);
    const [isLoading, setIsLoading] = useState(false);
    const tests = useSelector(state => state.test.enCours);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(evalActions.supprimerEvalSelection());
        dispatch(sousCategActions.supprimerSousCategSelection());
    }, []);

    const submitHandler = async () => {
        setIsLoading(true);
        const tests = await fetchAllTests(idutilisateur);
        const number = tests.rows._array.length;
        await dispatch(testActions.soumettreTests());
        setIsLoading(false);
        props.navigation.navigate('EvalRecap', { length: number, trigger: true });
    };

    if (isLoading) {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner
                    visible={isLoading}
                    textContent={'Envoi en cours...'}
                    textStyle={{ color: '#FFF' }}
                />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Table style={{ flex: 0.9, paddingTop: 25 }}>
                <FlatList
                    ListHeaderComponent={(
                        <View style={styles.header}>
                            <Text style={styles.titre}>
                                Récapitulatif des évaluations
                            </Text>
                        </View>
                    )}
                    keyExtractor={item => item.nomEvaluation}
                    data={tests}
                    renderItem={itemData => (
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>
                                {itemData.item.nomEvaluation} : {itemData.item.valeur} /10
                            </Text>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                />
            </Table>
            <View style={styles.footer}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => submitHandler()}>
                        <Shadow><Text style={styles.buttonText}>Valider</Text></Shadow>
                    </TouchableOpacity>
                </View>
            </View>
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
    text: {
        fontSize: 16,
        fontFamily: 'open-sans'
    },
    textContainer: {
        paddingVertical: 15
    },
    footer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 40
    },
    button: {
        width: "40%",
        height: 40,
        backgroundColor: Colors.accent,
        borderRadius: 10,
        alignItems: "center",
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        paddingTop: 5,
        fontSize: 17,
        fontFamily: 'open-sans-bold'
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    itemSeparator: {
        height: StyleSheet.hairlineWidth,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
    }
});


export default TestRecapScreen;