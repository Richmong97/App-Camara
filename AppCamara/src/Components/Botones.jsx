import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Boton ({title, onPress, icon, color}) {
    return (
        <TouchableOpacity onPress={onPress} style={StyleS.boton}>
            <Ionicons name={icon} size={30} color={color ? color: '#000'}/>
            <Text style={StyleS.text}> {title} </Text>
        </TouchableOpacity>
    )
}

const StyleS = StyleSheet.create({
    boton : {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
    },
    text : {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
        marginLeft: 10
    }
})