import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector} from 'react-redux';
import Counter from '../../../../components/Counter/Counter'



const TestScreen = props => {
    const selectedCat = useSelector(state => Object.values(state.categ.categSelection).map(categ => categ.nomCateg));
    console.log(selectedCat);
    
    //const selectedCat = useSelector(state => Object.values(state.categ.categSelection).map(categ => categ.nomCateg));
    const selectedSousCat = useSelector(state => Object.values(state.sousCateg.sousCategSelection).map(sousCat => sousCat.nomSousCateg));
    //console.log(selectedSousCat);

/*     const categoriesData = useSelector(state => Object.values(state.categ.categories).map(categ => categ.nomCateg));
    console.log("categoriesData");
    console.log(categoriesData); */

    const selectedEvaluations = useSelector(state => Object.values(state.eval.evalSelection).map(e => e.nomEvaluation));

    return (
        <View style={styles.container}>
            
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={() => { props.navigation.navigate('CategSelection') }}
                >
                    <Text style={styles.footerText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={() => { props.navigation.navigate('Test2') }}
                >
                    <Text style={styles.footerText}>Confirmer</Text>
                </TouchableOpacity>
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
    },
    header:{
        flex:2,
        marginTop:10,
        alignItems:"center",
    },
    titre1:{
        fontSize:20,
        fontWeight:"bold"
    },
    titre2:{
        fontSize:18,
    },
    titre3:{
        fontSize:16,
    },
    contentContainer:{
        flex:10,
        marginLeft:10,
        marginRight:10,
    },
    innerContainer:{
        marginTop:10,
        alignItems:"center",
    },
    itemSeparator: {

        marginTop:30

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


export default TestScreen;