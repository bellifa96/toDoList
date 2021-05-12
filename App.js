import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from "./Views/HomeScreen"
import {StatusBar} from "expo-status-bar";
import ListScreen from "./Views/ListScreen";
import { LogBox } from 'react-native';

const Stack = createStackNavigator()

const App = () => {
    LogBox.ignoreLogs(['Setting a timer']);

    return (
        <>
            <StatusBar style="auto"/>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="List" component={ListScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default App