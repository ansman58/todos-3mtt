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

  const saveTodo = () => {
    const newTodos = [...todos, { todo, isCompleted: false }];

    setTodos(newTodos);
    setTodo("");
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const onAddTodo = () => {
    if (!todo) return;
    saveTodo();
  };

  const onClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveTodo();
    }
  };

  const onCompleteTodo = (todo: ITodo) => {
    const newTodos = [...todos];
    const index = newTodos.indexOf(todo);
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const onDeleteTodo = (todo: ITodo) => {
    const updateTodos = todos.filter((t) => t !== todo);
    setTodos(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
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
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              onKeyDown={onClickEnter}
              placeholder="Add a new todo"
              className="basis-[80%] outline-none h-[40px] p-2 rounded-none"
            />
            <button
              type="button"
              className="basis-[20%] bg-black text-white h-[40px] p-2"
              onClick={onAddTodo}
            >
              Add
            </button>
          </div>
          <div className="p-5 max-h-[400px] overflow-y-auto">
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo.todo}
                todoIndex={index}
                todos={todos}
                setChecked={setChecked}
                onDeleteTodo={() => onDeleteTodo(todo)}
                onCompleteTodo={() => onCompleteTodo(todo)}
              />
            ))}
          </div>
          {noOfCompletedTodos ? (
            <p className="p-5 text-base font-semibold text-center text-white">
              {noOfCompletedTodos} of {todos.length} items completed
            </p>
          ) : (
            ""
          )}
          <div className="bg-slate-900 text-white  w-[800px] p-5">
            <h2 className="text-lg font-bold">Tips</h2>
            <ol className="list-decimal">
              <li>Use the input field to add a new todo</li>
              <li>Click on the checkbox to mark a todo as completed</li>
              <li>Click on the delete icon to delete a todo</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
