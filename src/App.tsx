import React from "react";
import "./App.css";
import Todo from "./Todo";

type Todo = {
  todo: string;
  isCompleted: boolean;
};

function App() {
  const [todos, setTodos] = React.useState<Todo[]>(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );
  const [todo, setTodo] = React.useState<Todo["todo"]>("");

  const onAddTodo = () => {
    const newTodos = [...todos, { todo, isCompleted: false }];

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const onClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const newTodos = [...todos, { todo, isCompleted: false }];
    if (e.key === "Enter") {
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  };

  const onCompleteTodo = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = e.target.checked;
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen p-2">
        <div className="bg-slate-500 w-[800px]">
          <div className="flex items-center mb-10 border border-solid">
            <input
              type="text"
              name="todo"
              id="todo"
              onChange={(e) => setTodo(e.target.value)}
              onKeyDown={onClickEnter}
              placeholder="Add a new todo"
              className="basis-[80%] outline-none h-[40px] p-2"
            />
            <button
              type="button"
              className="basis-[20%] bg-black text-white h-[40px] p-2"
              onClick={onAddTodo}
            >
              Add
            </button>
          </div>
          <div className="p-5 ">
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo.todo}
                todoIndex={index}
                todos={todos}
              />
            ))}
          </div>
          <p className="p-5 text-base font-semibold text-center text-white">
            Hello World
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
