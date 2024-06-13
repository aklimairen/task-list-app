import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { Todo } from "./model";

/**
 * Functional component representing a single task in a todo list.
 * Handles deletion and toggling of task completion status.
 *
 * @param {number} index - Index of the task in the list.
 * @param {Todo} todo - The todo object containing task details.
 * @param {Todo[]} todos - The array of all todos.
 * @param {React.Dispatch<React.SetStateAction<Todo[]>>} setTodos - Function to update the todos state.
 */
const SingleTask: React.FC<{
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}> = ({ todo, todos, setTodos }) => {
  const handleDelete = () => {
    // Function for deleting a Task from the list
    if (window.confirm("Are you sure? You want to Delete this task?")) {
      setTodos(todos.filter((todoItem) => todoItem.id !== todo.id));
    }
  };
  const handleDone = (id: number) => {
    // Toggle the 'done' state of a todo item
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
          type="checkbox"
          id={`todo-${todo.id}`}
          checked={todo.isDone}
          onChange={() => handleDone(todo.id)}
          className="mr-2"
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
