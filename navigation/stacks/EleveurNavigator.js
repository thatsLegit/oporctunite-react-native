import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors';
import defaultNavOptions from '../../components/Navigation/DefaultNavOptions';

import EvalRecapScreen, { screenOptions as EvalOptions } from '../../screens/eleveur/evaluations/EvalRecapScreen';
import BonEtatGeneral from '../../screens/eleveur/evaluations/selections/BonEtatGeneral';
import Sante from '../../screens/eleveur/evaluations/selections/Sante';
import ExpressionDesComportements from '../../screens/eleveur/evaluations/selections/ExpressionDesComportements';
import EnvironnementApproprie from '../../screens/eleveur/evaluations/selections/EnvironnementApproprie';
import EvalSelectionScreen from '../../screens/eleveur/evaluations/selections/EvalSelection';
import EvalInfoScreen from '../../screens/eleveur/evaluations/selections/InformationScreen';
import TestScreen, { screenOptions as TestScreenOptions } from '../../screens/eleveur/evaluations/tests/TestScreen';
import TestRecapScreen from '../../screens/eleveur/evaluations/tests/RecapScreen';
import TestRecapInfoScreen from '../../screens/eleveur/evaluations/tests/InformationScreen';


//Eval selection bottom-tab navigator
const CategSelectionTabNavigator = createBottomTabNavigator();
export const CategSelectionNavigator = () => {
    return (
        <CategSelectionTabNavigator.Navigator
            tabBarOptions={{
                activeTintColor: Colors.secondary,
                inactiveTintColor: Colors.secondary,
                activeBackgroundColor: Colors.primary,
                inactiveBackgroundColor: 'gray',
                adaptive: true,
                tabStyle: { justifyContent: 'center' }
            }}
        >
            <CategSelectionTabNavigator.Screen
                name='BonEtatGeneral'
                component={BonEtatGeneral}
                options={{
                    tabBarLabel: () => {
                        return <Text style={styles.tabBarLabel}>Bon état{"\n"}général</Text>;
                    }
                }}
            />
            <CategSelectionTabNavigator.Screen
                name='Sante'
                component={Sante}
                options={{
                    tabBarLabel: () => {
                        return <Text style={styles.tabBarLabel}>Santé</Text>;
                    }
                }}
            />
            <CategSelectionTabNavigator.Screen
                name='EnvironnementApproprie'
                component={EnvironnementApproprie}
                options={{
                    tabBarLabel: () => {
                        return <Text style={styles.tabBarLabel}>Environnement approprié</Text>;
                    }
                }}
            />
            <CategSelectionTabNavigator.Screen
                name='ExpressionDesComportements'
                component={ExpressionDesComportements}
                options={{
                    tabBarLabel: () => {
                        return <Text style={styles.tabBarLabel}>Expression{"\n"}des{"\n"}comportements</Text>;
                    }
                }}
            />
        </CategSelectionTabNavigator.Navigator>
    );
};

//Evaluation stack navigator
const EvaluationStackNavigator = createStackNavigator();
export const EvaluationNavigator = () => {
    return (
        <EvaluationStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <EvaluationStackNavigator.Screen
                name='EvalRecap'
                component={EvalRecapScreen}
                options={EvalOptions}
            />
            <EvaluationStackNavigator.Screen
                name='CategSelection'
                component={CategSelectionNavigator}
                options={EvalOptions}
            />
            <EvaluationStackNavigator.Screen
                name='EvalSelection'
                component={EvalSelectionScreen}
                options={EvalOptions}
            />
            <EvaluationStackNavigator.Screen
                name='EvalInfo'
                component={EvalInfoScreen}
                options={EvalOptions}
            />
            <EvaluationStackNavigator.Screen
                name='Test'
                component={TestScreen}
                options={TestScreenOptions}
            />
            <EvaluationStackNavigator.Screen
                name='TestRecap'
                component={TestRecapScreen}
                options={TestScreenOptions}
            />
            <EvaluationStackNavigator.Screen
                name='TestRecapInfo'
                component={TestRecapInfoScreen}
                options={TestScreenOptions}
            />
        </EvaluationStackNavigator.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarLabel: {
        color: 'white',
        fontSize: 13,
        textAlign: 'center'
    }
});
