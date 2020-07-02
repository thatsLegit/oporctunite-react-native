import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';


const Counter = props => {

    const [count, setCount] = useState('0');
    const { max } = props;

    const plus = () => {
        if (parseInt(count) + 1 > max) {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${max}.`, [{ text: 'Compris', style: 'destructive' }]);
            return;
        }
        if (props.onChange(parseInt(count) + 1, 'plus', 1) == 'error') { return };
        setCount((parseInt(count) + 1).toString());
    };

    const moins = () => {
        if (count > 0) {
            if (props.onChange(parseInt(count) - 1, 'minus', 1) == 'error') { return };
            setCount((parseInt(count) - 1).toString());
        }
    };

    const numberInputHandler = num => {
        if (parseInt(num) > max) {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${max}.`, [{ text: 'Compris', style: 'destructive' }]);
            return;
        }
        if (num.length > 0) {
            const difference = parseInt(num) - count;
            if (difference > 0) { //input number is lower than the previous counter
                if (props.onChange(parseInt(num), 'plus', difference) == 'error') { error };
            } else { //input is greater than previous counter
                if (props.onChange(parseInt(num), 'minus', Math.abs(difference)) == 'error') { error };
            }
            setCount(num);
        } else {
            props.onChange(0, 'minus', parseInt(count));
            setCount('');
        }
    };

    const maybeZero = () => {
        if (count != '') {
            return;
        } else {
            setCount('0');
        }
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.rowContainer}>
                <Icon.Button
                    name="minus"
                    backgroundColor={Colors.primary}
                    onPress={moins}
                    size={20}
                    paddingRight={0}
                />
                <TextInput
                    style={styles.result}
                    onChangeText={numberInputHandler}
                    onBlur={maybeZero}
                    value={count.toString()}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='number-pad'
                    maxLength={2}
                />
                <Icon.Button
                    name="plus"
                    backgroundColor={Colors.primary}
                    onPress={plus}
                    size={20}
                    paddingRight={0}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    result: {
        textAlign: 'center',
        width: 30,
        fontSize: 20,
        paddingTop: 5,
        marginLeft: 10,
        marginRight: 10
    }
});

export default Counter;