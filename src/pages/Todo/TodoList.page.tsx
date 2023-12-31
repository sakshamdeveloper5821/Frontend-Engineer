import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  List,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { Add, Logout } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { default as TodoList } from "../../components/NestedTodos";
import { useStore } from "../../context";
import AuthWapper from "../../components/AuthWapper";

// Define the type for a single todo item
export interface todoType {
  id: string;
  text: string;
  subTodos?: todoType[];
}

const NestedTodoList: React.FC = () => {
  const { state, dispatch } = useStore();
  const key = state?.user?.email || "Default";
  
  // Initialize the todos state using the user's stored data or an empty array
  const [todos, setTodos] = useState<todoType[]>([
    ...JSON.parse(localStorage.getItem(key) || "[]"),
  ]);
  
  const [inputValue, setInputValue] = useState<string>("");
  const [openTodo, setOpenTodo] = useState<string[]>([]);

  useEffect(() => {
    // Update the user's todo list in the local storage when todos change
    if (state?.user?.email) {
      localStorage.setItem(state?.user?.email, JSON.stringify(todos));
    }
  }, [todos, state?.user?.email]);

  // Function for adding a new todo
  // parentId is optional and indicates the parent todo if present
  const handleAddTodo = (parentId: string | null = null) => {
    if (inputValue.trim() !== "") {
      const newTodo: todoType = {
        id: uuidv4(),
        text: inputValue,
      };

      if (parentId) {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === parentId) {
            return {
              ...todo,
              subTodos: [...(todo.subTodos || []), newTodo],
            };
          }
          return todo;
        });
        setTodos(updatedTodos);
      } else {
        setTodos([...todos, newTodo]);
      }

      setInputValue(""); // Clear the input value after adding a todo
    }
  };

  // Toggle the visibility of a todo's sub-todos
  const handleToggleTodo = (todoId: string) => {
    if (openTodo.includes(todoId)) {
      setOpenTodo(openTodo.filter((id) => id !== todoId));
    } else {
      setOpenTodo([...openTodo, todoId]);
    }
  };

  // Delete a todo by ID
  // parentId is optional and indicates the parent todo if present
  const handleDeleteTodo = (todoId: string, parentId: string | null = null) => {
    if (parentId) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === parentId) {
          const updatedSubTodos = (todo.subTodos || []).filter(
            (subTodo) => subTodo.id !== todoId
          );
          return {
            ...todo,
            subTodos: updatedSubTodos.length ? updatedSubTodos : undefined,
          };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } else {
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(updatedTodos);
    }
  };

  // Function for adding a sub-task to a todo
  // parentId is optional and indicates the parent todo if present
  const handleAddTodoSub = (
    subTask: string,
    parentId: string | null = null
  ) => {
    if (subTask.trim() !== "") {
      const newTodo: todoType = {
        id: uuidv4(),
        text: subTask,
      };

      if (parentId) {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === parentId) {
            return {
              ...todo,
              subTodos: [...(todo.subTodos || []), newTodo],
            };
          }
          return todo;
        });
        setTodos(updatedTodos);
      } else {
        setTodos([...todos, newTodo]);
      }

      setInputValue(""); // Clear the input value after adding a todo
    }
  };
// For logging out user
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthWapper>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nested Todo List
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <TextField
              label="Add Todo"
              variant="outlined"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  handleAddTodo();
                }
              }}
              fullWidth
              sx={{ marginBottom: "10px" }}
            />
            <Button
              variant="contained"
              onClick={() => handleAddTodo()}
              startIcon={<Add />}
              fullWidth
              sx={{ marginBottom: "10px" }}
            >
              Add
            </Button>
            <List>
              {/* Render the nested todo list */}
              {todos.map((todo) => (
                <TodoList
                  todo={todo}
                  handleDeleteTodo={handleDeleteTodo}
                  handleAddTodo={handleAddTodoSub}
                  handleToggleTodo={handleToggleTodo}
                  openTodo={openTodo}
                />
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </AuthWapper>
  );
};

export default NestedTodoList;
