import React, { useEffect, useState } from "react";
import { Todo } from "./model";
import SingleTodo from "./singleTask";

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
  const [dataFetched, setDataFetched] = useState<boolean>(false); // State to track if data is fetched
  const [loading, setLoading] = useState<boolean>(false); // State to track loading status
  const [fetchMessage, setFetchMessage] = useState<string>(""); // State to hold fetch message

  // Filter the todos based on the current filter selection
  const filteredTodos = todos.filter((todo) => {
    if (filter === "done") return todo.isDone;
    if (filter === "open") return !todo.isDone;
    return true;
  });

  const fetchData = async () => {
    /**
     * Fetches data from the API endpoint and updates the todo list with new tasks if available.
     * Sets loading state during the fetch operation and handles messages based on fetch results.
     */
    if (dataFetched) {
      setFetchMessage("You have already fetched all the data.");
      return;
    }
    setLoading(true);
    setFetchMessage("");

    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/typicode/demo/posts"
      );
      const data = await response.json();

      // Filter out tasks already in the todo list and create new todo objects
      const existingIds = todos.map((todo) => todo.id);
      const newTodos = data
        .filter((item: any) => !existingIds.includes(item.id))
        .map((item: any) => ({
          id: item.id,
          todo: item.title,
          isDone: false,
        }));

      if (newTodos.length > 0) {
        setTodos((prevTodos) => [...prevTodos, ...newTodos]);
      } else {
        setFetchMessage("No new tasks to fetch.");
      }

      setDataFetched(true); // Mark data as fetched
    } catch (error) {
      console.error("Failed to fetch data", error);
      setFetchMessage("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  // Manage the visibility of fetch messages (Clears the fetch message after 3 seconds if a message is present).
  useEffect(() => {
    if (fetchMessage) {
      const timeoutId = setTimeout(() => setFetchMessage(""), 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [fetchMessage]);

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
      {/* Display fetch message */}
      {fetchMessage && (
        <p className="text-center text-red-700">{fetchMessage}</p>
      )}{" "}
      {/* Button to fetch data  */}
      <button
        onClick={fetchData}
        disabled={loading}
        className="px-4 py-4 rounded-full text-white font-medium text-center bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none  absolute -bottom-14 left-1/2 transform -translate-x-1/2"
      >
        {loading ? "Loading tasks..." : "Load previous tasks ..."}
      </button>
    </div>
  );
};

export default TaskList;
