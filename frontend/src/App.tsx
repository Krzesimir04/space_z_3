import { useState, useEffect } from 'react'
import type { VitalSignCreate, MessageCreate } from './example_data'
import {mockMessages, mockVitals} from './example_data'

import './App.css'

const PREFIX_URL = "http://127.0.0.1:8000/"

function App() {
  const [vitals, setVitals] = useState<VitalSignCreate[]>([])
  const [messages, setMessages] = useState<MessageCreate[]>([])
  const [inputValue, setInputValue] = useState("")

  useEffect(()=>{
    const fetch_data =async () => {
      const resVitals = await get_vitals()
      const resMessages = await get_messages()

      setVitals(resVitals);
      setMessages(resMessages);

      // if there is no data here we send the mock data just to see how app works
      if(resVitals.length == 0){
        for(const vital of mockVitals){
          await post_vitals(vital)
        }
      }
      if(resMessages.length == 0){
        for(const message of mockMessages){
          await post_messages(message)
        }
        fetch_data()
      }
    }
    fetch_data();
  },[])

  async function get_vitals() {
    try{
      const response = await fetch(`${PREFIX_URL}vitals`)
      const res = await response.json();
      return res;
    }catch(error){
      console.log(error);
      return []
    }
  }

  async function get_messages(){
    try{
      const response = await fetch(`${PREFIX_URL}messages`)
      const res = await response.json();
      return res
    }catch(error){
      console.log(error);
      return []
    }
  }

  async function post_vitals(vital: VitalSignCreate) {
    try{
      const response = await fetch(`${PREFIX_URL}vitals`,{
        method: "POST",
        body: JSON.stringify(vital),
        headers: {
        "Content-Type": "application/json"
      }
      })
      const res = await response.json();
      return res
    }catch(error){
      console.log(error);
      return []
    }
  }

  async function post_messages(message: MessageCreate) {
    try{
      const response = await fetch(`${PREFIX_URL}messages`,{
        method: "POST",
        body: JSON.stringify(message),
        headers: {
        "Content-Type": "application/json"
      }
      })
      const res = await response.json();
      return res
    }catch(error){
      return []
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return; 
    const newMessage = {
      sender: "Ziemia",
      content: inputValue
    };
    const savedMessage = await post_messages(newMessage);
    setMessages((prevMessages) => [...prevMessages, savedMessage]);
    setInputValue("");
  };
  
  const vitals_table = vitals.map((v)=>{
    let date = v.timestamp || ""
    let time = new Date(date).toLocaleString('pl-PL')
    return(
    <div className='vital_row' key={v.id}>
      <div className='timestamp__vital'>{time}</div>
      <div className='energy_level__vital'>{v.energy_level}</div>
      <div className='heart_rate__vital'>{v.heart_rate}</div>
      <div className='temperature__vital'>{v.temperature}</div>
      <div className='mood__vital'>{v.mood}</div>
    </div>)
  })

  const message_chat = messages.map((m)=>{
    if(m.sender === "Ziemia"){
      return (
        <div className='message message_right' key={m.id}>
          {m.content}
        </div>
      )
    }else{
      return(
        <div className='message message_left' key={m.id}>
          {m.content}
        </div>
      )
    }
   })
  return (
    <>
      <section id="center">
        <section id="vitals_table">
          <div className='vital_row head_row'>
            <div className='timestamp__vital'>Time</div>
            <div className='energy_level__vital'>Energy level</div>
            <div className='heart_rate__vital'>Heart rate</div>
            <div className='temperature__vital'>Temperature</div>
            <div className='mood__vital'>Mood</div>
          </div>
          {vitals_table}
        </section>
        <section id="messages">
          <div className="chat_history">
            {message_chat}
          </div>
          <form className="chat_input_area" onSubmit={handleSendMessage}>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Wpisz wiadomość do Krzysia..." 
              className="chat_input"
            />
            <button type="submit" className="chat_button">Wyślij</button>
          </form>
        </section>
      </section>
    </>
  )
}

export default App
