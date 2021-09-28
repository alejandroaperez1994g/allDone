import React, { useState } from "react";
import "../views/Todo.css";
import db from "../firebase";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    alignItems: "center",
    justifyContent: "center",
    height: "15%",
    width: "75%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    background: "black",
    opacity: 0.7,
    borderRadius: 10,
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);

  const updateTodo = () => {
    db.collection("todos")
      .doc(props.todo.id)
      .set({ text: input }, { merge: true });

    setOpen(false);
  };

  let regExEmail =
    /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  let regExUrl =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  let arr = [];

  const checkWord = (word) => {
    if (word.match(regExEmail)) {
      return "Email";
    } else if (word.includes("#")) {
      return "Hastag";
    } else if (word.includes("@")) {
      return "Tag";
    } else if (word.match(regExUrl)) {
      return "Link";
    } else {
      return word;
    }
  };

  const classifyToDO = (todo) => {
    let todoSplit = todo.split(" ");
    todoSplit.map((word) => {
      arr.push(checkWord(word));
    });
    return arr.join(" ");
    // console.log(arr.join(" "));
  };

  // let date = new Date(props.todo.date.seconds);
  // console.log(date);

  return (
    <>
      <Modal
        className={classes.paper}
        style={{ alignItems: "center", justifyContent: "center" }}
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <h1>Edita tu nota</h1>
          <input
            value={input}
            placeholder={props.todo.todo}
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            disabled={!input}
            className="button_edit"
            onClick={updateTodo}
          >
            Close
          </button>
        </div>
      </Modal>
      <div className="body">
        <div class="card">
          <div class="card-info">
            {/* <h2>{`${props.todo.todo}`}</h2> */}
            {/* {classifyToDO(props.todo.todo)} */}
            <div className="buttons"></div>
            <DeleteIcon
              sx={{ cursor: "Pointer" }}
              onClick={(event) =>
                db.collection("todos").doc(props.todo.id).delete()
              }
            />
            <h3>{`${classifyToDO(props.todo.todo)}`}</h3>
          </div>
          <div class="date">
            {new Date(props.todo.date.seconds * 1000).toLocaleString()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
