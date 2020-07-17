import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Button, Platform, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import RadarChart from '../../../components/Chart/RadarChart';
import HeaderButton from '../../../components/UI/HeaderButton';
import * as bilanActions from '../../../store/actions/bilan';
import Colors from '../../../constants/Colors';


const BilanScreen = props => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const notesHandler = useCallback(async () => {
        await dispatch(bilanActions.fetchNoteCategories());
        await dispatch(bilanActions.fetchNoteGlobaleCategories());
        await dispatch(bilanActions.fetchNoteSousCategories());
        await dispatch(bilanActions.fetchNoteGlobaleSousCategories());
        await dispatch(bilanActions.fetchNoteEvaluations());
        await dispatch(bilanActions.fetchNoteGlobaleEvaluations());
        setIsLoading(false);
    }, [dispatch]);

    useEffect(() => {
        notesHandler();
    }, [notesHandler, dispatch]);


    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator
                    size='large'
                    color={Colors.primary}
                />
            </View>
        );
    }

    return (
        <View style={styles.chartContainer}>
            <View style={styles.chartCaption}>
                <Text style={styles.chartText}>Graphique comparatif</Text>

                <View style={styles.label1Container}>
                    <View style={styles.label1}></View>
                    <Text>Résultats de mon elevage</Text>
                </View>
                <View style={styles.label2Container}>
                    <View style={styles.label2}></View>
                    <Text>Moyenne des eleveurs</Text>
                </View>
            </View>
            <RadarChart />
            <Button title='Plus de détails' onPress={() => { props.navigation.navigate('BilanCategorieScreen') }} />
        </View>
    );
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Bilan',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        alignItems: 'center'
    },
    chartText: {
        fontFamily: 'open-sans-bold',
        marginVertical: 20
    },
    label1: {
        width: 20,
        height: 15,
        backgroundColor: '#2E9BCA',
        marginRight: 10
    },
    label2: {
        width: 20,
        height: 15,
        backgroundColor: '#FF6666',
        marginRight: 10
    },
    chartCaption: {
        flex: 1,
        marginVertical: 20,
    },
    label1Container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    label2Container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default BilanScreen;