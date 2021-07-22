import React from 'react'
import './login-logout.styles.scss'

const LoginLogout = ({ onClick = null, children = null }) =>{
    return(
        <button className='button' onClick={onClick}>{children}</button>
    )
}

export default LoginLogout