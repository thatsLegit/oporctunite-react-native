import React from 'react';
import { View, StyleSheet} from 'react-native';
import { VictoryContainer, VictoryChart, VictoryGroup, VictoryAxis, VictoryLabel, VictoryBar} from "victory-native";
import { useSelector } from 'react-redux';
import Svg from "react-native-svg";
import { lineBreaker } from '../../helper/LineBreaker';

const BarChart4 = props => {

    let titreGlobaleSousCateg = [];
    let moyenneGlobaleSousCateg = [];

    useSelector(state => Object.entries(state.bilan.noteGlobaleSousCateg)).map(([key, value]) => {

        if (Object.values(value) == "Santé") {

            titreGlobaleSousCateg.push(key);
            moyenneGlobaleSousCateg.push(Object.keys(value));
        }
    })

    function lineBreak(phrase) {
        var phraseRetour = "";
        const mots = phrase.split(' ');
        let nbMots = mots.length;
        let indexMot = 0;

        while (nbMots > indexMot) {
            if ((mots[indexMot + 1] != undefined) && ((mots[indexMot].length + mots[indexMot + 1].length) <= 15)) {
                phraseRetour += mots[indexMot] + " " + mots[indexMot + 1] + "\n";
                indexMot = indexMot + 2;
            }
            else {
                phraseRetour += mots[indexMot] + "\n";
                indexMot++;
            }
        }

        return phraseRetour;
    }

    let bilanEleveurSousCateg = [];
    let bilanEleveurTitreSousCateg = [];

    useSelector(state => Object.entries(state.bilan.noteSousCateg)).map(([key, value]) => {
        if (Object.values(value) == "Santé") {
            bilanEleveurTitreSousCateg.push(key);
            bilanEleveurSousCateg.push(Object.keys(value));
        }
    })

    // Tableau avec les notes arranger pour les catégories afin d'avoir un bonne ordre et toujours avoir une valeur
    let tableauNoteSousCategArranger = [];


    titreGlobaleSousCateg.forEach(globalTitre => {

        let i = 0;

        while (i < titreGlobaleSousCateg.length) {
            if (globalTitre == bilanEleveurTitreSousCateg[i]) {
                tableauNoteSousCategArranger.push(bilanEleveurSousCateg[i]);
            }
            else if (bilanEleveurTitreSousCateg.indexOf(globalTitre) == -1) {
                tableauNoteSousCategArranger.push(0);
                i = titreGlobaleSousCateg.length; //  Pour sortie de la boucle et pas ajouter quatre 0

            }
            i++;
        }

        i = 0;
    });

    const dataEleveur = [
        { x: lineBreak(titreGlobaleSousCateg[0]), y: tableauNoteSousCategArranger[0] },
        { x: lineBreak(titreGlobaleSousCateg[1]), y: tableauNoteSousCategArranger[1] },
        { x: lineBreak(titreGlobaleSousCateg[2]), y: tableauNoteSousCategArranger[2] }
    ];

    const dataGlobale = [
        { x: lineBreak(titreGlobaleSousCateg[0]), y: moyenneGlobaleSousCateg[0] },
        { x: lineBreak(titreGlobaleSousCateg[1]), y: moyenneGlobaleSousCateg[1] },
        { x: lineBreak(titreGlobaleSousCateg[2]), y: moyenneGlobaleSousCateg[2] }
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
                            fontSize: 12
                        }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    style={{ tickLabels: { fontSize: 12 } }}
                />
                <VictoryGroup offset={18}>
                    <VictoryBar
                        style={{ data: { fill: "#2E9BCA" } }}
                        data={dataEleveur}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPressOut: (event, data) => {
                                    (data.key == "chart-group-2-bar-0-data-0")?alert("Redirection "+data.key):alert("Pas dispo "+data.key);
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

export default BarChart4