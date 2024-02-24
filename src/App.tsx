import React from "react";
import "./App.css";
import Todo from "./Todo";

export type ITodo = {
  todo: string;
  isCompleted: boolean;
};

function App() {
  const [todos, setTodos] = React.useState<ITodo[]>(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );
  const [todo, setTodo] = React.useState<ITodo["todo"]>("");
  const [noOfCompletedTodos, setNoOfCompletedTodos] = React.useState(0);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setNoOfCompletedTodos(todos.filter((todo) => todo.isCompleted).length);
  }, [todos, checked]);

  const onAddTodo = () => {
    const newTodos = [...todos, { todo, isCompleted: false }];

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const onClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newTodos = [...todos, { todo, isCompleted: false }];
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
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
                setTodos={setTodos}
                setChecked={setChecked}
              />
            ))}
          </div>
          <p className="p-5 text-base font-semibold text-center text-white">
            {noOfCompletedTodos} of {todos.length} items completed
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
