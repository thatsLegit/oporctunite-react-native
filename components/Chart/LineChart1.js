import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { VictoryContainer, VictoryChart, VictoryGroup, VictoryAxis, VictoryBar, VictoryLine, VictoryLabel,VictoryScatter} from "victory-native";
import { useSelector } from 'react-redux';
import Svg from "react-native-svg";

const LineChart1 = props => {

    let dateTests = [];
    let noteTests = [];

    let i=1;
    useSelector(state => Object.entries(state.bilan.noteEvaluations)).map(([key, values]) => {
             
        if ((Object.keys(values)=="Etat corporel") && (i<=6)){
            console.log("Test : "+i);
            console.log("L'idTest: "+key);
            i++;      
            for (const [key, value] of Object.entries(Object.values(values))) {
                console.log("dateT: "+formatDate(Object.keys(value)));
                console.log("valeur: "+Object.values(value));
                dateTests.push(formatDate(Object.keys(value)));
                noteTests.push(Object.values(value));
            }
            console.log("\n"); 
        } 
            
    })

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month].join('-');
    }

    var data=[];
    switch (dateTests.length) {
        case 1:
            data=[
                { x: dateTests[0], y: noteTests[0] },
            ]
            
            break;
        case 2:
            data=[
                { x: dateTests[0], y: noteTests[0] },
                { x: dateTests[1], y: noteTests[1] }
            ]
            break;
        case 3:
            data=[
                { x: dateTests[0], y: noteTests[0] },
                { x: dateTests[1], y: noteTests[1] },
                { x: dateTests[2], y: noteTests[2] },
            ]
            break;
        case 4:
            data=[
                { x: dateTests[0], y: noteTests[0] },
                { x: dateTests[1], y: noteTests[1] },
                { x: dateTests[2], y: noteTests[2] },
                { x: dateTests[3], y: noteTests[3] },
            ]
            break;
        case 5:
            data=[
                { x: dateTests[0], y: noteTests[0] },
                { x: dateTests[1], y: noteTests[1] },
                { x: dateTests[2], y: noteTests[2] },
                { x: dateTests[3], y: noteTests[3] },
                { x: dateTests[4], y: noteTests[4] },
            ]
            break;
        case 6:
            data=[
                { x: dateTests[0], y: noteTests[0] },
                { x: dateTests[1], y: noteTests[1] },
                { x: dateTests[2], y: noteTests[2] },
                { x: dateTests[3], y: noteTests[3] },
                { x: dateTests[4], y: noteTests[4] },
                { x: dateTests[5], y: noteTests[5] },
            ]
            break;
        default:
            break;
    }

    return (
        <View style={styles.container}>


                <VictoryChart 
                    domainPadding={25}
              
                    containerComponent={<VictoryContainer disableContainerEvents />}

                >
                    <VictoryAxis
                        style={{
                            axis: { 
                                stroke: "grey",
                                 opacity: 0.5  
                            },
                            grid: { stroke: "grey", opacity: 0.3 
                            },
                            tickLabels:{
                                fill: "black", 
                                fillOpacity:0.7,
                            }
                        }}
                    />
                    <VictoryAxis
                        dependentAxis              
                        style={{
                             axis: { 
                                 stroke: "grey", 
                                 opacity: 0.5
                            },
                            tickLabels:{
                                fill: "black", 
                                fillOpacity:0.7,
                            }
                     
                        }}				
                    />

                    <VictoryScatter data={data}
                        size={5}
                        style={{ data: { fill: "#2E9BCA" } }}
                        labels={({ datum }) => datum.y}
                    />
                </VictoryChart>
                <View style={styles.titreContainer}>
                    <Text style={styles.titre}>Etat corporel</Text>
                </View>
                
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 10,
      justifyContent: 'center',
    },
    titreContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    titre: {
        width: 100,
        fontSize:15,
    },

  });

export default LineChart1