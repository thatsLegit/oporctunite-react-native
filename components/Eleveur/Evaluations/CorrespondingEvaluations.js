import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight, Platform, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { CheckBox } from "native-base"
import { Octicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import Shadow from '../../UI/Shadow';
import * as evalActions from '../../../store/actions/evaluation';
import Evaluation from '../../../models/Evaluation';


const CorrespondingEvaluations = props => {
    const { choixInitial } = props; //choixInitial ne dépend que de la valeur de selectAll dans l'element parent
    const [choix, setChoix] = useState(choixInitial);
    const Eval = new Evaluation(props.nomEvaluation, props.description, props.nomCategorieP);
    const dispatch = useDispatch();

    useEffect(() => {
        choix != choixInitial && switchChoix();
        setChoix(choixInitial);
    }, [choixInitial]);

    const switchChoix = () => {
        if (choix) {
            console.log('supprimé');
            dispatch(evalActions.supprimerDeLaSelection(Eval.nomEvaluation));
            setChoix(!choix);
            return;
        }
        console.log('ajouté');
        dispatch(evalActions.ajouterALaSelection(Eval));
        setChoix(!choix);
    };

    let Touchable = TouchableOpacity;
    if (Platform.OS == 'android') {
        Touchable = TouchableHighlight;
    }

    return (
        <Touchable onPress={() => switchChoix()}>
            <Shadow style={styles.evalContainer}>
                <View style={styles.innerText}>
                    <Text style={styles.subTitle}>{Eval.nomEvaluation}</Text>
                    <Text style={styles.infos}>{Eval.nomCategorieP}</Text>
                    <View>
                        <Text style={{ marginVertical: 20, textAlign: 'center' }}>Mini-image</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <CheckBox
                            onPress={() => switchChoix()}
                            color={Colors.primary}
                            checked={choix}
                        />
                        <TouchableOpacity><Octicons name="info" size={25} color="black" /></TouchableOpacity>
                    </View>
                </View>
            </Shadow>
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