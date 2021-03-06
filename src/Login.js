import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css';
import {auth, provider} from  "./firebase";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import Logo from './AkhilGrandhiLogo.png'

function Login() {

    const [{user}, dispatch] = useStateValue();
    
    const signIn = () => {
        console.log(user);
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,    
                })
            })
            .catch((error) => alert(error.message));
            
    };
    return (
        <div className="login">
            <div className="login__container">
                <h3>Developed By..</h3>
                <a href="https://akhilgrandhi.netlify.app/" >
                <img 
                    src={Logo}
                    alt="logo__image"
                />
                </a>
                <div className="login__text">
                    <h2>Welcome to Messaging Clone</h2>
                </div>
                <Button  onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>    
        </div>
    )
}

export default Login
