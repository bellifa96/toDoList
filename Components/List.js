import React, {useEffect, useState} from 'react';
import {Text, Alert, TouchableOpacity, View, ActivityIndicator, Modal, TextInput} from 'react-native';
import {styles} from "../assets/Styles";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import Fire from "../Fire";
import {ActionSheet} from "native-base";
import OutlineButton from "./OutlineButton";

const List = () => {
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)
    const [clicked, setClicked] = useState({})
    const [update, setUpdate] = useState(false)
    const [updateList, setUpdateList] = useState({})
    const BUTTONS = ['Mettre à jour', 'Supprimer', 'Annuler']
    const isFocused = useIsFocused()
    const navigation = useNavigation();

    const getLists = () => {
        const firebase = new Fire(error => {
            if (error) return Alert.alert('Oups', 'Une erreur est survenue')

            firebase.getLists(lists => {
                setLists(lists)
                setLoading(false)
            })

            return function unsubscribe() {
                firebase.detach()
            }
        })
    }

    useEffect(() => {
        getLists()
    }, [isFocused])

    useEffect(() => {
        if (clicked.button === 'Supprimer') {
            const firebase = new Fire(async error => {
                if (error) return Alert.alert('Oups', 'Une erreur est survenue')
                await firebase.deleteList(clicked.list)
                getLists()
                return function unsubscribe() {
                    firebase.detach()
                }
            })
        } else if (clicked.button === 'Mettre à jour') {
            setUpdateList(clicked.list)
            setUpdate(true)
        }
    }, [clicked])

    const handleUpdate = (list) => {
        const firebase = new Fire(async error => {
            if (error) return Alert.alert('Oups', 'Une erreur est survenue')
            await firebase.updateList(list)
            setUpdate(false)
            setUpdateList({})
            getLists()
            return function unsubscribe() {
                firebase.detach()
            }
        })
    }

    return (
        <>
            {
                loading ?
                    <ActivityIndicator size={'large'} color={'black'} style={styles.loader}/>
                    :
                    <>
                        {
                            lists.map((item, key) => (
                                <TouchableOpacity
                                    key={key}
                                    style={{...styles.listData, backgroundColor: item.color}}
                                    onPress={() => navigation.navigate('List', {'id': item.id})}
                                    onLongPress={() =>
                                        ActionSheet.show(
                                            {
                                                options: BUTTONS,
                                                cancelButtonIndex: 2,
                                                destructiveButtonIndex: 1,
                                                title: 'Options'
                                            },
                                            buttonIndex => {
                                                setClicked({button: BUTTONS[buttonIndex], list: item});
                                            }
                                        )}
                                >
                                    <View style={styles.listTitleBorder}>
                                        <Text style={styles.listTitle}>{item.name}</Text>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                        <View style={{flex: 1}}>
                                            <Text style={styles.listText}>TOTAL</Text>
                                            <Text style={styles.listNumber}>{item.todos ? item.todos.length : 0}</Text>
                                        </View>
                                        <View style={{flex: 1}}>
                                            <Text style={styles.listText}>RÉALISÉES</Text>

                                            <Text style={styles.listNumber}>
                                                {item.todos ? item.todos.filter(todo => todo.completed === true).length : 0}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </>
            }
            <Modal visible={update}
                   transparent={true}
                   animationType="slide"
                   onRequestClose={() => setUpdate(false)}>
                <View style={styles.modalBack}>
                    <View style={styles.modal}>
                        <View>
                            <TextInput
                                style={{...styles.input, color: updateList.color}}
                                onChangeText={name => setUpdateList({...updateList, name})}
                                value={updateList.name}
                                placeholder="Nom"
                                keyboardType="default"
                            />
                        </View>

                        <View style={styles.colors}>
                            <TouchableOpacity
                                onPress={() => setUpdateList({...updateList, color: '#f94144'})}
                                style={{...styles.btnColor, backgroundColor: '#f94144'}}
                            />
                            <TouchableOpacity
                                onPress={() => setUpdateList({...updateList, color: '#f8961e'})}
                                style={{...styles.btnColor, backgroundColor: '#f8961e'}}
                            />
                            <TouchableOpacity
                                onPress={() => setUpdateList({...updateList, color: '#f9c74f'})}
                                style={{...styles.btnColor, backgroundColor: '#f9c74f'}}
                            />
                            <TouchableOpacity
                                onPress={() => setUpdateList({...updateList, color: '#90be6d'})}
                                style={{...styles.btnColor, backgroundColor: '#90be6d'}}
                            />
                            <TouchableOpacity
                                onPress={() => setUpdateList({...updateList, color: '#43aa8b'})}
                                style={{...styles.btnColor, backgroundColor: '#43aa8b'}}
                            />
                            <TouchableOpacity
                                onPress={() => setUpdateList({...updateList, color: '#577590'})}
                                style={{...styles.btnColor, backgroundColor: '#577590'}}
                            />
                        </View>
                        <OutlineButton onClick={() => handleUpdate(updateList)} title={'Mettre à jour'}/>
                        <OutlineButton onClick={() => setUpdate(false)} title='Annuler'/>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default List