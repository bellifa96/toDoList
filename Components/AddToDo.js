import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native'
import {styles} from "../assets/Styles"
import Fire from "../Fire"
import OutlineButton from "./OutlineButton";

function AddToDo(props) {
    const [name, setName] = useState(null);
    const [completed, setCompleted] = useState(false);

    const handleSubmit = () => {
        const firebase = new Fire(async error => {
            if (error) return Alert.alert('Oups', 'Une erreur est survenue')
            if (!name) return Alert.alert('Erreur', 'Vous devez insérer un nom')

            props.item.todos.push({name, completed})
            await firebase.updateList(props.item)
            setName(null)
            setCompleted(false)

            return function unsubscribe() {
                firebase.detach()
            }
        })
    }

    return (
        <>
            <View style={{marginBottom: 20}}>
                <TextInput
                    style={styles.input}
                    onChangeText={name => setName(name)}
                    value={name}
                    placeholder="Nouvelle tâche"
                    keyboardType="default"
                    multiline={true}
                />
                <OutlineButton onClick={() => handleSubmit()} title={'Ajouter'}/>
            </View>
        </>
    );
}

export default AddToDo;
