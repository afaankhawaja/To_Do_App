import React from "react";
import { Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  const formatDate = (dueDateString) => {
    if (!dueDateString) return "";
    const date = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dueDateString).toLocaleDateString(undefined, date);
  };
  
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label className="todo-label">
        <Checkbox
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          color="primary"
        />
        <span className="todo-text">{todo.text}</span>
      </label>
      {todo.dueDate && <span className="due-date">Due: {formatDate(todo.dueDate)}</span>}
      <IconButton onClick={() => deleteTodo(todo.id)} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </li>
  );
}

export default TodoItem;