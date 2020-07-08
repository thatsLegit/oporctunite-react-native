import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Shadow from '../UI/Shadow';
import Colors from '../../constants/Colors';


const TimerChrono = props => {

    const [isTimerStart, setIsTimerStart] = useState();
    const timerDuration = 5000;
    const [resetTimer, setResetTimer] = useState();

    const startStopTimer = () => {
        setIsTimerStart(!isTimerStart);
        setResetTimer(false);
    };
    const fResetTimer = () => {
        setIsTimerStart(false);
        setResetTimer(true);
    };
    const timerFinishedHanler = () => {
        props.onTimeComplete();
        setIsTimerStart(false);
        setResetTimer(true);
    };

    return (
        <View style={styles.container}>
            <Shadow style={styles.innerContainer}>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }}>
                    <Timer
                        totalDuration={timerDuration}
                        start={isTimerStart}
                        reset={resetTimer}
                        options={options} // C'est ici qu'on met le style pour les chiffres et le cadre
                        handleFinish={timerFinishedHanler}
                    />
                </View>
                <View style={styles.bouttons}>
                    <TouchableWithoutFeedback onPress={startStopTimer}>
                        <View style={styles.textControl}>
                            {!isTimerStart ? <AntDesign name="caretright" size={35} color="black" /> : <FontAwesome name="pause" size={34} color="black" />}
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={fResetTimer}>
                        <View style={styles.textControl}>
                            <Ionicons name="ios-refresh-circle" size={40} color="black" />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Shadow>
        </View>
    );
};


// Style spécifique timer (chiffres)
const options = {
    container: {
        backgroundColor: Colors.primary,
        padding: 5,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        color: 'black'
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    innerContainer: {
        height: 100,
        alignItems: 'center',
        marginTop: 50,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10
    },
    textControl: {
        fontSize: 20,
        marginLeft: 25,
        marginHorizontal: 35
    },
    bouttons: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center'
    }
});


export default TimerChrono;