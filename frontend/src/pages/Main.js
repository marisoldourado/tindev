import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Main.css'

import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import api from '../services/api'

export default function Main({ match }) {
    const [users, setUsers] = useState([])

    // every time my route ID is changed, useEffect will be executed chamado
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: { 
                    user: match.params.id 
                }
            })

            setUsers(response.data)
        }

        loadUsers();
    }, [match.params.id])

    async function handleLike(userId) {
        await api.post(`devs/${userId}/likes`, null, {
            headers: { user: match.params.id }
        })

        setUsers(users.filter(user => user._id !== userId))
    }

    async function handleDislike(userId) {
        await api.post(`devs/${userId}/dislikes`, null, {
            headers: { user: match.params.id }
        })

        setUsers(users.filter(user => user._id !== userId))
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev"/>
            </Link>
            { users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt="user.name" />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
    
                            <div className="buttons">
                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt={"Like"} />
                                </button>
                                <button type="button" onClick={() => handleDislike(user._id)}>
                                    <img src={dislike} alt={"Dislike"} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="emptyList"> Por hoje é tudo :( </div>
            )}
        </div>
    )
}