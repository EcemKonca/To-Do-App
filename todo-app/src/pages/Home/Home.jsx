import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { MdAdd } from 'react-icons/md';
import AddEditTodos from './AddEditTodos';
import Modal from 'react-modal';
import EmptyMessage from '../../components/EmptyMessage';
import TodoCard from '../../components/TodoCard';

Modal.setAppElement('#root');

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost/todoapp/api/index.php', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTodos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setError('An error occurred while fetching todos.');
      }
    };

    fetchTodos();
  }, []);

  const handleEditNote = (todo) => {
    setOpenAddEditModal({ isShown: true, type: 'edit', data: todo });
  };

  const handleSave = async (todo) => {
    try {
      const method = todo.id ? 'PUT' : 'POST';
      const endpoint = todo.id ? `http://localhost/todoapp/api/edit_task.php` : 'http://localhost/todoapp/api/add_task.php';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.message) {
        if (method === 'POST') {
          setTodos([...todos, data.task]);
        } else {
          const updatedTodos = todos.map(t => t.id === todo.id ? { ...t, ...todo } : t);
          setTodos(updatedTodos);
        }
        setOpenAddEditModal({ isShown: false, type: 'add', data: null });
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error saving todo:', error);
      setError('An error occurred while saving the todo.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch('http://localhost/todoapp/api/delete_task.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.message) {
        setTodos(todos.filter(todo => todo.id !== id));
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('An error occurred while deleting the todo.');
    }
  };

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
        {error && <p className="text-danger text-sm mb-4">{error}</p>}
        {todos.length === 0 ? (
          <EmptyMessage message="No todos found" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {todos.map((todo) => (
              <TodoCard 
                key={todo.id} 
                {...todo} 
                content={todo.description || ''} 
                onEdit={() => handleEditNote(todo)} 
                onDelete={() => handleDelete(todo.id)}
              />
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
          onSave={handleSave}
        />
      </Modal>
    </>
  );
};

export default Home;
