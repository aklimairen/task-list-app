# Task List App

## Introduction
I have developed the task management application using [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/). This project initialized with [Vite](https://vitejs.dev/). It includes some features such as adding tasks, filtering tasks, marking tasks as complete, and removing tasks. Detailed instructions on how to run this application are provided below.


### Clone the repository and run

```
Bash
git clone https://github.com/aklimairen/task-list-app.git

cd task-list-app  # Change the directory to project's folder
npm install  # Install dependencies 
npm run dev  # Start the development server
```

### Prerequisites

```
Node.js and npm (or yarn) installed on your system.
```



### Tech stack

```
Core:
- ReactJS
- TypeScript
- TailwindCSS

Communication tool:
- fetch
```


## Task List
Below is the list of tasks and their completion status, outlining what I was supposed to do as part of the take-home challenge and what has been accomplished:

- [x] Add new tasks.
- [x] Mark tasks as complete.
- [x] Filter tasks based on their completion status.
- [x] Persist tasks in local storage so that they remain after a page refresh.
- [x] Click a “Load previous tasks ...” - button on the bottom of the list, that calls this API
(https://my-json-server.typicode.com/typicode/demo/posts)
- [x] During the API call, the button should be disabled and a text with "Loading tasks..." should be
shown until the posts are loaded. When the posts are loaded, present them in the same list
layout as "Today’s Tasks”. If an error occurs during the process, show the error message “Tasks
could not be loaded.”
- [x] Add the ability to delete tasks.
- [x] Implement a confirmation dialog before deleting a task.
- [x] Use a CSS framework like Tailwind CSS for styling.
- [ ] Add a due date to tasks and sort them based on the due date.


## Preview

<img src="/preview.png" height="500" style="border-radius:10px;margin-bottom:1rem;" />
