import React from 'react';
import { View, Text, StyleSheet, Button, Platform, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import LineChart1 from '../../../components/Chart/LineChart1';
import HeaderButton from '../../../components/UI/HeaderButton';
import Colors from '../../../constants/Colors';


const BilanEvaluation1Screen = props => {
    return (
        <View style={styles.chartContainer}>
            <TouchableOpacity style={styles.button} onPress={() => { props.navigation.goBack() }}>
                <Text style={styles.buttonText}>Retour catégorie</Text>
            </TouchableOpacity>
            
            <View style={styles.chartCaption}>
                <View style={styles.label1Container}>
                    <View style={styles.label1}></View>
                    <Text>6 derniers résultats de l'évaluation</Text>
                </View>
            </View>
            
            <LineChart1 />
        </View>
    );
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Bilan catégorie',
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
    button: {
        width: "47%",
        height: 40,
        backgroundColor: Colors.accent,
        borderRadius: 10,
        alignItems: "center",
        borderRadius: 10,
        marginRight:"40%",
        marginTop:10

        
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        padding: 7,
        fontFamily: 'open-sans-bold'
    },
    chartContainer: {
        flex: 1,
        alignItems: 'center',
    },
    chartContainer: {
        flex: 1,
        alignItems: 'center',

    },
    label1: {
        width: 10,
        height: 10,
        backgroundColor: '#2E9BCA',
        marginRight: 10,
        borderRadius:100
    },
    label2: {
        width: 20,
        height: 15,
        backgroundColor: '#FF6666',
        marginRight: 10,
        borderRadius:50

    },
    chartCaption: {
        flex:1,
        marginTop:100
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


export default BilanEvaluation1Screen;