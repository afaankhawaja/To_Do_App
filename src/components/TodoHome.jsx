// import React, { useState, useEffect, useRef, useCallback } from "react";
// import AddTodoForm from "./AddTodoForm";
// import TodoList from "./TodoList";

import React, { useState, useEffect, useRef, useCallback } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DecorativeElement from "./DecorativeElement";

const TodoHome = () => {
  const [todos, setTodos] = useState([]);
  const todosRef = useRef(todos);

  useEffect(() => {
    todosRef.current = todos;
  }, [todos]);

  useEffect(() => {
    const sortedTodos = [...todos].sort((a, b) => {
      if (a.dueDate && b.dueDate) return new Date(a.dueDate) - new Date(b.dueDate);
      if (!a.dueDate && b.dueDate) return 1;
      if (a.dueDate && !b.dueDate) return -1;
      return a.id - b.id;
    });
    setTodos(sortedTodos);
  }, [todos]);

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  const checkReminder = useCallback(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);  // Set to beginning of day
    
    todosRef.current.forEach(todo => {
      if (todo.dueDate && !todo.completed) {
        const dueDate = new Date(todo.dueDate);
        dueDate.setHours(0, 0, 0, 0);  // Set to beginning of day
        
        const daysDiff = Math.round((dueDate - now) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1 || daysDiff === 0) {
          const message = daysDiff === 0 ? 'due today' : 'due tomorrow';
          if (Notification.permission === 'granted') {
            new Notification(`Reminder: "${todo.text}" is ${message}`);
          } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                new Notification(`Reminder: "${todo.text}" is ${message}`);
              }
            });
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(checkReminder, 3600000); // Check every minute
    return () => clearInterval(intervalId);
  }, [checkReminder]);


const addTodo = (text, dueDate) => {
  const newTodos = [
    ...todos,
    { id: Date.now(), text, completed: false, dueDate },
  ];
  setTodos(newTodos);
  toast.success('Todo added successfully!');
  setTimeout(checkReminder, 0);
};

const toggleTodo = (id) => {
  setTodos(
    todos.map((todo) => {
      if (todo.id === id) {
        const newStatus = !todo.completed;
        toast.info(`Todo marked as ${newStatus ? 'completed' : 'incomplete'}`);
        return { ...todo, completed: newStatus };
      }
      return todo;
    })
  );
};

const deleteTodo = (id) => {
  setTodos(todos.filter((todo) => todo.id !== id));
  toast.error('Todo deleted');
};

// return (
//   <div className="App">
//     <h1>Todo List</h1>
//     <AddTodoForm addTodo={addTodo} />
//     <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
//     <ToastContainer />
//   </div>
// );
// };

// export default TodoHome;
return (
  <div className="app-container">
    <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <ToastContainer />
    </div>
    <div className="decorative-element"><DecorativeElement /></div>
    
  </div>
);
};

export default TodoHome;