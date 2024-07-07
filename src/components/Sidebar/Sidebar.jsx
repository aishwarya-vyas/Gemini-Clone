import React, { useContext, useState } from 'react'
//useState can't be used inside if else statements they should not be nested inside anything they should be written outside the return/render and they are executed in the same order as they are declared
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {
  const [expand, setExpand] = useState(false)
  //the first one is used for pointing to the current state and the second one for setting the next state i.e. updating the state
  //the set function is used inside a function for carrying out the logic for changing the state
  //with useState a function is passed if a complex math is to be done like fibonacci as it runs everytime you call it and may slow down the system but by using the function it gets called only once i.e. intially
  const { sent, prev, setRecent, newChat } = useContext(Context)

  const pL = async (prompt) => {
    setRecent(prompt)
    await sent(prompt)
  }

  return (
    <div className='sb'>
      <div className="top">
        <img onClick={() => setExpand(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
        <div onClick={()=>newChat()} className="chat">
          <img src={assets.plus_icon} alt="" />
          {expand ? <p>New Chat</p> : null}
        </div>
        {expand ? <div className="title">
          <p className="recent-title">Recent</p>
          {prev.map((item, index) => {
            return (
              <div onClick={()=>pL(item)} className="recent">
                <img src={assets.message_icon} alt="" />
                <p>{item.slice(0,18)}...</p>
              </div>
            )
          })}
        </div> : null}
      </div>
      <div className="bottom">
        <div className="b-item recent">
          <img src={assets.question_icon} alt="" />
          {expand ? <p>Help</p> : null}
        </div>
        <div className="b-item recent">
          <img src={assets.history_icon} alt="" />
          {expand ? <p>Activity</p> : null}
        </div>
        <div className="b-item recent">
          <img src={assets.setting_icon} alt="" />
          {expand ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
