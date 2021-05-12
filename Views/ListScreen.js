import React, {useEffect, useState} from 'react'
import {View, TextInput, ActivityIndicator, ScrollView} from "react-native";
import AddToDo from "../Components/AddToDo";
import {styles} from "../assets/Styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Fire from "../Fire";
import {IconButton} from "react-native-paper";
import {useIsFocused} from "@react-navigation/native";

const ListScreen = ({route}) => {
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState({});
    const isFocused = useIsFocused()

    const getList = () => {
        const firebase = new Fire(async error => {
            if (error) return alert('Une erreur est survenue')
            firebase.ref.doc(route.params?.id).onSnapshot(list => {
                setList(list.data())
                setLoading(false)
            })
            return function unsubscribe() {
                firebase.detach()
            }
        })
    }

    const completed = (key, isChecked) => {
        list.todos[key].completed = isChecked;
        const firebase = new Fire(async error => {
            if (error) return alert('Une erreur est survenue')
            await firebase.updateList(list).then(() => getList())
            return function unsubscribe() {
                firebase.detach()
            }
        })
    }
    const supprimer = (key) => {
        if (key > -1) {
            list.todos.splice(key, 1);
            console.log(list.todos)
            const firebase = new Fire(async error => {
                if (error) return alert('Une erreur est survenue')
                await firebase.updateList(list)
                return function unsubscribe() {
                    firebase.detach()
                }
            })
        }
    }

    const update = (key, name) => {
        list.todos[key].name = name;
        const firebase = new Fire(async error => {
            if (error) return alert('Une erreur est survenue')
            await firebase.updateList(list)
            getList()
            return function unsubscribe() {
                firebase.detach()
            }
        })
    }

    useEffect(() => {
        getList()
    }, [isFocused])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {
                    loading ?
                        <ActivityIndicator size={'large'} color={'black'} style={styles.loader}/>
                        :
                        <>
                            <ScrollView style={styles.scrollList}
                                        showsVerticalScrollIndicator={false}>
                                <AddToDo item={list}/>
                                {
                                    list.todos.map((item, key) => (
                                        <View key={key} style={{margin: 10, flexDirection: 'row'}}>
                                            <View style={{flex: 10, flexDirection: 'row'}}>
                                                <BouncyCheckbox
                                                    size={25}
                                                    fillColor={list.color}
                                                    unfillColor="#FFFFFF"
                                                    iconStyle={{borderColor: list.color}}
                                                    isChecked={item.completed}
                                                    onPress={(isChecked) => {
                                                        completed(key, isChecked)
                                                    }}
                                                />
                                                <TextInput
                                                    onChangeText={name => update(key, name)}
                                                    defaultValue={item.name}
                                                    placeholder="Nom"
                                                    keyboardType="default"
                                                    multiline={true}
                                                    style={[styles.inputTask, item.completed ? styles.completedTrue : styles.completedFalse]}
                                                />
                                            </View>
                                            <IconButton
                                                icon="trash-can-outline"
                                                color={list.color}
                                                size={30}
                                                style={styles.trashBtn}
                                                onPress={() => supprimer(key)}
                                            />
                                        </View>
                                    ))
                                }
                            </ScrollView>
                        </>
                }
            </View>
        </View>
    )
}

export default ListScreen;