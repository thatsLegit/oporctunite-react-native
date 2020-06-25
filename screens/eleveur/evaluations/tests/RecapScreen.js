import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const TestRecapScreen = props => {
    return (
        <View>
            <Text>
                Récapitulatif de l'évaluation 1
            </Text>
            <Button title='Valider' onPress={() => { props.navigation.navigate('TestRecapInfo') }} />
        </View>
    );
};


const styles = StyleSheet.create({
});


export default TestRecapScreen;