import { useEffect, useState } from "react"
import io from "socket.io-client"
const socket = io.connect("http://localhost:3001", { transports: ['websocket', 'polling', 'flashsocket'] });

const Container = (props) => {
    const [message, setEnteredMessage] = useState();
    const [isTyping,SetIsTyping] = useState(false);
    const [currentUserTyping,setCurrentUserTyping] = useState('');
    const sendMessage = () => {
        socket.emit('send-message', message);
        setIsTyping(false);
    }
    const setIsTyping = (typing) => {
        socket.emit('send-notification', { typing: typing, id: socket.id });
    }
    useEffect(() => {
        socket.on('connect', () => {
            console.log(`connection established with id ${socket.id}`);
        })
        socket.on('disconnect', (reason) => {
            console.log(`connection disconnected with id ${socket.id}`);
            console.log("reason: " + reason);
        })
        socket.on("receive-message", (data) => {
            setEnteredMessage(data);
        });
        socket.on("receive-notification",(data)=>{
            SetIsTyping(data.typing);
            setCurrentUserTyping(data.id)
        })
    }, [socket]);

    return (
        <div className="container">
            <div className="heading">
                <h1>Chat</h1>
            </div>
            <div className="body">
                <h1>{message}</h1>
                {isTyping && <h3>{` user ${currentUserTyping} is Typing...`}</h3>}
            </div>
            <div className="textbox">
                <input
                    onChange={(e) => { setEnteredMessage(e.target.value); setIsTyping(true); }}
                    placeholder="enter message here"
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Container;