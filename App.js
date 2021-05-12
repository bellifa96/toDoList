import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from "./Views/HomeScreen"
import {StatusBar} from "expo-status-bar";
import ListScreen from "./Views/ListScreen";
import {Root} from "native-base";


const Stack = createStackNavigator()

const App = () => {

    return (
        <Root>
            <StatusBar style="auto"/>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="List" component={ListScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Root>
    );
}

export default App