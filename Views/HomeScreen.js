import React from 'react'
import {View, ScrollView} from "react-native"
import {styles} from "../assets/Styles"
import CreateList from "../Components/CreateList"
import List from "../Components/List";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ScrollView style={styles.scrollList} showsVerticalScrollIndicator={false}>
                    <CreateList/>
                    <List/>
                </ScrollView>
            </View>
        </View>
    )
}

export default HomeScreen