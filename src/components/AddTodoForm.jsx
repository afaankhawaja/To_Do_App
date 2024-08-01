import React, { useState } from "react";
import { TextField, Button } from '@mui/material';

const AddTodoForm = ({ addTodo }) => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text, dueDate);
    setText("");
    setDueDate("");
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        fullWidth
        margin="normal"
      />
      <TextField
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Todo
      </Button>
    </form>
  );
};

export default AddTodoForm;