import { Routes, Route } from "react-router-dom";

//PAGES
import QuizFeature from "./Quiz";
import ResultsPage from "./ResultsPage";
import Flashcard from "./Flashcard";
import AttemptsQuizzesTable from "./AttemptsQuizzes";
// import EditFlashcardPage from "../../EditFlashcardPage";
// import CompletedFlashcardPage from "../../CompletedFlashcardPage";

function TestRoute(){
    return (
        <div>
            <Routes>
                <Route path="/quiz" element={<QuizFeature />} />
                <Route path="/results-page" element={<ResultsPage />} />
                <Route path="/flashcard/:id" element={<Flashcard />} />
                <Route path="/attempts" element={<AttemptsQuizzesTable />} />
                {/* <Route path="/flashcard/:id/edit" element={<EditFlashcardPage />} />
                <Route path="/flashcard/:id/completed" element={<CompletedFlashcardPage />} /> */}
            </Routes>
        </div>
    )
}

export default TestRoute;