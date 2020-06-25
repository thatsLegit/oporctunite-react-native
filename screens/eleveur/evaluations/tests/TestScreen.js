import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Test1 from '../../../../components/Eleveur/Tests/Test1'
import Test2 from '../../../../components/Eleveur/Tests/Test2'
import {useSelector } from 'react-redux';



const TestScreen = props => {


    const [indexEvaluation=0, setIndexEvaluation] = useState(0);
    console.log("indexEvaluation: "+indexEvaluation);
    const selectedEvaluations = useSelector(state => Object.keys(state.eval.evalSelection));
    console.log(selectedEvaluations);

    const selectedEvaluation = selectedEvaluations[indexEvaluation];
    const [evaluationCourante=selectedEvaluation]=useState();

    const [finEval=((indexEvaluation+1)>=(selectedEvaluations.length)), setFinEval]=useState();
    console.log("finEval: "+finEval);

    const allEvaluations = useSelector(state => Object.values(state.sousCateg.sousCategories).map(eva => eva.nomEvaluation));
    console.log("allEvaluations: "+allEvaluations);

    const [positionEval = allEvaluations.indexOf(evaluationCourante)] = useState();
    console.log(evaluationCourante);
    console.log("positionEval: "+positionEval);
    

    const increment = () =>{

        setIndexEvaluation(indexEvaluation+1);    
    }

    const btnSuivant = () =>{
        //setIndexEvaluation(indexEvaluation+1);
        return(
            <TouchableOpacity
            style={styles.footerBtn}
            onPress={() => { btn()}}
            >
            <Text style={styles.footerText}>Suivant </Text>
            </TouchableOpacity>   
        )          
    }

    const btnValider = () =>{
        //setIndexEvaluation(0);

        return(
            <TouchableOpacity
            style={styles.footerBtn}
            onPress={() => { props.navigation.navigate('TestRecap')}}
            >
                <Text style={styles.footerText}>Valider </Text>
            </TouchableOpacity>   
        )
    }
    const btn = () =>{

        console.log("btn")
        console.log(selectedEvaluations.length+" > "+ (indexEvaluation+1));
        if((selectedEvaluations.length>(indexEvaluation+1))){
            btnSuivant();
            increment();
            console.log("Valeur après increment: "+indexEvaluation);
            //afficherTest();      
            //return "props.navigation.navigate('Test')";        
        }  
        else if (selectedEvaluations.length===(indexEvaluation+1)){
            console.log("btnValider");
            btnValider();
            //setIndexEvaluation(0);   
            setFinEval(true);   
            console.log("Valeur FinEval après setFinEval(true): "+finEval);      
        }
    }
    


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                
                <Text style={styles.titre1}>
                    Catégorie
                </Text>
                <Text style={styles.titre2}>
                    Sous-catégorie
                </Text>
                            
                <Text style={styles.titre3}>
                    {evaluationCourante} ({indexEvaluation+1} / {selectedEvaluations.length})
                </Text>

            </View>
            <View style={styles.contentContainer}>    
 
            {(positionEval===0) ? <Test1/> :null}
            {(positionEval===1) ? <Test2/>: null }


            </View>
            
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={() => { props.navigation.navigate('CategSelection'), setIndexEvaluation(0) }}
                >
                    <Text style={styles.footerText}>Annuler </Text>
                </TouchableOpacity>
                   
                {finEval ? btnValider() : btnSuivant()}

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
        flex:9,
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


export default TestScreen;