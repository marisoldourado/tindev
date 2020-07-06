import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../services/api'

import logo from '../assets/logo.png'
import like from '../assets/like.png'
import dislike from '../assets/dislike.png'

export default function Main({ navigation }) {
    const userId = navigation.getParam('user')
    const [users, setUsers] = useState([])

    // every time my route ID is changed, useEffect will be executed chamado
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: { 
                    user: userId 
                }
            })

            setUsers(response.data)
        }

        loadUsers();
    }, [userId])

    async function handleLike() {
        // get first user of array and set on user valiable
        // get rest of users and set on rest variable
        const [user, ... rest] = users
        await api.post(`devs/${user._id}/likes`, null, {
            headers: { user: userId }
        })

        setUsers(rest)
    }

    async function handleDislike() {
         // get first user of array and set on user valiable
        // get rest of users and set on rest variable
        const [user, ... rest] = users
        await api.post(`devs/${user._id}/dislikes`, null, {
            headers: { user: userId }
        })

        setUsers(rest)
    }

    async function handleLogout() {
        await AsyncStorage.clear()

        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo}/>
            </TouchableOpacity>
    
            <View style={styles.cardsContainer}> 
                { users.length === 0 
                ? <Text style={styles.emptyList}>Por hoje é tudo :( </Text>
                : (
                    users.map((user, index) => (
                        <View key={user._id} style={[styles.card, {zIndex: users.length - index}]}> 
                            <Image style={styles.avatar} source={{uri: user.avatar}}/>
                            <View style={styles.footer}>
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                            </View>  
                        </View>  
                    ))
                )}
            </View>

           { users.length > 0 && (
            <View style={styles.buttonsContainer}>
                <TouchableOpacity  onPress={handleLike} style={styles.button}>
                    <Image source={like}/>
                </TouchableOpacity>
                <TouchableOpacity  onPress={handleDislike} style={styles.button}>
                    <Image source={dislike}/>
                </TouchableOpacity>
            </View>
           )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 40
    },

    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500
    },

    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },

    avatar: {
        flex: 1,
        height: 300
    },

    footer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },

    bio: {
        fontSize: 14,
        marginTop: 5,
        lineHeight: 20,
        color: '#999',
        lineHeight: 18
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        elevation: 2, // shadow for android
        // shadow for ios
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        }
    },

    emptyList: {
        fontSize: 32,
        color: '#999',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})