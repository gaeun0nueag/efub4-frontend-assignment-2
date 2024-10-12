import { ReactElement, useContext, useState } from "react";
import { TodoDispatchContext, useTodoDispatch } from "../App";

interface Props {
    children: ReactElement;
}

export function TodoEditor(props: Props) {
    const dispatch = useTodoDispatch();
    const [text, setText] = useState<string>("");

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const onClickButton = () => {
        dispatch.onClickAdd(text);
        setText("");
    };
    return (
        <div>
            {props.children}
            <input value={text} onChange={onChangeInput} />
            <button onClick={onClickButton}>추가</button>
        </div>
    );
}
