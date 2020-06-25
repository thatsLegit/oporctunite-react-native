import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';


const EvalInfoScreen = props => {
    const selectedEvaluations = useSelector(state => Object.values(state.eval.evalSelection).map(e => e.nomEvaluation));

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titre1}>
                    Evaluations séléctionnées
                </Text>
            </View>   
            <View style={styles.contentContainer}>    
                <FlatList
                    data={selectedEvaluations}
                    renderItem={({item}) => 
                    
                    <Text style={styles.item}>{item}</Text>}
                />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                        style={styles.footerBtn}
                        onPress={() => { props.navigation.goBack()}}
                    >
                        <Text style={styles.footerText}>Retour séléction</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        style={styles.footerBtn}
                        onPress={() => { props.navigation.navigate('Test')}}
                    >
                        <Text style={styles.footerText}>Démarrer le test</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    header:{
        flex:1,
        marginTop:10,
        alignItems:"center",
    },
    titre1:{
        fontSize: 18,
        marginBottom:10,
    },
    item: {
        marginLeft:10,
        fontSize: 16,
    },   
    contentContainer:{
        flex:11,
        marginLeft:10,
        marginRight:10,
    },
    footer:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
    },
    footerBtn:{
        alignItems: "center",
        justifyContent:"center",
        backgroundColor:"#27AAE1",
        color:"#FFF",
        height:"100%",
        width:"50%",
    },
    footerText:{
        fontSize:18,
        color:"#FFF"
    }   
});


export default EvalInfoScreen;