import React, { useState, useEffect } from "react";
import TaskList from "./components/taskList";
import AddTaskForm from "./components/addTask";
import { Todo } from "./components/model";

const App: React.FC = () => {
  /**
   * Manages the todo list and completed todos using React hooks.
   * Retrieves todos from localStorage during initialization and persists todos
   * to localStorage whenever the todos state updates.
   */
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      {/* Main container */}
      <div className="App py-8 px-8 my-8 md:max-w-[500px] mx-auto bg-neutral-100 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-black">Today’s Tasks</h3>
        {/* Form for adding new tasks */}
        <AddTaskForm todos={todos} setTodos={setTodos} />

        {/* List of all Tasks */}
        <TaskList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </>
  );
};

export default App;
