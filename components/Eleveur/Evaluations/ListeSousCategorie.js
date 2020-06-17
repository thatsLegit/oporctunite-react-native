import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, Dimensions } from "react-native";
import ItemSousCategorie from './ItemSousCategorie'
import { CheckBox } from "native-base"
import Colors from '../../../constants/Colors';


const ListeSousCategorie = props => {
    const [dataSource, setdataSource] = useState();
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then((responseJson) => {
                setdataSource(responseJson)
            })
    }, []);

    return (
        <View style={styles.superContainer}>
            <View style={styles.listContainer}>
                <View style={styles.checkBoxAll}>
                    <CheckBox style={styles.checkBox} checked={selectAll} color={Colors.accent} onPress={() => setSelectAll(!selectAll)} />
                    <Text style={styles.selectionText}>Tout selectionner</Text>
                </View >
                <FlatList
                    data={dataSource}
                    ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                    renderItem={item => <ItemSousCategorie data={item} choixInitial={selectAll} />}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    superContainer: {
        alignItems: 'center'
    },
    listContainer: {
        backgroundColor: "#fff",
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        height: (Dimensions.get('window').height / 3) * 2
    },
    checkBoxAll: {
        flexDirection: "row",
        left: 5,
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: "rgba(211,211,211,0.5)"
    },
    checkBox: {
        marginRight: 15,
    },
    itemSeparator: {
        height: .5,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    selectionText: {
        fontFamily: 'open-sans',
        marginBottom: 5
    }
});


export default ListeSousCategorie;