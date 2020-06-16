import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ListeSousCategorie from '../../../../components/ListeSousCategorie/ListeSousCategorie'

const BonneAlimentationScreen = props => {
    return (
        <View style={styles.container}>
            <Text>
                Catégorie bonne alimentation
            </Text>
            <ListeSousCategorie/>
            <Button title='sous-catégorie' onPress={() => { props.navigation.navigate('EvalSelection') }} />
            <Button title='Retour au récap' onPress={() => { props.navigation.goBack() }} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
       }
});


export default BonneAlimentationScreen;