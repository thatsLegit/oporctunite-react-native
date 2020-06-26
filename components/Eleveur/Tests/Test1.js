import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Counter from '../../Counter/Counter';



const Test1 = props => {

    [count, setCount] = useState(0);
    [count2, setCount2] = useState(0);
    [count3, setCount3] = useState(0);
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
    const changeHandler3 = (count3, sign) => {
        setCount(count3);
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
                        Une pression ferme avec la paume de la main permet de sentir les reliefs osseux :
                    </Text>
                </View>

                <Counter onChange={changeHandler} />
                <View style={styles.explications}>
                    <Text>
                        Les reliefs osseux de la hanche et du dos sont facilement sentis sans aucune pression :
                    </Text>
                </View>

                <Counter onChange={changeHandler2} />
                <View style={styles.explications}>
                    <Text>
                        Ma truie semble très mince visuellement avec des hanche et un dos très proéminent :
                    </Text>
                </View>
                <Counter onChange={changeHandler3} />
            </View>
            <View style={styles.counterContainer}>
                <Text style={styles.counterText}>{globalCount} / 30</Text>
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


export default Test1;