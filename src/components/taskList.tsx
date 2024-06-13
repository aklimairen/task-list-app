import React, { useState } from "react";
import { Todo } from "./model";
import SingleTodo from "./singleTask";
import LoadPreviousTask from "./addPreviousTask";

/**
 * TaskList component: Manages the list of todo items and their display.
 * @param {Todo[]} props.todos - Array of todo objects representing the todo list.
 * @param {React.Dispatch<React.SetStateAction<Todo[]>>} props.setTodos - Function to update the todos state.
 * @param {Todo[]} props.completedTodos - Array of completed todo objects.
 * @param {React.Dispatch<React.SetStateAction<Todo[]>>} props.setCompletedTodos - Function to update the completedTodos state.
 *
 */
interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TaskList: React.FC<Props> = ({ todos, setTodos }) => {
  // State to manage the current filter for displaying todos (all, done, open)
  const [filter, setFilter] = useState<string>("all");

  // Filter the todos based on the current filter selection
  const filteredTodos = todos.filter((todo) => {
    if (filter === "done") return todo.isDone;
    if (filter === "open") return !todo.isDone;
    return true;
  });

  return (
    <div className="relative">
      {/* Todo filter buttons */}
      <div className="filter-buttons">
        <button
          className="px-4 py-1 text-sm text-sky-600 bg-white font-medium uppercase rounded-full border border-sky-200 hover:text-white hover:bg-sky-600 hover:border-transparent focus:outline-none"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className="px-4 py-1 mx-1 text-sm text-sky-600 bg-white font-medium uppercase rounded-full border border-sky-200 hover:text-white hover:bg-sky-600 hover:border-transparent focus:outline-none"
          onClick={() => setFilter("done")}
        >
          Done
        </button>
        <button
          className="px-4 py-1 text-sm text-sky-600 bg-white font-medium uppercase rounded-full border border-sky-200 hover:text-white hover:bg-sky-600 hover:border-transparent focus:outline-none"
          onClick={() => setFilter("open")}
        >
          Open
        </button>
      </div>
      {/* List of Todo Items  */}
      <ul className="py-6 divide-y divide-slate-200">
        {filteredTodos.map((todo, index) => (
          <SingleTodo
            index={index}
            todos={todos}
            todo={todo}
            key={todo.id}
            setTodos={setTodos}
          />
        ))}
      </ul>
      {/* JSX: Load previous task  */}
      <LoadPreviousTask setTodos={setTodos} todos={todos} />
    </div>
  );
};

export default TaskList;
