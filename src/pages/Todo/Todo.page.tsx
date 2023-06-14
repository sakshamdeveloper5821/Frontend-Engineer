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



interface Todo {
  id: string;
  text: string;
  subTodos?: Todo[];
}

const NestedTodoList: React.FC = () => {
  const [state, dispatch] = useStore();
  const [todos, setTodos] = useState<Todo[]>([
    ...JSON.parse(localStorage.getItem(state?.user?.email) || "[]"),
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [openTodo, setOpenTodo] = useState<string[]>([]);

  useEffect(() => {
    if (state?.user?.email) {
      localStorage.setItem(state?.user?.email, JSON.stringify(todos));
    }

}, [todos, state?.user?.email]);

  const handleAddTodo = (parentId: string | null = null, subTask?: string) => {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
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

  const handleToggleTodo = (todoId: string) => {
    if (openTodo.includes(todoId)) {
      setOpenTodo(openTodo.filter((id) => id !== todoId));
    } else {
      setOpenTodo([...openTodo, todoId]);
    }
  };

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

  const handleAddTodoSub = (
    parentId: string | null = null,
    subTask: string
  ) => {
    if (subTask.trim() !== "") {
      const newTodo: Todo = {
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
  //   const renderTodo = (todo: Todo) => {
  //     const hasSubTodos = !!(todo.subTodos && todo.subTodos.length);
  //     const isOpen = openTodo.includes(todo.id);

  //     return (
  //       <div key={todo.id}>
  //         <ListItem>
  //           <IconButton onClick={() => handleToggleTodo(todo.id)}>
  //             {isOpen ? <ExpandLess /> : <ExpandMore />}
  //           </IconButton>
  //           <ListItemText primary={todo.text} />
  //           <IconButton onClick={() => handleDeleteTodo(todo.id)}>
  //             <Delete />
  //           </IconButton>
  //         </ListItem>
  //         {hasSubTodos && (
  //           <Collapse in={isOpen} timeout="auto" unmountOnExit>
  //             <List component="div" disablePadding>
  //               {todo.subTodos?.map((subTodo) => (
  //                 <div key={subTodo.id}>
  //                   <ListItem>
  //                     <ListItemText primary={subTodo.text} />
  //                     <IconButton
  //                       onClick={() => handleDeleteTodo(subTodo.id, todo.id)}
  //                     >
  //                       <Delete />
  //                     </IconButton>
  //                   </ListItem>
  //                 </div>
  //               ))}
  //             </List>
  //           </Collapse>
  //         )}
  //         {isOpen && (
  //           <div style={{ paddingLeft: 16 }}>
  //             <TextField
  //               variant="outlined"
  //               value={inputValue}
  //               onChange={(e) => setInputValue(e.target.value)}
  //               onKeyDown={(e) => {
  //                 if (e.key === "Enter") {
  //                   handleAddTodo(todo.id);
  //                 }
  //               }}
  //               fullWidth
  //               placeholder="Add sub-task"
  //             />
  //             <Button
  //               variant="contained"
  //               onClick={() => handleAddTodo(todo.id)}
  //               startIcon={<Add />}
  //             >
  //               Add Sub Task
  //             </Button>
  //           </div>
  //         )}
  //       </div>
  //     );
  //   };

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
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
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
