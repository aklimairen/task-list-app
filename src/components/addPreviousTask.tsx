import React, { useEffect, useState } from "react";
import { Todo } from "./model";

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
}

const LoadPreviousTask: React.FC<Props> = ({ setTodos, todos }) => {
  const [dataFetched, setDataFetched] = useState<boolean>(false); // State to track if data is fetched
  const [loading, setLoading] = useState<boolean>(false); // State to track loading status
  const [fetchMessage, setFetchMessage] = useState<string>(""); // State to hold fetch message

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

      setDataFetched(true);
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
    <>
      {fetchMessage && (
        <p className="text-center text-red-700 absolute -bottom-5 left-1/2 transform -translate-x-1/2 ">
          {fetchMessage}
        </p>
      )}
      <button
        onClick={fetchData}
        disabled={loading}
        className="px-4 py-4 rounded-full text-white font-medium text-center bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none absolute -bottom-14 left-1/2 transform -translate-x-1/2 min-w-52"
      >
        {loading ? "Loading tasks..." : "Load previous tasks ..."}
      </button>
    </>
  );
};

export default LoadPreviousTask;
