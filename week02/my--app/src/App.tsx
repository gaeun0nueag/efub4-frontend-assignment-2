import React, { useContext, useReducer, useRef, useState } from "react";
import "./App.css";
import { TodoEditor } from "./components/TodoEditor";
import { Todo } from "./types";
import TodoItem from "./components/TodoItem";
type Action =
    | {
          type: "CREATE";
          data: {
              id: number;
              content: string;
          };
      }
    | {
          type: "DELETE";
          id: number;
      };

function reducer(state: Todo[], action: Action) {
    switch (action.type) {
        case "CREATE": {
            return [...state, action.data];
        }
        case "DELETE": {
            return state.filter((it) => it.id !== action.id);
        }
    }
}

export const TodoStateContext = React.createContext<Todo[] | null>(null);

export const TodoDispatchContext = React.createContext<{
    onClickAdd: (text: string) => void;
    onClickDelete: (id: number) => void;
} | null>(null);

export function useTodoDispatch() {
    const dispatch = useContext(TodoDispatchContext);

    if (!dispatch) throw new Error("TodoDispatchContext에 문제 발생");
    return dispatch;
}

function App() {
    const [text, setText] = useState("");
    const [todos, dispatch] = useReducer(reducer, []);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const idRef = useRef(0);

    const onClickAdd = (text: string) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current++,
                content: text,
            },
        });
    };

    const onClickDelete = (id: number) => {
        dispatch({
            type: "DELETE",
            id: id,
        });
    };

    return (
        <div>
            <h1>Todo</h1>
            <TodoStateContext.Provider value={todos}>
                <TodoDispatchContext.Provider
                    value={{ onClickAdd, onClickDelete }}
                >
                    <TodoEditor>
                        <div>오늘의 할일</div>
                    </TodoEditor>

                    <div className="App">
                        {todos.map((todo) => (
                            <TodoItem key={todo.id} {...todo} />
                        ))}
                    </div>
                </TodoDispatchContext.Provider>
            </TodoStateContext.Provider>
        </div>
    );
}

export default App;
