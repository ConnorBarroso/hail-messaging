import React from 'react'
import { formatRelative } from 'date-fns'
import './message.styles.scss'

const Message = ({
    //receives the user and message info but sets their defaults to 0
    createdAt = null,
    text= '',
    displayName = '',
    photoURL = '',
}) =>{
    return(
        <div className='con'>
            <div className='info-con'>
                <div className='user-con'>
                    {//checks if user info exists then builds the html if they do. 
                        photoURL ? (
                            <div className='img-con'><img className='img' src={photoURL} alt='Avatar'/></div>
                        ) 
                        : null
                    }
                    {
                        displayName ? <div className='dn-con'><p className='dn'>{displayName}</p></div>
                        : null
                    }
                </div>
            
            
                    {//gets the timestamp in seconds and formats it using the date-fns library. 
                        createdAt?.seconds ? (
                            <div className='ts-con'>
                                {
                                    formatRelative(new Date(
                                        createdAt.seconds * 1000
                                    )
                                    , new Date()
                                    )
                                }
                            </div>
                        ) : null
                    }
            </div>           
            

            <div className='text-con'><p className='text'>{text}</p></div>
        </div>
    ) 
}

export default Message