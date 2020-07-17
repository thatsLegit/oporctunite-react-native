import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { VictoryChart, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel } from "victory-native";
import { useSelector } from 'react-redux';
import { lineBreaker } from '../../helper/LineBreaker';

const RadarChart = props => {

    let titreGlobaleCateg = [];
    let moyenneGlobaleCateg = [];
    useSelector(state => Object.entries(state.bilan.noteGlobaleCateg)).map(([key, value]) => {
        titreGlobaleCateg.push(key);
        moyenneGlobaleCateg.push(value);
    })

    let bilanEleveurCateg = [];
    let bilanEleveurTitreCateg = [];
    useSelector(state => Object.entries(state.bilan.noteCateg)).map(([key, value]) => {
        bilanEleveurTitreCateg.push(key);
        bilanEleveurCateg.push(value);
    })

    // Tableau avec les notes arranger pour les catégories afin d'avoir un bonne ordre et toujours avoir une valeur
    let tableauNoteCategArranger = [];


    titreGlobaleCateg.forEach(globalTitre => {

        let i = 0;

        while (i < titreGlobaleCateg.length) {
            if (globalTitre == bilanEleveurTitreCateg[i]) {
                tableauNoteCategArranger.push(bilanEleveurCateg[i]);
            }
            else if (bilanEleveurTitreCateg.indexOf(globalTitre) == -1) {
                tableauNoteCategArranger.push(0);
                i = titreGlobaleCateg.length; //  Pour sortie de la boucle et pas ajouter trop de 0
            }
            i++;
        }

        i = 0;
    });

    const UserData = [
        // Ligne 1 = élevage en cours
        { [lineBreaker(titreGlobaleCateg[0])]: tableauNoteCategArranger[0], [titreGlobaleCateg[1]]: tableauNoteCategArranger[1], [titreGlobaleCateg[3]]: tableauNoteCategArranger[2], [titreGlobaleCateg[2]]: tableauNoteCategArranger[3] },
        { [lineBreaker(titreGlobaleCateg[0])]: moyenneGlobaleCateg[0], [titreGlobaleCateg[1]]: moyenneGlobaleCateg[1], [titreGlobaleCateg[3]]: moyenneGlobaleCateg[2], [titreGlobaleCateg[2]]: moyenneGlobaleCateg[3] }
    ];

    const getMaxima = (data) => {
        const groupedData = Object.keys(data[0]).reduce((memo, key) => {
            memo[key] = data.map((d) => d[key]);
            return memo;
        }, {});
        return Object.keys(groupedData).reduce((memo, key) => {
            memo[key] = 10;
            return memo;
        }, {});
    }

    const processData = (data) => {
        const maxByGroup = getMaxima(data);

        const makeDataArray = (d) => {
            return Object.keys(d).map((key) => {
                return { x: key, y: d[key] / maxByGroup[key] };
            });
        };

        return data.map((datum) => makeDataArray(datum));
    }

    const data = processData(UserData);
    const maxima = getMaxima(UserData);

    const windowWidth = useWindowDimensions().width;
    return (
        <View style={styles.container}>
            <VictoryChart
                polar
                //theme={VictoryTheme.material}
                domain={{ y: [0, 1] }}
                height={windowWidth}
                width={windowWidth}


            >
                <VictoryGroup
                    colorScale={["#2E9BCA", "#FF6666"]}
                    style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
                >
                    {data.map((data, i) => {
                        return <VictoryArea key={i} data={data} />;
                    })}
                </VictoryGroup>
                {
                    Object.keys(maxima).map((key, i) => {
                        return (
                            <VictoryPolarAxis
                                height={325}
                                width={325}
                                key={i}
                                dependentAxis
                                style={{
                                    axisLabel: { padding: 25 },
                                    axis: { stroke: "none"},
                                    grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.7 }
                                }}
                                tickLabelComponent={
                                    <VictoryLabel  />
                                }
                                labelPlacement="vertical"
                                axisValue={i + 1} label={key}
                                tickFormat={(t) => Math.ceil(t * maxima[key])}
                                tickValues={[0.25, 0.5, 0.75]}
                            />
                        );
                    })
                }
                <VictoryPolarAxis
                    //Axe y
                    labelPlacement="parallel"
                    tickFormat={() => ""}
                    style={{
                        axis: { stroke: "grey", opacity: 0.5  },
                        grid: { stroke: "grey", opacity: 0.5 }
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

export default RadarChart;