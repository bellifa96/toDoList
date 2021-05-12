import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Alert} from 'react-native'
import {styles} from "../assets/Styles"
import Fire from "../Fire"
import AddButton from "./AddButton";
import OutlineButton from "./OutlineButton"

const CreateList = () => {
    const [name, setName] = useState(null);
    const [color, setColor] = useState('#000');
    const [showCreate, setShowCreate] = useState(false)

    const handleSubmit = () => {
        const firebase = new Fire(async error => {
            if (error) return Alert.alert('Oups', 'Une erreur est survenue')
            if (!name) return Alert.alert('Erreur', 'Vous devez insérer un nom')

            await firebase.addList({name, color, todos: []})
            setShowCreate(false)
            setName(null)
            setColor('#000')

            return function unsubscribe() {
                firebase.detach()
            }
        })
    }

    return (
        <>
            {
                !showCreate ?
                    <AddButton onClick={() => setShowCreate(!showCreate)}/>
                    :
                    <>
                        <View>
                            <TextInput
                                style={{...styles.input, color: color}}
                                onChangeText={name => setName(name)}
                                value={name}
                                placeholder="Nom"
                                keyboardType="default"
                            />
                        </View>

                        <View style={styles.colors}>
                            <TouchableOpacity
                                onPress={() => setColor('#f94144')}
                                style={{...styles.btnColor, backgroundColor: '#f94144'}}
                            />
                            <TouchableOpacity
                                onPress={() => setColor('#f8961e')}
                                style={{...styles.btnColor, backgroundColor: '#f8961e'}}
                            />
                            <TouchableOpacity
                                onPress={() => setColor('#f9c74f')}
                                style={{...styles.btnColor, backgroundColor: '#f9c74f'}}
                            />
                            <TouchableOpacity
                                onPress={() => setColor('#90be6d')}
                                style={{...styles.btnColor, backgroundColor: '#90be6d'}}
                            />
                            <TouchableOpacity
                                onPress={() => setColor('#43aa8b')}
                                style={{...styles.btnColor, backgroundColor: '#43aa8b'}}
                            />
                            <TouchableOpacity
                                onPress={() => setColor('#577590')}
                                style={{...styles.btnColor, backgroundColor: '#577590'}}
                            />
                        </View>
                        <OutlineButton onClick={() => handleSubmit()} title={'Ajouter'}/>
                        <OutlineButton onClick={() => setShowCreate(!showCreate)} title='Annuler'/>
                    </>
            }
        </>
    );
}

export default CreateList
