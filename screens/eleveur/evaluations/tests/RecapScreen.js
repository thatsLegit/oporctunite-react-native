import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as testActions from '../../../../store/actions/test';
import { FlatList } from 'react-native-gesture-handler';
import Colors from '../../../../constants/Colors';
import Shadow from '../../../../components/UI/Shadow';
import * as evalActions from '../../../../store/actions/evaluation';
import * as sousCategActions from '../../../../store/actions/sousCateg';



const TestRecapScreen = props => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(evalActions.supprimerEvalSelection());
        dispatch(sousCategActions.supprimerSousCategSelection());
    }, []);

    const tests = useSelector(state => Object.values(state.test.enCours));

    const resultTable = item => {
        return (
            <View style={styles.tableContainer}>
                <Text style={styles.tableText}>
                    {item.nomEvaluation} {':'} {item.valeur} {'/10'}
                </Text>
            </View>
        );
    };

    const submitHandler = async () => {
        await dispatch(testActions.soumettreTests());
        props.navigation.navigate('TestRecapInfo');
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Récapitulatif des évaluations
                </Text>
            </View>
            <View style={styles.list}>
                <FlatList
                    keyExtractor={item => item.nomEvaluation}
                    data={tests}
                    renderItem={itemData => resultTable(itemData.item)}
                />
            </View>
            <View style={styles.buttonContainer}>
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
    titleContainer: {
        alignItems: 'center',
        marginVertical: 40
    },
    title: {
        fontSize: 20,
        fontFamily: 'open-sans-bold'
    },
    list: {
        marginVertical: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30
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
        fontSize: 15,
        padding: 7,
        fontFamily: 'open-sans-bold'
    },
    tableContainer: {
        width: '80%',
        borderColor: 'grey',
        borderWidth: 1
    },
    tableText: {
        fontSize: 15,
        fontFamily: 'open-sans'
    }
});


export default TestRecapScreen;