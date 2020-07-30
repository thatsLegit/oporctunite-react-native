import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { StyleSheet, View, FlatList, Text, Dimensions, TouchableOpacity } from "react-native";
import { CheckBox } from "native-base"

import ItemSousCategorie from './ItemSousCategorie'
import Colors from '../../../constants/Colors';
import Shadow from '../../UI/Shadow';


const ListeSousCategorie = props => {
    const [selectAll, setSelectAll] = useState(false);
    const sousCategorie = props.nomSCateg.toString();
    const categoriesData = useSelector(state => Object.values(state.categ.categories[sousCategorie]));

    return (
        <View style={styles.superContainer}>
            <Shadow style={styles.listContainer}>
                <View style={styles.checkBoxAll}>
                    <CheckBox style={styles.checkBox} checked={selectAll} color={Colors.accent} onPress={() => setSelectAll(!selectAll)} />
                    <TouchableOpacity onPress={() => setSelectAll(!selectAll)}>
                        <Text style={styles.selectionText}>Tout selectionner</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={categoriesData}
                    ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                    renderItem={itemData => <ItemSousCategorie data={itemData.item} selectAll={selectAll} />}
                    keyExtractor={item => item.nomSousCateg}
                />
            </Shadow>
        </View>
    );
};

const styles = StyleSheet.create({
    superContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50
    },
    listContainer: {
        flex: 1,
        width: (Dimensions.get('window').width / 4) * 3,
        backgroundColor: "#fff",
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        borderRadius: 10,
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