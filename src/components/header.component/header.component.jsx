import React from 'react'
import firebase from 'firebase'

import LoginLogout from '../login-logout component/login-logout.component'
import { ReactComponent as Logo } from './snowflake.svg'

import './header.styles.scss'




const Header = () => {
    
    const logout = async ()=>{
        try{
            await firebase.auth().signOut()
        }catch(error) {
            console.log(error.message)
        }
    }
    
    return(
       <div className='header'>
           <div className='title-container'>
               <Logo className='logo'/>
               <div className='title'>HAIL MESSAGING!</div>
           </div>
        
        <div className='button-container'>
            <LoginLogout className='button' onClick={logout}>Logout</LoginLogout>
        </div>
    </div> 
    )
    
}

export default Header