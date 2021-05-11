import React, {useEffect, useState} from 'react'
import {View, ActivityIndicator, ScrollView} from "react-native"
import {styles} from "../assets/Styles"
import CreateList from "../Components/CreateList"
import List from "../Components/List"
import Fire from "../Fire"
import {useIsFocused} from "@react-navigation/native"

const HomeScreen = () => {
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)
    const isFocused = useIsFocused()

    useEffect(() => {
        const firebase = new Fire(error => {
            if (error) return alert('Une erreur est survenue')

            firebase.getLists(lists => {
                setLists(lists)
                setLoading(false)
            })

            return function unsubscribe() {
                firebase.detach()
            }
        })
    }, [isFocused])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {
                    loading ?
                        <ActivityIndicator size={'large'} color={'black'} style={styles.loader}/>
                        :
                        <ScrollView style={styles.scrollList} showsVerticalScrollIndicator={false}>
                            <CreateList/>
                            <List data={lists}/>
                        </ScrollView>
                }
            </View>
        </View>
    )
}

export default HomeScreen