interface State {
    backgroundColor: string;
    fontColor: string;
}

interface Action {
    type: string;
}

const initialState: State = {
    backgroundColor: "black",
    fontColor: "white",
};

function reducer(state = initialState, action: Action): State {
    switch (action.type) {
        case "white":
            return {
                ...state,
                backgroundColor: "white",
                fontColor: "black",
            };
        case "black":
            return {
                ...state,
                backgroundColor: "black",
                fontColor: "white",
            };
        default:
            return state;
    }
}

export default reducer;
