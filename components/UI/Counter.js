import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';


const Counter = props => {

    const [count, setCount] = useState('0');
    const modifyCounter = useRef('0');
    const { max, reinitialiser } = props;

    useEffect(() => {
        setCount('0');
    }, [reinitialiser]);

    const plus = () => {
        if (max && parseInt(count) + 1 > max) {
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

    const numberInputHandler = () => {
        if (max && parseInt(count) > max) {
            Alert.alert('Erreur', `Le nombre de truies à évaluer pour cette évaluation est de ${max}.`, [{ text: 'Compris', style: 'destructive' }]);
            setCount(modifyCounter.current);
            return;
        }
        if (count.length > 0) {
            const difference = parseInt(count) - parseInt(modifyCounter.current);
            if (difference > 0) { //input number is lower than the previous counter
                if (props.onChange(parseInt(count), 'plus', difference) == 'error') {
                    setCount(modifyCounter.current);
                    return;
                };
            } else { //input is greater than previous counter
                props.onChange(parseInt(count), 'minus', Math.abs(difference));
            }
            modifyCounter.current = count;
        } else {
            props.onChange(0, 'minus', parseInt(modifyCounter.current));
            setCount('0');
            modifyCounter.current = '0';
        }
    };

    const changeTextEventHandler = num => setCount(num);
    const saveCountBeforeModify = () => modifyCounter.current = count;

    return (
        <View style={styles.mainContainer}>
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
                    onBlur={numberInputHandler}
                    onChangeText={changeTextEventHandler}
                    onFocus={saveCountBeforeModify}
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
        </View>
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