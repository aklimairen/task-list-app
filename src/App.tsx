/**
 * Imports for the Todo List application.
 *
 * - React: Core library for building user interfaces.
 * - useState, useEffect: Hooks for managing component state and side effects.
 * - TaskList: Custom component for displaying the todo list. (Located in ./components/taskList)
 * - AddTaskForm: Custom component for adding new todos. (Located in ./components/inputfield)
 * - Todo: Interface for a todo item. (Located in ./components/model)
 *
 */
import React, { useState, useEffect } from "react";
import TaskList from "./components/taskList";
import AddTaskForm from "./components/inputField";
import { Todo } from "./components/model";

// Main entry point: Functional component defining the Todo List application
const App: React.FC = () => {
  // State to manage a list of todo items represented by the Todo interface
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Attempt to retrieve previously saved todos from localStorage
    const savedTodos = localStorage.getItem("todos");
    // If saved todos exist, parse them from JSON format back into an array of Todo objects
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  // State to manage a list of completed todo items represented by the Todo interface
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  // useEffect hook: Whenever 'todos' state changes, save the updated list to localStorage
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

        {/* List of todos and completed todos */}
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
