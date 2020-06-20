import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';


const EvalInfoScreen = props => {
    const selectedEvaluations = useSelector(state => Object.values(state.eval.evalSelection).map(e => e.nomEvaluation));

    return (
        <View>
            <Text>
                Selection des tests.
            </Text>
            <Text>
                {selectedEvaluations}
            </Text>
            <Button title="Retour à l'écran de séléction des évaluations" onPress={() => { props.navigation.goBack() }} />
            <Button title='Démarrer le test' onPress={() => { props.navigation.navigate('Test') }} />
        </View>
    );
};


const styles = StyleSheet.create({
});


export default EvalInfoScreen;