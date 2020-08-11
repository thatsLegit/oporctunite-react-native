import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Colors from '../../../constants/Colors';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';
import { EvilIcons } from '@expo/vector-icons';
const BilanCategorieScreen = props => {

    const [modalEchantillonVisible, setModalEchantillonVisible] = useState(false);
    const modalEchantillonCloser = () => setModalEchantillonVisible(false);
    return (
        <View style={style.chartContainer}  >
            
            {props.retourCategorie==true
                ? 
                <TouchableOpacity style={style.button} onPress={() => {  props.navigation.navigate("BilanCategorie3Screen") }}>
                    <Text style={style.buttonText}>Retour catégorie</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={style.button} onPress={() => { props.navigation.navigate('Bilan') }}>
                    <Text style={style.buttonText}>Retour catégories</Text>
                </TouchableOpacity>
            }

            <View style={style.chartCaption}>
                
                <View style={style.label1Container}>
                    <View style={style.label1}></View>
                    <Text>Résultats de mon elevage</Text>
                    <TouchableWithoutFeedback onPress={() => {
                    setModalEchantillonVisible(true);
                }}>
                    <EvilIcons name="question" size={30} color="black" />
                </TouchableWithoutFeedback>
                </View>
                <View style={style.label2Container}>
                    <View style={style.label2}></View>
                    <Text>Moyenne des eleveurs</Text>
                </View>
            </View>
            {props.chart}
            <ModalPopupInfo
                visible={modalEchantillonVisible}
                onClose={modalEchantillonCloser}
                text="Cliquer sur la barre bleue d'une sous catégorie ou évaluation pour voir plus de détails."
                buttonText='Fermer'
            />
        </View>
    );
};

const style = StyleSheet.create({
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

export default BilanCategorieScreen;