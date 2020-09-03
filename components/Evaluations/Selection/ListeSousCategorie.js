import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { CheckBox } from "native-base"

import ItemSousCategorie from './ItemSousCategorie'
import Colors from '../../../constants/Colors';
import Table from '../../UI/Table';


const ListeSousCategorie = props => {
    const [selectAll, setSelectAll] = useState(false);
    const sousCategorie = props.nomSCateg.toString();
    const categoriesData = useSelector(state => Object.values(state.categ.categories[sousCategorie]));

    return (
        <Table style={{ flex: 1 }}>
            <View style={styles.checkBoxAll}>
                <CheckBox style={{ marginRight: 15 }} checked={selectAll} color={Colors.accent} onPress={() => setSelectAll(!selectAll)} />
                <TouchableOpacity onPress={() => setSelectAll(!selectAll)}>
                    <Text style={styles.selectionText}>Tout sélectionner</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={categoriesData}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                renderItem={itemData => <ItemSousCategorie data={itemData.item} selectAll={selectAll} />}
                keyExtractor={item => item.nomSousCateg}
            />
        </Table>
    );
};

const styles = StyleSheet.create({
    checkBoxAll: {
        flexDirection: "row",
        left: 5,
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: "rgba(211,211,211,0.5)"
    },
    itemSeparator: {
        height: StyleSheet.hairlineWidth,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    selectionText: {
        fontFamily: 'open-sans',
        marginBottom: 5
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default ListeSousCategorie;