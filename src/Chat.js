import React, {useState, useEffect} from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './Chat.css';
import {useParams} from "react-router-dom";
import db, {storage} from './firebase';
import firebase from "firebase";
import { useStateValue} from "./StateProvider"
import PublishIcon from '@material-ui/icons/Publish';
import SendIcon from '@material-ui/icons/Send';


function Chat() {

    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if(roomId) {
            db.collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                )
        }

    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, [roomId])



    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }








    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };



    const handleUpload = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            (error) => {
                //Error function...
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //Post Image inside db
                        db.collection('rooms').doc(roomId).collection('messages').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            imageUrl: url,
                            name: user.displayName,
                            message: input,
                        });
                        setProgress(0);
                        setImage(null);
                        setInput("");
                    })
            }
        )
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p> Last seen {" "}
                        {new Date(
                            messages[messages.length-1]?.
                            timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                    
                </div>

                <div className="chat__bodyRight">
                     {/* <progress className="imageupload__progress" value={progress} max="100" /> */}
                     <LinearProgress variant="determinate" value={progress} max="100" />

                        <IconButton>                             
                            <input type="file" onChange={handleChange} />                            
                        </IconButton> 
                        <IconButton onClick={handleUpload}>
                            <PublishIcon />
                        </IconButton>        
                </div>
            </div>
            
            <div className="chat__body">
                {   messages.map( (message) => (

                    <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                    <span className="chat__name" >
                        {message.name}
                    </span>                   

                    <div className={`post ${message.imageUrl == null && "post__disable"}`}>
                        <img className="post__image" src={message.imageUrl} alt="image" />  
                    </div>      

                        {message.message}        

                    <span className="chat__timestamp" >
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>                  

                ))}
                
                
            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button onClick={sendMessage} >Type a message</button>
                </form>  
                <IconButton>                 
                    <SendIcon onClick={sendMessage} />
                </IconButton >
            </div>
            
        </div>
    )
}

export default Chat;
