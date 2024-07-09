import React from 'react'
import { MdCreate, MdDelete } from 'react-icons/md'
import { FaCheckCircle, FaRegCheckCircle } from 'react-icons/fa'

const TodoCard = ({ title, content, completed, onEdit }) => {
  return (
    <div className="todo-card">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-500">{content}</p>
      </div>
      <div className="flex items-center">
        {completed ? (
          <FaCheckCircle className="text-green-500 mr-3" size={24} />
        ) : (
          <FaRegCheckCircle className="text-gray-400 mr-3" size={24} />
        )}
        <div className="flex items-center">
          <MdCreate
            className="text-primary mr-3 cursor-pointer"
            size={24}
            onClick={onEdit}
          />
          <MdDelete className="text-danger cursor-pointer" size={24} />
        </div>
      </div>
    </div>
  )
}

export default TodoCard
