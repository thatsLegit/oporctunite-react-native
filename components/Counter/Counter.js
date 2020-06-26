import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Counter = props => {

    const [count, setCount] = useState(0);

    const plus = () => {
        setCount(count + 1);
        props.onChange(count + 1, 'plus');
    }

    const moins = () => {
        if (count > 0) {
            setCount(count - 1);
            props.onChange(count - 1, 'minus');
        }
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
    result: {
        paddingTop: 5,
        marginLeft: 10,
        marginRight: 10,
    }
});

export default Counter;