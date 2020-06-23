import React, { useState } from 'react';
import {SafeAreaView, View, Text, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Counter = props => {
    
    //useState returns a pair of values. The first one being the current value and the second one is a function that lets you update the current value
    const [count, setCount] = useState(0);

    const plus = () => {     
        setCount(count+1);     
    }
    
    const moins = () =>{
        if(count>0){
            setCount(count-1);
        }
    }
    
    const reset = () =>{
        setCount(0);
    }

    
    return (    
        <SafeAreaView style={Styles.mainContainer}>
            <View style={Styles.rowContainer}>            
                <Icon.Button
                    name="minus"
                    backgroundColor="#27AAE1"
                    onPress={moins}
                    size={20} 
                    paddingRight={0}  
                />
                <Text style={Styles.result}>{count}</Text>
                <Icon.Button
                    name="plus"
                    backgroundColor="#27AAE1"
                    onPress={plus}
                    size={20} 
                    paddingRight={0}        
                />
            </View>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    result:{
      paddingTop:5,
      marginLeft:10,
      marginRight:10,
    }
});

export default Counter