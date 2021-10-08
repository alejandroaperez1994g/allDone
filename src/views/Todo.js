import "../views/Todo.css";
import db from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@mui/material/Chip";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LinkIcon from "@mui/icons-material/Link";
import TagIcon from "@mui/icons-material/Tag";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Checkbox from "@mui/material/Checkbox";

function Todo(props) {
  let regExEmail =
    /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  let regExUrl =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  const classify = (todo) => {
    if (todo.includes("#")) {
      return (
        <Chip
          key={todo}
          label={todo.substr(1)}
          color="secondary"
          size="small"
          variant="filled"
          icon={<TagIcon />}
          sx={{ marginRight: 0.2, cursor: "pointer" }}
        />
      );
    } else if (todo.match(regExEmail)) {
      return (
        <Chip
          key={todo}
          label={todo}
          color="warning"
          size="small"
          variant="filled"
          icon={<MailOutlineIcon />}
          sx={{ marginRight: 0.2, cursor: "pointer" }}
        />
      );
    } else if (todo.includes("@")) {
      return (
        <Chip
          key={todo}
          label={todo.substr(1)}
          color="success"
          size="small"
          variant="filled"
          icon={<AlternateEmailIcon />}
          sx={{ marginRight: 0.2, cursor: "pointer" }}
        />
      );
    } else if (todo.match(regExUrl)) {
      return (
        <Chip
          key={todo}
          label={todo}
          color="info"
          size="small"
          variant="filled"
          icon={<LinkIcon />}
          sx={{ marginRight: 0.2, cursor: "pointer" }}
        />
      );
    } else {
      return <h4>{todo}</h4>;
    }
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className="body">
      <div class="card">
        <Checkbox
          {...label}
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
        />
        <div class="card-info">
          {props.todo.todo.split(" ").map((item) => {
            return classify(item);
          })}
        </div>
        <div class="date">
          {new Date(props.todo.date?.seconds * 1000).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default Todo;
