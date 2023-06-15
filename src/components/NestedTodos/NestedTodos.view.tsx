import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
} from "@mui/material";
import { Add, ExpandLess, ExpandMore, Delete } from "@mui/icons-material";
import { todoType } from "../../pages/Todo/TodoList.page";

// Define the type for the props passed to the component
interface nestedTodoListType {
  todo: todoType;
  handleDeleteTodo: (todoId: string, parentId: string | null) => void;
  handleToggleTodo: (todoId: string) => void;
  handleAddTodo: (subTask: string, parentId: string | null) => void;
  openTodo: string[];
}
// This component renders a nested todo list item and its sub-todos if any.
// It allows adding sub-todos, toggling the open state of a todo, and deleting todos.
const NestedTodoList = (props: nestedTodoListType) => {
  const { todo, handleDeleteTodo, handleToggleTodo, handleAddTodo, openTodo } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const hasSubTodos = !!(todo.subTodos && todo.subTodos.length);
  const isOpen = openTodo.includes(todo.id);

  return (
    <div key={todo.id}>
      {/* Render the main todo item */}
      <ListItem>
        <IconButton onClick={() => handleToggleTodo(todo.id)}>
          {/* Render the expand/collapse icon based on the open state */}
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
        <ListItemText primary={todo.text} />
        <IconButton onClick={() => handleDeleteTodo(todo.id, null)}>
          <Delete />
        </IconButton>
      </ListItem>
      {/* Render the nested sub-todos if any */}
      {hasSubTodos && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {todo.subTodos?.map((subTodo: todoType) => (
              <div key={subTodo.id}>
                <ListItem>
                  <ListItemText primary={subTodo.text} />
                  <IconButton
                    onClick={() => handleDeleteTodo(subTodo.id, todo.id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItem>
              </div>
            ))}
          </List>
        </Collapse>
      )}
      {/* Render the input field for adding sub-tasks */}
      {isOpen && (
        <div style={{ paddingLeft: 16 }}>
          <TextField
            variant="outlined"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                handleAddTodo(inputValue, todo.id);
              }
            }}
            fullWidth
            placeholder="Add sub-task"
          />
          <Button
            variant="contained"
            onClick={() => {
              handleAddTodo(inputValue, todo.id);
              setInputValue("");
            }}
            startIcon={<Add />}
          >
            Add Sub Task
          </Button>
        </div>
      )}
    </div>
  );
};

export default NestedTodoList;
