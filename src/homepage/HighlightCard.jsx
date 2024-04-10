import React from 'react'

const HighlightCard = ({icon, head, paragraph}) => {
  return (
    <div className='border border-gray-300 rounded-lg p-4 '>
        <img src={icon} className='' width="200px" alt="" />
        <h1 className='text-3xl font-semibold'>{head}</h1>
        <p className='text-xl'>{paragraph}</p>
    </div>
  )
}

export default HighlightCard