import React, { useState, useEffect  } from "react";
import { StyleSheet,View,FlatList,Text,TouchableOpacity} from "react-native";
import ItemSousCategorie from '../ItemListe/ItemSousCategorie'
import {CheckBox, Right} from "native-base"
import Colors from '../../constants/Colors';

const ListeSousCategorie = props =>  {

    const [dataSource, setdataSource] = useState();

    useEffect( () => {
        
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then((responseJson)=> {
            setdataSource(responseJson)      
        })
        
      }, []);
    
    const FlatListItemSeparator = () => {
        return (
            <View style={{
                height: .5,
                width:"100%",
                backgroundColor:"rgba(0,0,0,0.5)",
            }}
            />
        );
    }
    const renderItem=(data)=>(

        <ItemSousCategorie
        data={data}
        />
    )

    


    return(
        <View style={styles.container}>

            <View style={styles.innerContainer}>
                <View style={styles.checkBoxAll}>
                    <CheckBox style={styles.checkBox} checked="false" color={Colors.accent}/>
                    <Text>Tout selectionner</Text>   
                </View>
                
                <TouchableOpacity style={styles.submit}>
                    <Text style={{color:"white"}}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
            
            
            <FlatList
                data= {dataSource}
                ItemSeparatorComponent = {FlatListItemSeparator}
                renderItem= {item=> renderItem(item)}
                keyExtractor= {item=>item.id.toString()}
            />

        </View>
    )
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    list:{
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#fff"
    },
    innerContainer:{
        
        flexDirection:"row",
        marginTop:10, 
        justifyContent: "space-between"     
    },
    checkBoxAll:{
        flexDirection:"row",
        left:5,
        padding:5,
    }, 
    checkBox:{
        marginRight:15,
    }, 
    submit:{
        width:"40%",
        backgroundColor:Colors.accent,
        borderRadius:10,
        padding:5,
        alignItems:"center",
        right:5
    }
});


export default ListeSousCategorie;