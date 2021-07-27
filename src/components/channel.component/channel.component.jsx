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
        //when there is a change in the fire store Messages collection re-render the messages array with the most recent hundred snapshot objects. Then set the scrollbar to the bottom.
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
        //on submit create a new object in the Messages collection with the input field text, timestamp, uid, displayname and photoURL then set the input to an empty string.
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
        //set the message state to the text in the input field
        setNewMessage(e.target.value)
    }
    
    
   const autoBottomScroll = ()=>{
       // set the top of the messageListContainer scrollbar to be the scrollheight - the client height. Setting it to the bottom of the window.    
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