import React from 'react'
import { formatRelative } from 'date-fns'
import './message.styles.scss'

const Message = ({
    createdAt = null,
    text= '',
    displayName = '',
    photoURL = '',
}) =>{
    return(
        <div className='con'>
            <div className='info-con'>
                <div className='user-con'>
                    {
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
            
            
                    {
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