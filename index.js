import express from "express";
import dotenv from "dotenv";
import { deleteTask, getTask, getTasks, patchTask } from "./src/app.js";

// Load Environment variables
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.redirect("/tasks");
});

app.get("/tasks", (req, res) => {
  res.json(getTasks());
});

app.get("/tasks/:id", (req, res) => {
  let id = Number(req.params.id);
  getTask(id)
    .then((task) => {
      res.json(task);
    })
    .catch((e) => {
      res.json({
        message: e,
      });
    });
});

app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  patchTask(id, body)
    .then((success) => {
      if (success) {
        res.json({ message: "Task updated" });
      } else {
        res
          .status(500)
          .json(res.json({ message: "Could not update the task" }));
      }
    })
    .catch((e) => {
      res.json({ message: e });
    });
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  deleteTask(id)
    .then((success) => {
      if (success) {
        res.json({ message: "Task deleted" });
      } else {
        res.status(500).json({ message: "Could no delete the task" });
      }
    })
    .catch((e) => {
      res.json({ message: e });
    });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
