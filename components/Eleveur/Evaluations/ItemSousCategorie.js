import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CheckBox } from "native-base"
import Colors from '../../../constants/Colors';

const ItemSousCategorie = props => {

    const { choixInitial } = props;
    const [choix, setChoix] = useState(choixInitial);
    const { data } = props;

    useEffect(() => {
        setChoix(choixInitial);
    }, [choixInitial]);

    const switchChoix = () => {
        setChoix(!choix);
    };

    return (
        <View style={styles.item} >
            <CheckBox
                style={styles.checkBox}
                color={Colors.primary}
                checked={choix}
                onPress={() => switchChoix()}
            />
            <TouchableOpacity style={styles.list}>
                <Text style={styles.lightText}>{data.item.name}</Text>
                <Text style={styles.lightText}>{data.item.email}</Text>
                <Text style={styles.lightText}>{data.item.company.name}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        width: "80%",
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    list: {
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#fff",
        marginLeft: 50
    },
    lightText: {
        fontFamily: 'open-sans'
    }
});


export default ItemSousCategorie;