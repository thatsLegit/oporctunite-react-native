import React from 'react';
import { View, StyleSheet} from 'react-native';
import { VictoryContainer, VictoryChart, VictoryGroup, VictoryAxis, VictoryBar, VictoryLine, VictoryLabel} from "victory-native";
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
    console.log(data);

    return (
        <View style={styles.container}>

         
                <VictoryChart 
                    domainPadding={25}
              
                    containerComponent={<VictoryContainer disableContainerEvents />}

                >
                    <VictoryLine
                    data={data}
                    labels={({ datum }) => datum.y}
                    style={{
                        data: {
                          stroke: "#A8A8A8" ,
                          strokeWidth: 1
                        },
                        labels: {
                          fontSize: 15,
                          fill: "#300000"
                        }
                    }}
                  
                    />
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

export default LineChart1