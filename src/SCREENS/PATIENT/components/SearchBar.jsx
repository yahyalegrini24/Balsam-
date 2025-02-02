import React, { useState } from "react";
import { View,TextInput ,StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SearchBar(){
     const [SearchText,setSearchText]=useState("");
 return(
    
    <View style={styles.container}>
       <View style={styles.searchContainer}>
        {/* search container */}
       <Ionicons name="search" size={25} color="gray" style={styles.iconStyle}/>
       <TextInput
       styles={styles.SearchInput}
       placeholder="Find a Doctor,a Healthcare service ..."
       placeholderTextColor="gray"
       value={SearchText}
       onChangeText={(text)=>setSearchText(text)}
       
       />
       </View>
    </View>
 );
}

const styles=StyleSheet.create({
    container: {
      marginHorizontal: 15,
      backgroundColor: "white",
      borderRadius: 25,
     
      },
      searchContainer: {
        flexDirection: "row",
        alignContent:'center',
        marginHorizontal: 15,
        backgroundColor: "white",
        borderRadius: 25,
        paddingHorizontal: 10,
      },
      iconStyle: {
        paddingRight : 10,
        marginTop : 7,
      }
})