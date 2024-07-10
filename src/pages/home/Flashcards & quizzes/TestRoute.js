import { Routes, Route } from "react-router-dom";

//PAGES
import QuizFeature from "./Quiz";
import ResultsPage from "./ResultsPage";
import Flashcard from "./Flashcard";
import AttemptsQuizzesTable from "./AttemptsQuizzes";

function TestRoute(){
    return (
        <div>
            <Routes>
                <Route path="/quiz" element={<QuizFeature />} />
                <Route path="/results-page" element={<ResultsPage />} />
                <Route path="/flashcard" element={<Flashcard />} />
                <Route path="/attempts" element={<AttemptsQuizzesTable />} />
            </Routes>
        </div>
    )
}

export default TestRoute;