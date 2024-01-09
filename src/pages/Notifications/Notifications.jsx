import React, { useState } from 'react'
import NotificationCard from './NotificationCard'
import NotificationAction from './NotificationAction'


const Notifications = () => {
  const [toggleAction, setToggleAction] = useState(false);
  const [notifications, setNotification] = useState([]);

  const handleAction = ()=>{
    setToggleAction(!toggleAction)
  }
  const [toggleAdd, setToggleAdd] = useState(false)
  const handleAddNew = ()=>{
    setToggleAdd(!toggleAdd)
  }
    
  const renderedNotes = notifications.map((notification)=>{
    console.log('hello');
  })
  return (
    <div className='relative'>
      <div className='lg:w-3/5 w-10/12 mx-auto my-8'> 
      {toggleAdd && <NotificationAction toggleAdd={toggleAdd} setToggleAdd={setToggleAdd}/>}
      <NotificationCard  handleAction={handleAction} toggleAction={toggleAction} handleAddNew={handleAddNew}/>
      <NotificationCard/>
      <NotificationCard/>
      <NotificationCard/>
      <NotificationCard/>
      <NotificationCard/>
      {/* <NotificationCard/>
      <NotificationCard/>
      <NotificationCard/> */}
      </div>
    </div>
  )
}

export default Notifications