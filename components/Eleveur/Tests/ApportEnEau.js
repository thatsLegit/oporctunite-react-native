import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Counter from '../../UI/Counter';


const ApportEnEau = props => {

    [count, setCount] = useState(0);
    [count2, setCount2] = useState(0);
    [globalCount, setGlobalCount] = useState(0);

    const changeHandler = (count, sign) => {
        setCount(count);
        if (sign == 'plus') {
            setGlobalCount(globalCount + 1);
        } else {
            setGlobalCount(globalCount - 1);
        }
    }
    const changeHandler2 = (count2, sign) => {
        setCount(count2);
        if (sign == 'plus') {
            setGlobalCount(globalCount + 1);
        } else {
            setGlobalCount(globalCount - 1);
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.explications}>
                    <Text>
                        L'abreuvoir est adéquat :
                    </Text>
                </View>
                <Counter onChange={changeHandler} />

                <View style={styles.explications}>
                    <Text>
                        L'abreuvoir n'est pas adéquat :
                    </Text>
                </View>
                <Counter onChange={changeHandler2} />
            </View>
            <View style={styles.counterContainer}>
                <Text style={styles.counterText}>Nombre total d'abreuvoirs : {globalCount}</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    explications: {
        marginVertical: 25
    },
    counterContainer: {
        marginVertical: 50
    },
    counterText: {
        fontFamily: 'open-sans-bold',
        fontSize: 20
    }
});


export default ApportEnEau;