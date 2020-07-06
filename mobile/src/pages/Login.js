import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Image, TextInput, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../services/api'
import Logo from '../assets/logo.png'

export default function Login({ navigation }) {
    const [user, setUser] = useState('');

    // if user is logged
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user) {
                navigation.navigate('Main', { user })
            }
        })
    }, [])

    async function handleLogin() {
        const response = await api.post('/devs', {
            username: user
        })

        const { _id } = response.data

        await AsyncStorage.setItem('user', _id)
        console.log(_id)

        navigation.navigate('Main', { user: _id })
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior="padding"
            enabled={Platform.OS === 'ios'}
        >
            <Image source={Logo}></Image>
            <TextInput 
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Informe seu usuário do Github"
                placeholderTextColor="#999"
                style={styles.input}
                onChangeText={setUser}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }

})