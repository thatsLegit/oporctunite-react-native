import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Test1 from '../../../../components/Eleveur/Tests/Test1'
import Test2 from '../../../../components/Eleveur/Tests/Test2'
import { useDispatch, useSelector } from 'react-redux';
import * as evalActions from '../../../../store/actions/evaluation';


const TestScreen = props => {

    //const dispatch = useDispatch();
    //dispatch(evalActions.fetchEvaluations());

    const [indexEvaluation=0, setIndexEvaluation] = useState(0);
    console.log("indexEvaluation: "+indexEvaluation);
    const selectedEvaluations = useSelector(state => Object.keys(state.eval.evalSelection));
    console.log(selectedEvaluations);

    const selectedEvaluation = selectedEvaluations[indexEvaluation];
    const [evaluationCourante=selectedEvaluation]=useState();

    const [finEval=((indexEvaluation+1)>=(selectedEvaluations.length)), setFinEval]=useState();
    console.log("finEval: "+finEval);

    //const selectedCat = useSelector(state => Object.values(state.categ.categSelection).map(categ => categ.nomCateg));
    
    //console.log(selectedSousCat);

/*     const categoriesData = useSelector(state => Object.values(state.categ.categories).map(categ => categ.nomCateg));
    console.log("categoriesData");
    console.log(categoriesData); */
    

    //const selectedEvaluations = useSelector(state => Object.keys(state.eval.evalSelection));
    //const selectedEvaluation = selectedEvaluations[indexEvaluation];

/*     const selectedSousCats = useSelector(state => Object.keys(state.sousCateg.sousCategories));
    const selectedCats = useSelector(state => Object.keys(state.categ.categories));
    console.log("Les catégories sont: "+selectedCats); */

/*     const selectedSousCategories = useSelector(state => Object.values(state.sousCateg.sousCategories.evaluation));
    const findit = selectedSousCategories.find(el => el=selectedEvaluation);
    console.log("findit : "+findit);
    console.log("findit : "+findit);

    const selectedSousCategorie = selectedSousCategories[selectedEvaluation];
    console.log("selectedSousCategories "+selectedSousCategories);
    console.log("selectedSousCategories "+selectedSousCategorie);


    function findSousCategByEvaluation(name) {

        for (const item of selectedSousCats) {

            let evaSousCateg = useSelector(state => Object.values(state.sousCateg.sousCategories[item].nomEvaluation));
            console.log("findSousCategByEvaluation name evaluation: "+name);
            console.log("findSousCategByEvaluation evaSousCateg: "+evaSousCateg.join(""));

          if (name === evaSousCateg.join("")) {
            
            console.log("findSousCategByEvaluation la sous categorie correspondante est: "+item);
            return setNomSousCategorieCourante(item);
          }
        }
    } */

   // const selectedCat = useSelector(state => Object.values(state.sousCateg.sousCategories["Absence de faim prolongée"].nomCategorieP));

   /* function findCategBySousCategorie() {

    console.log("name "+nomSousCategorieCourante);

    for (const item of selectedCats) {
        console.log("item "+item);
        let dataCats = useSelector(state => Object.values(state.categ.categories[item]));
        console.log("dataCats "+dataCats);
        console.log("dataCats "+dataCats.nomCateg);
        console.log("dataCats "+dataCats.evaluation);
      if (nomSousCategorieCourante === dataCats.join("")) {

        return (
            <Text style={styles.titre1}>
                 {item}   
            </Text>
        );
      }
    }
    } */
/*     function NomCategorieBySousCategorie() {
        
        let sousCat = findSousCategByEvaluation(selectedEvaluation);
        console.log("sousCat : "+sousCat);
        //let selectedCat = useSelector(state => Object.values(state.categ.categories.nomCateg));
        const categoriesData = useSelector(state => Object.values(state.categ.categories[sousCat]));
        console.log("sousCat gg : "+categoriesData);
        //console.log("sousCat ggg : "+selectedCat.sousCateg);
        //console.log("sousCat gggg : "+selectedCat.nomCateg);
        return selectedCat;
    } */

    
    //console.log("selectedCat "+selectedCat.join(""));
    //console.log("selectedCat."+selectedCat.);

    
    

   // const selectedEvaluations = useSelector(state => Object.keys(state.eval.evalSelection).map(e => e.nomEvaluation));
    


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
 
            {finEval ? <Test2/> : <Test1/>}

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