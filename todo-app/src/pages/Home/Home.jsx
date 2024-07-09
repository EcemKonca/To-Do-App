import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { MdAdd } from 'react-icons/md'
import AddEditTodos from './AddEditTodos'
import Modal from 'react-modal'
import EmptyMessage from '../../components/EmptyMessage'
import todos from '../../utils/constants'
import TodoCard from '../../components/TodoCard'

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  })

  const handleEditNote = (todo) => {
    setOpenAddEditModal({ isShown: true, type: 'edit', data: todo })
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Your Todos</h1>
          <MdAdd
            size={40}
            className="text-primary cursor-pointer"
            onClick={() =>
              setOpenAddEditModal({ isShown: true, type: 'add', data: null })
            }
          />
        </div>
        {todos.length === 0 ? (
          <EmptyMessage message="No todos found" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {todos.map((todo) => (
              <TodoCard key={todo.id} {...todo} onEdit={handleEditNote} />
            ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: 'add', data: null })
        }
        className="modal"
        overlayClassName="overlay"
      >
        <AddEditTodos
          type={openAddEditModal.type}
          todoData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: 'add', data: null })
          }
        />
      </Modal>
    </>
  )
}

export default Home
