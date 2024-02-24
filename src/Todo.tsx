import React from "react";
import DeleteIcon from "./icons/DeleteIcon";

interface TodoProps {
  todo: string;
  todoIndex: number;
  todos: { todo: string; isCompleted: boolean }[];
}

const Todo = (props: TodoProps) => {
  const [completed, setCompleted] = React.useState(props.todos[props.todoIndex].isCompleted);

  const onCompleteTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodos = [...props.todos];
    newTodos[props.todoIndex].isCompleted = e.target.checked;
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setCompleted(e.target.checked); 
  };

  return (
    <div className="flex items-center justify-between mb-5">
      <div className="p-2 border border-white rounded-md basis-[95%]">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="check"
            onChange={onCompleteTodo}
            checked={completed}
            id="check"
            className="w-5 h-5 outline-none cursor-pointer"
          />
          <p
            className={`${
              completed ? "line-through text-white" : "text-white"
            } `}
          >
            {props.todo}
          </p>
        </div>
      </div>
      <DeleteIcon className="text-red-500 cursor-pointer" />
    </div>
  );
};

export default Todo;
