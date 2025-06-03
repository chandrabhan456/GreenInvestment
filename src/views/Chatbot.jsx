import React,{useState} from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { useStateContext } from '../contexts/ContextProvider';

import { useNavigate } from 'react-router-dom';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const UserProfile = () => {
  const {setChatbot,login1,setlogin1, currentColor,handleClick,initialState  } = useStateContext();
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
    
    }
  ]);
  
  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    }
    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);
    setIsTyping(true);
};
  return (
    <div className="nav-item absolute right-4 bg-white dark:bg-[#1d2041] p-8 rounded-lg w-22" style={{marginTop:"150px"}}>
      <div className="flex" style={{marginTop:"-20px",marginLeft:"-10px",whiteSpace:'nowrap'}}>
        <p className="font-semibold text-lg dark:text-gray-200">AI Assistant</p>
        <div className='ml-[60%]'>
        <button
            type="button"
            onClick={() => setChatbot(false)}
            style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%',marginTop:"-5px"}}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
      </div>
      </div>
      <div >
      <MainContainer style={{ marginLeft:"-15px", height: "500px", width: "410px"  }}>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })} 
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
        </div>
    </div>

  );
};

export default UserProfile;