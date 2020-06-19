import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight, Platform, Dimensions } from 'react-native';
import { CheckBox } from "native-base"
import { Octicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';


const CorrespondingEvaluations = props => {
    const { choixInitial } = props; //choixInitial ne dépend que de la valeur de selectAll dans l'element parent
    const [choix, setChoix] = useState(choixInitial);

    useEffect(() => {
        setChoix(choixInitial);
    }, [choixInitial]);

    let Touchable = TouchableOpacity;
    if (Platform.OS == 'android') {
        Touchable = TouchableHighlight;
    }

    return (
        <Touchable onPress={() => setChoix(!choix)}>
            <View style={styles.evalContainer}>
                <View style={styles.innerText}>
                    <Text style={styles.subTitle}>{props.nomEvaluation}</Text>
                    <Text style={styles.infos}>{props.nomCategorieP}</Text>
                    <View>
                        <Text style={{ marginVertical: 20, textAlign: 'center' }}>Mini-image</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <CheckBox
                            onPress={() => setChoix(!choix)}
                            color={Colors.primary}
                            checked={choix}
                        />
                        <TouchableOpacity><Octicons name="info" size={25} color="black" /></TouchableOpacity>
                    </View>
                </View>
            </View>
        </Touchable>
    );
};

const styles = StyleSheet.create({
    subTitle: {
        marginBottom: 5,
        fontFamily: 'open-sans-bold',
        fontSize: 15
    },
    evalContainer: {
        minWidth: 100,
        maxWidth: Dimensions.get('window').width / 2 - 15,
        minHeight: 80,
        borderColor: 'black',
        borderWidth: 1,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 5, height: 5 },
        elevation: 7,
        borderRadius: 8,
        margin: 10,
        backgroundColor: Colors.secondary
    },
    innerText: {
        padding: 10
    },
    infos: {
        fontSize: 12,
        fontFamily: 'open-sans'
    }
});


export default CorrespondingEvaluations;