import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import MovieDetails from "./components/MovieDetails";

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
