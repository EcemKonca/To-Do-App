import React from 'react'

const EmptyMessage = ({ message }) => {
  return (
    <div className="empty-message">
      <h2>{message}</h2>
    </div>
  )
}

export default EmptyMessage