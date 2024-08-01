// import React from "react";
// import Todoitem from "./Todoitem";
// const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
//   return (
//     <ul>
//         helo
//       {todos.map((todo) => {
//         <Todoitem
//           key={todo.id}
//           todo={todos}
//           toggleTodo={toggleTodo}
//           deleteTodo={deleteTodo}
//         />;
//       })}
//     </ul>
//   );
// };
// export default TodoList;
import React from 'react';
import TodoItem from './Todoitem';

function TodoList({ todos, toggleTodo, deleteTodo }) {
  if (todos.length === 0) {
    return <p className="empty-list">No todos yet. Add one above!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;