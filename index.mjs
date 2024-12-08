import { Command } from "commander";
import fs, { readFileSync } from "fs";

const program = new Command();

let count = 0;

try {
  const data = fs.readFileSync("todos.json", "utf8");
  const todos = JSON.parse(data);
  count = todos.length;
} catch (err) {
  console.log("Writing in File");
}

program.name("todolist").description("CLI for todos").version("1.0.0");

program
  .command("add")
  .description("Add a new todo.")
  .argument("<task>", "name of task")
  .action((task) => {
    try {
      const data = fs.readFileSync("todos.json", "utf8");
      let todos = [];
      if (data) {
        todos = JSON.parse(data);
      }

      const newTodo = { id: count, task: task, completed: false };
      todos.push(newTodo);

      count++;

      fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2), "utf8");
      console.log("Todo added successfully!");
    } catch (err) {
      console.log("Error adding todo", err);
    }
  });

program
  .command("delete")
  .description("Delete a todo.")
  .argument("<id>", "id of the task")
  .action((id) => {
    try {
      const data = fs.readFileSync("todos.json", "utf8");
      let todos = JSON.parse(data);
      todos = todos.filter((todo) => todo.id !== parseInt(id));

      fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2), "utf8");
      console.log("Todo deleted successfully");
    } catch (err) {
      console.log("Error deleting todo");
    }
  });

program
  .command("complete")
  .description("Mark a todo completed.")
  .argument("<id>", "id of the task")
  .action((id) => {
    try {
      const data = fs.readFileSync("todos.json", "utf8");
      let todos = JSON.parse(data);
      const todo = todos.find((task) => task.id === parseInt(id));
      if (todo) {
        todo.completed = true;
        fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2), "utf8");
        console.log("Todo is marked as completed!");
      } else {
        console.log(`Todo with ${id} not found!`);
      }
    } catch (err) {
      console.log("Error deleting todo");
    }
  });

program
  .command("All")
  .description("See all todos.")
  .action(() => {
    const data = fs.readFileSync("todos.json", "utf8");
    if (data) {
      const todos = JSON.parse(data);
      console.log(todos);
    }
  });

program.parse();
