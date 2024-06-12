import React, { useEffect, useState } from "react";
import { Todo } from "./model";
import SingleTodo from "./singleTask";

/**
 * TaskList component: Manages the list of todo items and their display.
 *
 * @param {Object} props - Component properties.
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

  // Function to fetch data from the API and update the todo list
  const fetchData = async () => {
    if (dataFetched) {
      setFetchMessage("You have already fetched all the data.");
      return;
    }

    setLoading(true); // Set loading to true before starting the fetch
    setFetchMessage(""); // Clear any previous messages

    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/typicode/demo/posts"
      ); // Replace with your API URL
      const data = await response.json();

      const existingIds = todos.map((todo) => todo.id);
      const newTodos = data
        .filter((item: any) => !existingIds.includes(item.id)) // Filter out items with existing IDs
        .map((item: any) => ({
          id: item.id,
          todo: item.title,
          isDone: false, // Assuming new todos from API are not done
        }));

      if (newTodos.length > 0) {
        setTodos((prevTodos) => [...prevTodos, ...newTodos]); // Use functional update to avoid stale state
      } else {
        setFetchMessage("No new tasks to fetch.");
      }

      setDataFetched(true); // Set the dataFetched state to true
    } catch (error) {
      console.error("Failed to fetch data", error);
      setFetchMessage("Failed to fetch data.");
    } finally {
      setLoading(false); // Set loading to false after the fetch is complete
    }
  };

  // useEffect hook to handle fetch message visibility
  useEffect(() => {
    if (fetchMessage) {
      // Set a timeout to hide the message after 3 seconds
      const timeoutId = setTimeout(() => setFetchMessage(""), 3000);

      // Cleanup function to clear the timeout when the component unmounts
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
        className="px-4 py-4 rounded-full text-white font-medium text-center bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none  absolute -bottom-14 left-0 right-0  my-0 mx-auto max-w-56"
      >
        {loading ? "Loading tasks..." : "Load previous tasks ..."}
      </button>
    </div>
  );
};

export default TaskList;
