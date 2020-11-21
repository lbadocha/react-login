import React, { useState } from 'react';
import { Redirect } from "react-router-dom";

import axios from 'axios';

import './Login.css';


const Login = props => {


    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errors, setErrors] = useState({userNameError:'',userPasswordError:''});

    const handleUserName = e => {
        setUserName(e.target.value);
    }

    const handleUserPassword = e => {
        setUserPassword(e.target.value);
    }


    const loginUser = e => {
        e.preventDefault();
        
        if(userName.length < 4 || userPassword.length < 4) {
            setErrors({
                userNameError: userName.length < 4 ? 'Nazwa użytkownika musi mieć min. 4 znaki':'',
                userPasswordError: userPassword.length < 4 ? 'Hasło użytkownika musi mieć min. 4 znaki':''
            });

            return;

        } else {
            setErrors({
                userNameError: '',
                userPasswordError: ''
            })
        }

        axios.post('https://akademia108.pl/api/social-app/user/login',
            {
                "username": userName,
                "password": userPassword,
            },
            {
                'headers': {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        ).then(resp=> {
            console.log(resp.data)
            if(!resp.data.error) {
                props.loginUser(true);
                localStorage.setItem('user', JSON.stringify(resp.data));
            }
        })
    }

    if(props.logged) {
        return <Redirect to='/' />
    }
    

    return (
        <form onSubmit={loginUser}>
            <h2>Login</h2>
            <input type="text" value={userName} name="login" placeholder="Nazwa użytkownika" onChange={handleUserName} />
            <span className="error">{errors.userNameError}</span>
            <input type="password" value={userPassword} name="password" placeholder="Hasło użytkownika" onChange={handleUserPassword} />
            <span className="error">{errors.userPasswordError}</span>
            <button>Zaloguj</button>
        </form>
    )
}

export default Login;