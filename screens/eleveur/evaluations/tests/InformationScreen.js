import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const TestRecapInfoScreen = props => {
    return (
        <View>
            <Text>
                Le test a bien été envoyé (ou echec de connexion, veuillez réactualiser).
            </Text>
            <Button title='Actualiser' onPress={() => { }} />
            <Button title='Retour aux tests' onPress={() => { props.navigation.navigate('EvalRecap') }} />
        </View>
    );
};


const styles = StyleSheet.create({
});


export default TestRecapInfoScreen;