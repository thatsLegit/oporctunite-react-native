import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector} from 'react-redux';
import Counter from '../../Counter/Counter'



const Test1 = props => {


    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.titre1}>
                    Truies:
                </Text>
                <Text>
                Une pression ferme avec la paume de la main permet de sentir les reliefs osseux:
                </Text>
                <Counter/>
                <View style={styles.itemSeparator} />
                <Text>
                Les reliefs osseux de la hanche et du dos sont facilement sentis sans aucune pres:
                </Text>
                <Counter/>
                <View style={styles.itemSeparator} />
                <Text>
                Ma truie semble très mince visuellement avec des hanche et un dos très proémin:
                </Text>
                <Counter/>
                
            </View>            
        </View>
    );
};

export const screenOptions = (navData) => {
    return {
        headerLeft: null
    };
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:10,
        alignItems:"center",
    },
    itemSeparator: {
        marginTop:30
    }   
});


export default Test1;