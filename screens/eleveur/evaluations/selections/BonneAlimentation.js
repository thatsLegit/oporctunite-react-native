import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const BonneAlimentationScreen = props => {
    return (
        <View>
            <Text>
                Catégorie bonne alimentation
            </Text>
            <Button title='sous-catégorie' onPress={() => { props.navigation.navigate('EvalSelection') }} />
            <Button title='Retour au récap' onPress={() => { props.navigation.goBack() }} />
        </View>
    );
};


const styles = StyleSheet.create({
});


export default BonneAlimentationScreen;