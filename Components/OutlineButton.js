import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {styles} from "../assets/Styles"

const OutlineButton = ({onClick, title}) => {
    return(
        <View>
            <TouchableOpacity style={styles.btnOutline} onPress={onClick}>
                <Text style={styles.btnText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OutlineButton

