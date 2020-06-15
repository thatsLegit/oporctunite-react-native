import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const EvalSelectionScreen = props => {
    return (
        <View>
            <Text>
                Selection des tests.
            </Text>
            <Button title='Retour au choix des catégories' onPress={() => { props.navigation.goBack() }} />
            <Button title='Test 1' onPress={() => { props.navigation.navigate('EvalInfo') }} />
        </View>
    );
};


const styles = StyleSheet.create({
});


export default EvalSelectionScreen;