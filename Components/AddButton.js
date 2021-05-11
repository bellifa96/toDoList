import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {styles} from "../assets/Styles"

const AddButton = ({onClick}) => {
    return (
        <View>
            <TouchableOpacity style={styles.btnAdd} onPress={onClick}>
                <Text style={styles.btnText}>Ajouter une liste</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AddButton
