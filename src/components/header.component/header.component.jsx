import React from 'react'
import firebase from 'firebase'

import LoginLogout from '../login-logout component/login-logout.component'
import { ReactComponent as Logo } from './snowflake.svg'

import './header.styles.scss'




const Header = (user) => {
    
    const logout = async ()=>{
        try{
            await firebase.auth().signOut()
        }catch(error) {
            console.log(error.message)
        }
    }
    console.log(user)
    
    return(
       <div className='header'>
           <div className='title-container'>
               <Logo className='logo'/>
               <div className='title'>HAIL MESSAGING!</div>
           </div>
        
       
            <div className='button-container'>
                {
                    user && (<LoginLogout className='button' onClick={logout}>Logout</LoginLogout>) && null
                }
            </div> 
        
    </div> 
    )
    
}

export default Header