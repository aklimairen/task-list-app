import React, { useState } from "react";
import { Todo } from "./model";

interface Props {
  todos: Todo[]; // Array of todo objects representing the todo list.
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>; // Function to update the todos state.
}

const AddTaskForm: React.FC<Props> = ({ todos, setTodos }) => {
  // AddTaskForm component: Provides a form for users to add new todo items.

  const [newTodo, setNewTodo] = useState<string>("");

  const handleAddTodo = (e: React.FormEvent) => {
    /**
     * Prevents default form submission, checks for non-whitespace input, creates
     * a new todo object with a unique ID and 'isDone' set to false as newly created task status should be open, adds it to
     * the todo list, and clears the input field.
     */
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), todo: newTodo, isDone: false }]);
      setNewTodo("");
    }
  };

  return (
    <>
      {/* Form to add a new Task */}
      <form
        onSubmit={handleAddTodo}
        className="relative flex mt-10 md:mt-4 my-3"
      >
        {/* Input field */}
        <input
          className="block w-full px-3 py-3 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:order-none"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What's on your plan?"
        />
        {/* Add Button */}
        <button
          type="submit"
          className="rounded-r-md bg-sky-600 hover:bg-sky-700 text-white font-medium relative -left-1 border-1 border-slate-300 hover:border-sky-300 px-2 cursor-pointer"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default AddTaskForm;
