import { Routes, Route, Navigate } from "react-router-dom";

//PAGES
import QuizFeature from "./Quiz";
import ResultsPage from "./ResultsPage";
import Flashcard from "./Flashcard";

function TestRoute(){
    return (
        <div>
            <Routes>
                <Route path="/quiz" element={<QuizFeature />} />
                <Route path="/results-page" element={<ResultsPage />} />
                <Route path="/flashcard" element={<Flashcard />} />
            </Routes>
        </div>
    )
}

export default TestRoute;