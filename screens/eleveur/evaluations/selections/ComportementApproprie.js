import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const ComportementApproprieScreen = props => {
    return (
        <View>
            <Text>
                Catégorie comportement approprié
            </Text>
            <Button title='sous-catégorie' onPress={() => { props.navigation.navigate('EvalSelection') }} />
            <Button title='Retour au récap' onPress={() => { props.navigation.goBack() }} />
        </View>
    );
};


const styles = StyleSheet.create({
});


export default ComportementApproprieScreen;