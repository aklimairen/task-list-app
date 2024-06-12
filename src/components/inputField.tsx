import React, { useState } from "react";
import { Todo } from "./model";

/**
 * AddTaskForm component: Provides a form for users to add new todo items.
 * @param {Todo[]} props.todos - Array of todo objects representing the todo list.
 * @param {React.Dispatch<React.SetStateAction<Todo[]>>} props.setTodos - Function to update the todos state.
 *
 */
interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const AddTaskForm: React.FC<Props> = ({ todos, setTodos }) => {
  // State to manage the user's input for the new todo item
  const [newTodo, setNewTodo] = useState<string>("");

  // Function to handle the form submission for adding a new todo
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if the new todo input is not empty after trimming whitespace
    if (newTodo.trim()) {
      // Create a new todo object with a unique ID, the user's input, and 'isDone' set to false (not done)
      setTodos([...todos, { id: Date.now(), todo: newTodo, isDone: false }]);
      // Clear the input field for the next todo
      setNewTodo("");
    }
  };

  return (
    <>
      {/* Form to add a new todo*/}
      <form
        onSubmit={handleAddTodo}
        className="relative flex mt-10 md:mt-4 my-3"
      >
        {/* Input filed */}
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
