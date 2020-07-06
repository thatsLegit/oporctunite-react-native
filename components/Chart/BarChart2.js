import React from 'react';
import { View, StyleSheet} from 'react-native';
import { VictoryTheme, VictoryChart, VictoryGroup, VictoryArea, VictoryAxis, VictoryLabel, VictoryBar, VictoryStack } from "victory-native";
import { useSelector } from 'react-redux';

const BarChart2 = props => {

    let titreGlobaleSousCateg = [];
    let moyenneGlobaleSousCateg = [];

    useSelector(state => Object.entries(state.bilan.noteGlobaleSousCateg)).map(([key, value]) => {

        if (Object.values(value)=="Environnement approprié"){

            titreGlobaleSousCateg.push(key);
            moyenneGlobaleSousCateg.push(Object.keys(value));
        }      
    })


    let bilanEleveurSousCateg = [];
    let bilanEleveurTitreSousCateg = [];

    useSelector(state => Object.entries(state.bilan.noteSousCateg)).map(([key, value]) => {
        if (Object.values(value)=="Environnement approprié"){

            bilanEleveurTitreSousCateg.push(key);
            bilanEleveurSousCateg.push(Object.keys(value));
        }     
    })
 
    // Tableau avec les notes arranger pour les catégories afin d'avoir un bonne ordre et toujours avoir une valeur
    let tableauNoteSousCategArranger = [];
    

    titreGlobaleSousCateg.forEach(globalTitre => {
  
        let i = 0;

        while (i<titreGlobaleSousCateg.length) {
            if(globalTitre == bilanEleveurTitreSousCateg[i]){
                tableauNoteSousCategArranger.push(bilanEleveurSousCateg[i]);
            }
            else if (bilanEleveurTitreSousCateg.indexOf(globalTitre)== -1){
                tableauNoteSousCategArranger.push(0);
                i=titreGlobaleSousCateg.length; //  Pour sortie de la boucle et pas ajouter quatre 0
                
            }
            i++;
        }
        
        i=0;
    }); 


    return (
        <View style={styles.container}>
            <VictoryChart >
                <VictoryAxis
                    style={{
                        tickLabels: {
                            fontSize: 12
                        }
                    }}
                />
                <VictoryAxis
                    dependentAxis        
                    style={{ tickLabels: { fontSize: 12 } }}
                />
                <VictoryGroup offset={16}
                    colorScale={"qualitative"}
                >                  
                    <VictoryBar
                    style={{ data: { fill: "#2E9BCA" } }}
                    data={[{ x: "Confort autour \n du repos", y: tableauNoteSousCategArranger[0] }, { x: "Facilité de\n déplacement", y: tableauNoteSousCategArranger[1] }, {  x: "Confort\n thermique", y: tableauNoteSousCategArranger[2]}]}
                    />
                    <VictoryBar
                    style={{ data: { fill: "#FF6666" } }}
                    data={[{ x: "Confort autour \n du repos", y: moyenneGlobaleSousCateg[0] }, { x: "Facilité de\n déplacement", y:  moyenneGlobaleSousCateg[1] }, {x: "Confort\n thermique", y: moyenneGlobaleSousCateg[2]}]}
                    />

                </VictoryGroup>
            </VictoryChart>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 20,
      justifyContent: 'center',
    }
  });

export default BarChart2