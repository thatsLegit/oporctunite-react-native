import React from 'react';
import { useDispatch } from 'react-redux';
import { Platform, SafeAreaView, Button, View, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { MainNavigator } from '../stacks/MainNavigator';
import { FichesNavigator } from '../stacks/FichesNavigator';
import { BilanNavigator, EvaluationNavigator } from '../stacks/EleveurNavigator';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';


const EleveurDrawerNavigator = createDrawerNavigator();
export const EleveurDrawerNav = () => {
    const dispatch = useDispatch();
    return (
        <EleveurDrawerNavigator.Navigator drawerContent={props => {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }} ></SafeAreaView>
                    <DrawerItemList {...props} />
                    <View style={styles.LogoutContainer}>
                        <View style={styles.logout}>
                            <Button title='Se deconnecter' color='white' onPress={() => {
                                dispatch(authActions.logout());
                            }} />
                        </View>
                    </View>
                </View>
            );
        }}
            drawerContentOptions={{ activeTintColor: Colors.primary }}
        >
            <EleveurDrawerNavigator.Screen
                name='Main'
                component={MainNavigator}
                options={{
                    title: 'Profil',
                    drawerIcon: drawerConfig => (
                        <MaterialCommunityIcons
                            name="pig"
                            size={23}
                            color={drawerConfig.tintColor}
                        />
                    )
                }}
            />
            <EleveurDrawerNavigator.Screen
                name='Fiches'
                component={FichesNavigator}
                options={{
                    drawerIcon: drawerConfig => (
                        <Ionicons
                            name={Platform.OS == 'android' ? 'md-book' : 'ios-book'}
                            size={23}
                            color={drawerConfig.tintColor}
                        />
                    )
                }}
            />
            <EleveurDrawerNavigator.Screen
                name='Bilans'
                component={BilanNavigator}
                options={{
                    title: 'Mon bilan',
                    drawerIcon: drawerConfig => (
                        <AntDesign
                            name="linechart"
                            size={23}
                            color={drawerConfig.tintColor}
                        />
                    )
                }}
            />
            <EleveurDrawerNavigator.Screen
                name='Evaluations'
                component={EvaluationNavigator}
                options={{
                    drawerIcon: drawerConfig => (
                        <MaterialCommunityIcons
                            name="test-tube"
                            size={23}
                            color={drawerConfig.tintColor}
                        />
                    )
                }}
            />
        </EleveurDrawerNavigator.Navigator>
    );
};

const styles = StyleSheet.create({
    LogoutContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20
    },
    logout: {
        borderWidth: 0.5,
        borderColor: 'red',
        width: '60%',
        backgroundColor: 'red'
    }
});