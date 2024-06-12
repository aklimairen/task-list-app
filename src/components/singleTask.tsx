/**
 * 
 * - React: Core library for building interfaces.
 * - AiFillDelete: imported icon from react icons for Delete action
 * - Todo: Interface for a todo item. (Located in ./components/model)
 *
 */
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { Todo } from "./model";

/**
 * SingleTask component: Renders a single todo item within the Todo List.
 * 
 * @param {Object} props - Component properties.
 * @param {number} props.index - Index of the todo item in the todos list.
 * @param {Todo} props.todo - The individual todo object.
 * @param {Todo[]} props.todos - The complete list of todo items.
 * @param {React.Dispatch<React.SetStateAction<Todo[]>>} props.setTodos - Function to update the todos state.
 * 
 * @returns {JSX.Element} - JSX element representing the single todo item.
 */
const SingleTask: React.FC<{
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}> = ({ todo, todos, setTodos }) => {
  const handleDelete = () => {
    // Confirmation before deletion
    if (window.confirm("Are you sure? You want to Delete this task?")) {
      setTodos(todos.filter((todoItem) => todoItem.id !== todo.id));
    }
  };
  const handleDone = (id: number) => {
    // Function to toggle the 'done' state of a todo item
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // JSX for rendering the single todo item (including done checkbox, content, delete button)  
  return (
    <li className="flex justify-between py-4 first:pt-0 last:pb-0">
      <div className="flex-1 w-64">
        <input
          onClick={() => handleDone(todo.id)}
          type="checkbox"
          className="cursor-pointer"
        />

        {todo.isDone ? (
          <s className="mx-2">{todo.todo}</s>
        ) : (
          <span className="mx-2">{todo.todo}</span>
        )}
      </div>
      <span className="cursor-pointer" onClick={() => handleDelete()}>
        <AiFillDelete className="text-sky-700" />
      </span>
    </li>
  );
};

export default SingleTask;
