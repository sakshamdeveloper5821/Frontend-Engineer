import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NestedTodoList from "../NestedTodos";
import { useState } from "react";

interface todoTypes {
  id: number | string;
  text: string;
  handleDeleteTodo: any;
  isNested?: boolean,
  idx: number
}

const Todo = (props: todoTypes) => {
  const { id, text, handleDeleteTodo , isNested = false , idx} = props;
  const [toogle , setToogle] = useState<boolean>(false);
  
  return (
    <>
      <ListItem key={id}>
        <ListItemText primary={text} />
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={() => handleDeleteTodo(id)}>
            <Delete />
          </IconButton>
          {!isNested && <IconButton edge="end" onClick={() => setToogle(p => !p)}>
            <ExpandMoreIcon />
          </IconButton>}
        </ListItemSecondaryAction>
      </ListItem>
      <NestedTodoList isNestedTodo={isNested} toogle={toogle} idx={idx} id={id}/>
    </>
  );
};

export default Todo;
