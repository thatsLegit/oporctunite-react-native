import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Counter from '../../UI/Counter';
import ProgressBar from 'react-native-progress/Bar';


const EtatCorporel = props => {

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
                <View>
                    <Text>
                        Une pression ferme avec la paume de la main permet de sentir les reliefs osseux :
                    </Text>
                </View>

                <Counter onChange={changeHandler} />
                <View style={{ marginVertical: 25 }}>
                    <Text>
                        Les reliefs osseux de la hanche et du dos sont facilement sentis sans aucune pression :
                    </Text>
                </View>

                <Counter onChange={changeHandler2} />
                <View style={{ marginVertical: 25 }}>
                    <Text>
                        Ma truie semble très mince visuellement avec des hanche et un dos très proéminent :
                    </Text>
                </View>
                <Counter onChange={changeHandler3} />
            </View>
            <View style={styles.counterContainer}>
                <Text style={styles.counterText}>{globalCount} / 40</Text>
                <ProgressBar progress={globalCount / 40} width={200} />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    counterContainer: {
        marginVertical: 50
    },
    counterText: {
        fontFamily: 'open-sans-bold',
        fontSize: 20
    }
});


export default EtatCorporel;