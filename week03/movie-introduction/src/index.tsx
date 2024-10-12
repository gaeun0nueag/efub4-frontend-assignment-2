// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./components/reducer";

const store = createStore(reducer);
const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error(
        "Root element not found. Make sure there is an element with id 'root' in your index.html."
    );
}

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);

// 성능 측정을 위한 함수
reportWebVitals();
