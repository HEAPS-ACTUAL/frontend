import React from "react";
import '../styles/CQquizzes.css';
import CQSideBar from "./CQsideBar";

function CQquizzes(){

    return(
        <>
            <CQSideBar />

            <div className="container">
                <div className='greeting'>
                    <div className='name'>Hello Arin, </div>
                    <div className='line'> ready to conquer some new knowledge today?</div>
                </div>
            </div>
        </>
    );
}

export default CQquizzes;