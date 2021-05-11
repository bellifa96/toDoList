import React from 'react';
import {Text, TouchableOpacity, ScrollView, View} from 'react-native';
import {styles} from "../assets/Styles";
import {useNavigation} from "@react-navigation/native";

const List = ({data}) => {
    const navigation = useNavigation();

    return data.map((item, key) => (
                    <TouchableOpacity
                        key={key}
                        style={{...styles.listData, backgroundColor: item.color}}
                        onPress={() => navigation.navigate('List', {'list': item})}
                        onLongPress={() => alert('coucou')}
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

export default List