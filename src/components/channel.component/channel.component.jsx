import React, { useEffect, useState } from "react"
import firebase from "firebase/app"
import Message from "../message.component/message.component"
import{ ReactComponent as Send } from './send.svg'
import './channel.styles.scss'


const Channel = ({ user= null, db = null }) =>{
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    const { uid, displayName, photoURL } = user

    useEffect(()=>{
        if(db){
            const unsubscribe = db
            .collection('Messages')
            .orderBy('createdAt')
            .limit(100)
            .onSnapshot(querySnapshot =>{
                const data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                setMessages(data)
                autoBottomScroll()
            })
            return unsubscribe
        }
    },[db])

    const handleOnSubmit = e =>{
        e.preventDefault();

        if(db){
            db.collection('Messages').add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
        }
        setNewMessage('')
        
    }
    const handleOnChange = e =>{
        setNewMessage(e.target.value)
    }
    
    
   const autoBottomScroll = ()=>{   
       const messageListContainer = document.querySelector('.message-list-container')
        return ( 
            messageListContainer.scrollTop = messageListContainer.scrollHeight - messageListContainer.clientHeight 
        )    
   }
           
    return(
        <div className='channel'>
            <div className='message-list-container' >
               <div className='message-list'>
                {
                    messages.map(message =>(
                        <div className='message-container' key = {message.id}>{<Message { ...message } />}</div>
                    ))
                  
                }
                
            </div>  
            </div>
            <form onSubmit={handleOnSubmit}>
                <div className='form'>
                        <div className='text-box'>
                            <input 
                                type='text'
                                value={newMessage}
                                onChange={handleOnChange}
                                placeholder='Message here'
                                className='input'
                            />
                        <div className='buttons-container'>
                            
                            <button 
                                className='send-button'
                                type='submit' 
                                disabled={!newMessage}
                            >
                            <Send className='send-icon'/>
                            </button>
                    </div>
                    </div>
                </div>
                   
            </form>
                     
        </div>
    )
                
}

export default Channel