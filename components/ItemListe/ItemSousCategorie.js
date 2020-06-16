import React, { useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {CheckBox} from "native-base"
import Colors from '../../constants/Colors';

const ItemSousCategorie = props => {

    const [choix=0, setChoix] = useState();
    const {data} = props;

    const switchChoix = () =>{
        if(choix===1){
            setChoix(0)
        }
        else{
            setChoix(1)
        }
    }
    
    return (
        
        <View style={styles.item} >
            
            <CheckBox style={styles.checkBox} color={Colors.primary} checked={choix===1}  onPress={()=>switchChoix()}/>

            <TouchableOpacity style={styles.list}>
                <Text style={styles.lightText}>{data.item.name}</Text>
                <Text style={styles.lightText}>{data.item.email}</Text>
                <Text style={styles.lightText}>{data.item.company.name}</Text>       
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    
    item:{
        width:"80%",
        borderRadius:20,
        padding:10,
        marginBottom:10,
        flexDirection:"row",
        alignItems: "center",
      },

    list:{
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#fff",
        marginLeft:50
   },
   submit:{
    width:"80%",
    backgroundColor:"#fc5185",
    borderRadius:20,
    padding:10,
    alignItems:"center",
    marginTop:40
  }
  });

  export default ItemSousCategorie;