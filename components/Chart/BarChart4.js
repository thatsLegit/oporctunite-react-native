import React from 'react';
import { View, StyleSheet} from 'react-native';
import { VictoryTheme, VictoryChart, VictoryGroup, VictoryArea, VictoryAxis, VictoryLabel, VictoryBar, VictoryStack } from "victory-native";
import { useSelector } from 'react-redux';

const BarChart4 = props => {

    let titreGlobaleSousCateg = [];
    let moyenneGlobaleSousCateg = [];

    useSelector(state => Object.entries(state.bilan.noteGlobaleSousCateg)).map(([key, value]) => {

        if (Object.values(value)=="Santé"){

            titreGlobaleSousCateg.push(key);
            moyenneGlobaleSousCateg.push(Object.keys(value));
        }      
    })


    let bilanEleveurSousCateg = [];
    let bilanEleveurTitreSousCateg = [];

    useSelector(state => Object.entries(state.bilan.noteSousCateg)).map(([key, value]) => {
        if (Object.values(value)=="Santé"){

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
            <VictoryChart
            padding={{ top: 30, bottom: 90, left: 30, right: 30 }}>
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
                <VictoryGroup offset={19}
                   
                >
                    <VictoryBar
                    style={{ data: { fill: "#2E9BCA" } }}
                    data={[{ x: "Absence de\n douleur dues\n aux interventions\n de convenance", y: tableauNoteSousCategArranger[0] }, { x: "Absence de\n maladies", y: tableauNoteSousCategArranger[1] }, {  x: "Absence de\n blessures", y: tableauNoteSousCategArranger[2]}]}
                    />
                    <VictoryBar
                    style={{ data: { fill: "#FF6666" } }}
                    data={[{ x: "Absence de\n douleur dues\n aux interventions\n de convenance", y: moyenneGlobaleSousCateg[0] }, { x: "Absence de\n maladies", y:  moyenneGlobaleSousCateg[1] }, {x: "Absence de\n blessures", y:  moyenneGlobaleSousCateg[2]}]}
                    />

                </VictoryGroup>
            </VictoryChart>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 10,
      justifyContent: 'center',
    }
  });

export default BarChart4