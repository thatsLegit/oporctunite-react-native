import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector} from 'react-redux';
import Counter from '../../Counter/Counter'



const Test2 = props => {

    return (
        <View style={styles.container}>
            <Text style={styles.titre1}>
            Truies:
            </Text>
            
            <Text>
            L'abreuvoir est adéquate:
            </Text>
            <Counter/>
            <View style={styles.itemSeparator} />
            <Text>
            L'abreuvoir n'est pas adéquate:
            </Text>
            <Counter/>
            
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


export default Test2;