import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LineChart1 from '../../../components/Chart/LineChart1';
import Colors from '../../../constants/Colors';


const BilanEvaluation1Screen = props => {
    return (
        <View style={styles.chartContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {  props.navigation.navigate("BilanCategorie1Screen") }}>
                <Text style={styles.buttonText}>Retour catégorie</Text>
            </TouchableOpacity>
            
            <View style={styles.chartCaption}>
                <View style={styles.label1Container}>
                    <View style={styles.label1}></View>
                    <Text>6 derniers résultats de l'évaluation</Text>
                </View>
            </View>
            <LineChart1/>
        </View>
    );
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
    label1: {
        width: 10,
        height: 10,
        backgroundColor: '#2E9BCA',
        marginRight: 10,
        borderRadius:100
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
});


export default BilanEvaluation1Screen;