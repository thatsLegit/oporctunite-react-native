import React from 'react';
import { View, StyleSheet} from 'react-native';
import { VictoryContainer, VictoryChart, VictoryGroup, VictoryAxis, VictoryBar, VictoryLine, VictoryLabel} from "victory-native";
import { useSelector } from 'react-redux';
import Svg from "react-native-svg";

const LineChart1 = props => {

    
  

    let dateTests = [];
    let noteTests = [];

    let i=0;
    useSelector(state => Object.entries(state.bilan.noteEvaluations)).map(([key, value]) => {
        
        if ((key=="Etat corporel") && (i<=6)){
            i++;
            dateTests.push(formatDate(Object.values(value)));
            noteTests.push(Object.keys(value));
        }      
    })

    console.log(dateTests[0]);
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

  
    const data = [
        { x: 0, y: 0},
        { x: dateTests[0], y: noteTests[0] },
        { x: dateTests[0], y: noteTests[0] },
        { x: dateTests[1], y: noteTests[1] },
        
    ];


    return (
        <View style={styles.container}>

            <Svg width={400} height={400} viewBox="0 0 400 400"
                     style={{width: "100%", height: "auto"}}>
                <VictoryChart 
                    padding={{ top: 50, bottom: 70, left: 55, right: 22 }}
                    containerComponent={<VictoryContainer disableContainerEvents />}

                >
                    <VictoryLine
                    data={data}
                    labels={({ datum }) => datum.y}
                    labelComponent={<VictoryLabel renderInPortal={false} dy={-20}/>}
                    />
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

export default LineChart1