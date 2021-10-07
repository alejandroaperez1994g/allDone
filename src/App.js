import "./App.css";
import * as React from "react";
import { useEffect, useState } from "react";
import Todo from "./views/Todo";
import db from "./firebase";
import firebase from "firebase";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import FlareIcon from "@mui/icons-material/Flare";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles, Typography, Container } from "@material-ui/core";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [showButtons, setShowButtons] = React.useState(false);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      alignItems: "center",
      borderColor: "text.primary",
      paddingTop: "10px",
      marginLeft: "-15px",
      position: "relative",
    },
    container2: {
      display: "flex",
      alignItems: "center",
      // position: "absolute",
      // right: "10px",
      // right: -750,
    },
    item: {
      display: "flex",
      border: theme.spacing(1),
      cursor: "Pointer",
      border: "1px solid #000",
      borderRadius: "5px",
      padding: "5px",
      marginRight: 3,
      [theme.breakpoints.down("md")]: {
        text: {
          display: "none",
        },
      },
    },
    itemCancel: {
      display: "flex",
      border: theme.spacing(1),
      cursor: "Pointer",
      // border: "1px solid #000",
      borderRadius: "5px",
      padding: "5px",
      [theme.breakpoints.down("lg")]: {
        itemCancel: {
          display: "none",
          border: "0px",
        },
      },
    },
    itemAdd: {
      // [theme.breakpoints.down("md")]: {
      display: "flex",
      border: theme.spacing(1),
      cursor: "Pointer",
      border: "1px solid #000",
      borderRadius: "5px",
      padding: "5px",
      // },
    },
    icon: {
      marginRigth: theme.spacing(2),
    },
    textAdd: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    text: {
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
  }));

  const classes = useStyles();
  // Cuando la aplicacion carge debemos obtener los datos de firestore
  useEffect(() => {
    //this fires when the apps.js loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().text,
            date: doc.data().timestamp,
          }))
        );
      });
  }, [input]);

  const addTodo = (event) => {
    event.preventDefault();
    db.collection("todos").add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    setShowButtons("false");
  };

  const onClick = () => setShowButtons(true);

  return (
    <div className="App">
      <section className="glass">
        <div className="games">
          <div className="status">
            <h1>Tasks</h1>
            <form>
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onClick={onClick}
              />
              <Container className={classes.container}>
                <div className={classes.item}>
                  <OpenInFullOutlinedIcon className={classes.icon} />
                  <Typography className={classes.text}>Open</Typography>
                </div>
                <div className={classes.item}>
                  <CalendarTodayOutlinedIcon className={classes.icon} />
                  <Typography className={classes.text}>Today</Typography>
                </div>
                <div className={classes.item}>
                  <LockOpenOutlinedIcon className={classes.icon} />
                  <Typography className={classes.text}>Public</Typography>
                </div>
                <div className={classes.item}>
                  <FlareIcon className={classes.icon} />
                  <Typography className={classes.text}>Normal</Typography>
                </div>
                <div className={classes.item}>
                  <CircleOutlinedIcon className={classes.icon} />
                  <Typography className={classes.text}>Estimation</Typography>
                </div>
                <Container className={classes.container2}>
                  <div className={classes.itemCancel}>
                    <Typography className={classes.text}>Cancel</Typography>
                  </div>
                  <div className={classes.itemAdd} onClick={addTodo}>
                    <AddIcon className={classes.iconAdd} />
                    <Typography className={classes.textAdd}>Add</Typography>
                  </div>
                </Container>
              </Container>
            </form>
          </div>
          <div className="cards">
            {todos.map((todo) => (
              <Todo key={todo.uid} todo={todo} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
