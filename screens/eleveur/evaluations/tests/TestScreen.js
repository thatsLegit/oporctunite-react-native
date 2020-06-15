import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const TestScreen = props => {
    return (
        <View>
            <Text>
                Test 1
            </Text>
            <Button title='Annuler' onPress={() => { props.navigation.navigate('CategSelection') }} />
            <Button title='Confirmer' onPress={() => { props.navigation.navigate('TestRecap') }} />
        </View>
    );
};

export const screenOptions = (navData) => {
    return {
        headerLeft: null
    };
};

const styles = StyleSheet.create({
});


export default TestScreen;