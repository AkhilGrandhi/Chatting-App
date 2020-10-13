import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ImageIcon from '@material-ui/icons/Image';
import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { SearchOutlined} from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from "./firebase";
import { useStateValue } from './StateProvider';


function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        //Fetching data from database
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc => 
            ({
              id: doc.id, 
              data: doc.data()
            })))
        })
        
        return () => {
            unsubscribe();
        }
        
       }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <h3 className="sidebar__Username">{user?.displayName}</h3>
                <div className="sidebar__headerRight">
                     
                    
                    <IconButton>
                        <ChatIcon />
                    </IconButton> 
                    <IconButton>
                        <ImageIcon />
                    </IconButton>                    
                    
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or Start new Chat" type="text" ></input>
                </div>    
            </div>
            <div className="sidebar__chats">

                <SidebarChat addNewChat/>

                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
                
            </div>
        </div>
    )
}

export default Sidebar;
