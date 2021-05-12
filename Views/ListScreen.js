import React from 'react'
import {View, Text} from "react-native";
import AddToDo from "../Components/AddToDo";
import {styles} from "../assets/Styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Fire from "../Fire";
import {Button} from "react-native-paper";

const ListScreen = ({route}) => {
    const {list} = route.params

    const fire =  new Fire(async error => {
        if (error) return alert('Une erreur est survenue')
        await firebase.updateList(list)
        return function unsubscribe() {
            firebase.detach()
        }
    })

    const update = (key,isChecked)=>{
          list.todos[key].completed = isChecked;
          const up = () =>{ fire() }

    }
    const supprimer = (key)=>{
        if (key > -1) {
            list.todos.splice(key, 1);
            console.log(list.todos)
            const up = () =>{ fire() }
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <AddToDo item={list}/>
                <View>
                    {
                        list.todos.map((item, key) => (
                            <View key={key} style={{margin:10,flexDirection:'row'}}>
                                <BouncyCheckbox
                                    size={25}
                                    fillColor="red"
                                    unfillColor="#FFFFFF"
                                    text={item.name}
                                    iconStyle={{ borderColor: "red" }}
                                    isChecked = {item.completed}
                                    onPress={(isChecked) => {update(key,isChecked)}}
                                />
                                <Button icon="trash-can-outline"
                                        style={{ alignSelf:'flex-end',width:25 }}
                                        labelStyle={{ fontSize: 25 }}
                                        onPress={()=>supprimer(key)}
                                />
                            </View>
                        ))
                    }
                </View>
            </View>
        </View>
    )
}

export default ListScreen