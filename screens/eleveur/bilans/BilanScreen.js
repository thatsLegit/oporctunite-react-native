import React from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import RadarChart from '../../../components/Chart/RadarChart';
import HeaderButton from '../../../components/UI/HeaderButton';


const BilanScreen = props => {
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
            <Button title='Comprendre mon bilan' onPress={() => { props.navigation.navigate('Information') }} />
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
        alignItems: 'center',

    },
    chartText: {
        fontFamily: 'open-sans-bold',
        marginVertical: 20
    },
    label1: {
        width: 20,
        height: 15,
        backgroundColor: '#0074D9',
        marginRight: 10
    },
    label2: {
        width: 20,
        height: 15,
        backgroundColor: '#FF4136',
        marginRight: 10
    },
    chartCaption: {
        flex:1,
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
    }
});


export default BilanScreen;