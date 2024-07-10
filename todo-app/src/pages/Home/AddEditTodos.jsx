import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

const AddEditTodos = ({ type, todoData, onClose, onSave }) => {
  const [title, setTitle] = useState(todoData ? todoData.title : '');
  const [description, setDescription] = useState(todoData ? todoData.description : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = { title, description, id: todoData ? todoData.id : null };
    onSave(todo);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {type === 'add' ? 'Add Todo' : 'Edit Todo'}
        </h2>
        <MdClose className="cursor-pointer" onClick={onClose} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="input-box mt-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="input-box mt-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="button-primary mt-4">
          {type === 'add' ? 'Add Todo' : 'Edit Todo'}
        </button>
      </form>
    </div>
  );
};

export default AddEditTodos;
