import React, { useState } from 'react'
import './Login.css'

import api from '../services/api'
import logo from '../assets/logo.svg'

export default function Login({ history }) {
  // history - propertie of react-router-dom to make navigation
  const [username, setUsername] = useState('');

  async function handleSubmit(e) {
    e.preventDefault()
    
    const response = await api.post('/devs', {
      username,
    })

    const { _id } = response.data
    history.push(`/dev/${_id}`) // redirect to main route
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input 
          placeholder="Informe seu usuário do Github"
          value={username}
          onChange={ e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}


