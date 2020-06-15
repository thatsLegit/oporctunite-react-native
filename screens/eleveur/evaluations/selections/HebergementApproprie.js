import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const HebergementApproprieScreen = props => {
    return (
        <View>
            <Text>
                Catégorie hébérgement approprié
            </Text>
            <Button title='sous-catégorie' onPress={() => { props.navigation.navigate('EvalSelection') }} />
            <Button title='Retour au récap' onPress={() => { props.navigation.goBack() }} />
        </View>
    );
};


const styles = StyleSheet.create({
});


export default HebergementApproprieScreen;