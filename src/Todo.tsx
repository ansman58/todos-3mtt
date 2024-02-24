import React from "react";
import DeleteIcon from "./icons/DeleteIcon";
import { ITodo } from "./App";

interface TodoProps {
  todo: string;
  todoIndex: number;
  todos: ITodo[];
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteTodo?: () => void;
  onCompleteTodo?: () => void;
}

const Todo = (props: TodoProps) => {
  const [completed, setCompleted] = React.useState(
    props.todos[props.todoIndex].isCompleted
  );

  return (
    <div className="flex items-center justify-between gap-2 mb-5">
      <div className="py-2 px-1 border border-white rounded-md basis-[95%]">
        <div className="flex items-center justify-between gap-2">
          <input
            type="checkbox"
            name="check"
            onChange={(e) => {
              setCompleted(e.target.checked);
              props.onCompleteTodo?.();
            }}
            checked={completed}
            id="check"
            className="w-5 h-5 outline-none cursor-pointer basis-[5%]"
          />
          <p
            className={`${
              completed ? "line-through text" : ""
            }, text-white whitespace-pre-line basis-[95%]`}
          >
            {props.todo}
          </p>
        </div>
      </div>
      <DeleteIcon
        className="text-red-500 cursor-pointer"
        onClick={props.onDeleteTodo}
      />
    </div>
  );
};

export default Todo;
