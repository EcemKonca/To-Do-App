import React, { useState, useEffect } from 'react'
import { MdClose } from 'react-icons/md'

const AddEditTodos = ({ type, todoData, onClose }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (type === 'edit' && todoData) {
      setTitle(todoData.title)
      setContent(todoData.content)
    }
  }, [type, todoData])

  const addNewTodo = async () => {
    // Add new todo logic
  }

  const editTodo = async () => {
    // Edit todo logic
  }

  const handleAddTodo = () => {
    if (!title) {
      setError('Please enter a title')
      return
    }

    if (!content) {
      setError('Please enter content')
      return
    }

    setError('')

    if (type === 'edit') {
      editTodo()
    } else {
      addNewTodo()
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {type === 'add' ? 'Add Todo' : 'Edit Todo'}
        </h2>
        <MdClose className="cursor-pointer" onClick={onClose} />
      </div>
      <input
        type="text"
        placeholder="Title"
        className="input-box mt-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        className="input-box mt-4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <p className="text-danger text-sm mt-2">{error}</p>}
      <button className="button-primary mt-4" onClick={handleAddTodo}>
        {type === 'add' ? 'Add Todo' : 'Edit Todo'}
      </button>
    </div>
  )
}

export default AddEditTodos
