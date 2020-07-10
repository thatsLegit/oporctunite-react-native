import React from 'react';
import { View, StyleSheet} from 'react-native';
import { VictoryContainer, VictoryChart, VictoryGroup, VictoryAxis, VictoryBar} from "victory-native";
import { useSelector } from 'react-redux';
import Svg from "react-native-svg";
import { lineBreaker } from '../../helper/LineBreaker';

const BarChartEvaluations1 = props => {

    let moyenneEval1 = 0;
    let moyenneEval2 = 0;

    let nbTests1=1;
    let nbTests2=1;

    useSelector(state => Object.entries(state.bilan.noteEvaluations)).map(([key, values]) => {
             
        if (Object.keys(values)=="Stéréotypies"){
                
            for (const [key, value] of Object.entries(Object.values(values))) {
                moyenneEval1 += parseFloat(Object.values(value));
                nbTests1++;
            }
        } 
        else if (Object.keys(values)=="Exploration individuelle"){
  
            for (const [key, value] of Object.entries(Object.values(values))) {
                moyenneEval2 += parseFloat(Object.values(value));
                nbTests2++;
            }
        }
            
    })

    let moyenneGlobaleEval1 = 0;
    let moyenneGlobaleEval2 = 0;

    useSelector(state => Object.entries(state.bilan.noteGlobaleEvaluations)).map(([key, value]) => {           
        if (key=="Stéréotypies"){
            moyenneGlobaleEval1=value;
        } 
        else if (key=="Exploration individuelle"){
            moyenneGlobaleEval2=value;
        }          
    })
 
    const dataEleveur = [
        { x: "Stéréotypies", y: (moyenneEval1/nbTests1) },
        { x: lineBreaker("Exploration individuelle"), y: (moyenneEval2/nbTests2) }
    ];

    const dataGlobale = [
        { x: "Stéréotypies", y: moyenneGlobaleEval1 },
         { x: lineBreaker("Exploration individuelle"), y:  moyenneGlobaleEval2 }
    ];

    return (
        <View style={styles.container}>

            <Svg width={400} height={400} viewBox="0 0 400 400"
                     style={{width: "100%", height: "auto"}}>
                <VictoryChart 
                    padding={{ top: 50, bottom: 70, left: 55, right: 22 }}
                    containerComponent={<VictoryContainer disableContainerEvents />}

                >
                <VictoryAxis
                    style={{
                        tickLabels: {
                            fontSize: 12,
                        }
                    }}
                />
                <VictoryAxis
                    dependentAxis              
                    style={{ tickLabels: { fontSize: 12 } }}
                />
                <VictoryGroup offset={24}
                    colorScale={"qualitative"}              
                >
                
                    <VictoryBar
                        style={{ data: { fill: "#2E9BCA" } }}
                        data={dataEleveur}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPressOut: (event, data) => {
                                    (data.key=="chart-group-2-bar-0-data-0")?props.navigation.navigate('BilanEvaluation2Screen'):alert("Pas de graphique disponible pour les évaluations de cette sous-catégorie.");
                                },
                            }
                        }]}
                    />
                    
                    <VictoryBar
                        style={{ data: { fill: "#FF6666" } }}
                        data={dataGlobale}
                    />
                
                </VictoryGroup>
                </VictoryChart>
            </Svg>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        justifyContent: 'center',
    }
});

export default BarChartEvaluations1