import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const EvalInfoScreen = props => {
    return (
        <View>
            <Text>
                Selection des tests.
            </Text>
            <Button title="Retour à l'écran de séléction des évaluations" onPress={() => { props.navigation.goBack() }} />
            <Button title='Démarrer le test' onPress={() => { props.navigation.navigate('Test') }} />
        </View>
    );
};


const styles = StyleSheet.create({
});


export default EvalInfoScreen;