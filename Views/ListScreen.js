import React from 'react'
import {View, Text} from "react-native";
import AddToDo from "../Components/AddToDo";
import {styles} from "../assets/Styles";

const ListScreen = ({route}) => {
    const {list} = route.params
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <AddToDo item={list}/>
                <View>
                    {
                        list.todos.map((item, key) => (
                            <View key={key}>
                                <Text> {item.name}</Text>
                            </View>
                        ))
                    }
                </View>
            </View>
        </View>
    )
}

export default ListScreen