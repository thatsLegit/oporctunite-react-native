//Bilans and evaluations (eleveur) stack navigators

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native'


import Colors from '../../constants/Colors';
import defaultNavOptions from '../../components/Navigation/DefaultNavOptions';


import BilanScreen, { screenOptions as BilanScreenOptions } from '../../screens/eleveur/bilans/BilanScreen';

import BilanCategorie1Screen from '../../screens/eleveur/bilans/BilanCategorie1Screen';
import BilanCategorie2Screen from '../../screens/eleveur/bilans/BilanCategorie2Screen';
import BilanCategorie3Screen from '../../screens/eleveur/bilans/BilanCategorie3Screen';
import BilanCategorie4Screen from '../../screens/eleveur/bilans/BilanCategorie4Screen';

import BilanEvaluation1Screen from '../../screens/eleveur/bilans/BilanEvaluation1Screen';
import BilanEvaluation2Screen from '../../screens/eleveur/bilans/BilanEvaluation2Screen';

import BilanEvaluations1Screen from '../../screens/eleveur/bilans/BilanEvaluations1Screen';


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



//Bilans stack navigator
const BilanSousCateg1StackNavigator = createStackNavigator();
export const BilanSousCateg1Navigator = () => {
    return (
        <BilanSousCateg1StackNavigator.Navigator screenOptions={defaultNavOptions}>
            <BilanSousCateg1StackNavigator.Screen
                name='BilanCategorie1Screen'
                component={BilanCategorie1Screen}
                options={BilanScreenOptions}
            />

            <BilanSousCateg1StackNavigator.Screen
                name='BilanEvaluation1Screen'
                component={BilanEvaluation1Screen}
                options={BilanScreenOptions}
            />
        </BilanSousCateg1StackNavigator.Navigator>
    );
};

const BilanEvaluations1StackNavigator = createStackNavigator();
export const BilanEvaluations1Navigator = () => {
    return (
        <BilanEvaluations1StackNavigator.Navigator screenOptions={defaultNavOptions}>
            <BilanEvaluations1StackNavigator.Screen
                name='BilanEvaluations1Screen'
                component={BilanEvaluations1Screen}
                options={BilanScreenOptions}
            />

            <BilanEvaluations1StackNavigator.Screen
                name='BilanEvaluation2Screen'
                component={BilanEvaluation2Screen}
                options={BilanScreenOptions}
            />
        </BilanEvaluations1StackNavigator.Navigator>
    );
};

const BilanSousCateg3StackNavigator = createStackNavigator();
export const BilanSousCateg3Navigator = () => {
    return (
        <BilanSousCateg3StackNavigator.Navigator screenOptions={defaultNavOptions}>
            <BilanSousCateg3StackNavigator.Screen
                name='BilanCategorie3Screen'
                component={BilanCategorie3Screen}
                options={BilanScreenOptions}
            />

            <BilanSousCateg3StackNavigator.Screen
                name='BilanEvaluation2Screen'
                component={BilanEvaluations1Navigator}
                options={BilanScreenOptions}
            />
        </BilanSousCateg3StackNavigator.Navigator>
    );
};

//Eval selection bottom-tab navigator
const BilanCategSelectionTabNavigator = createBottomTabNavigator();
export const BilanCategSelectionNavigator = () => {
    return (
        <BilanCategSelectionTabNavigator.Navigator
            tabBarOptions={{
                activeTintColor: Colors.secondary,
                inactiveTintColor: Colors.secondary,
                activeBackgroundColor: Colors.primary,
                inactiveBackgroundColor: 'gray',
                adaptive: true,
                tabStyle: { justifyContent: 'center' }
            }}
        >
            <BilanCategSelectionTabNavigator.Screen
                name='BilanCategorie1StackScreen'
                component={BilanSousCateg1Navigator}
                options={{
                    tabBarLabel: () => {
                        return <Text style={styles.tabBarLabel}>Bon état général</Text>;
                    }
                }}
            />
            <BilanCategSelectionTabNavigator.Screen
                name='BilanCategorie2Screen'
                component={BilanCategorie2Screen}
                options={{
                    tabBarLabel: () => {
                        return <Text style={styles.tabBarLabel}>Environnement approprié</Text>;
                    }
                }}
            />
            <BilanCategSelectionTabNavigator.Screen
                name='BilanCateg3StackScreen'
                component={BilanSousCateg3Navigator}
                options={{
                    tabBarLabel: () => {
                        return <Text style={styles.tabBarLabel}>Expression des comportements</Text>;
                    }
                }}
            />
            <BilanCategSelectionTabNavigator.Screen
                name='BilanCategorie4Screen'
                component={BilanCategorie4Screen}
                options={{
                    tabBarLabel: () => {
                        return <Text style={styles.tabBarLabel}>Santé</Text>;
                    }
                }}
            />
        </BilanCategSelectionTabNavigator.Navigator>
    );
};

//Bilans stack navigator
const BilanStackNavigator = createStackNavigator();
export const BilanNavigator = () => {
    return (
        <BilanStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <BilanStackNavigator.Screen
                name='Bilan'
                component={BilanScreen}
                options={BilanScreenOptions}
            />
            <BilanStackNavigator.Screen
                name='BilanCategorieScreen'
                component={BilanCategSelectionNavigator}
                options={BilanScreenOptions}
            />
            <BilanStackNavigator.Screen
                name='BilanEvaluation1Screen'
                component={BilanEvaluation1Screen}
                options={BilanScreenOptions}
            />
            <BilanStackNavigator.Screen
                name='BilanEvaluation2Screen'
                component={BilanEvaluation2Screen}
                options={BilanScreenOptions}
            />
        </BilanStackNavigator.Navigator>
    );
};


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


