import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ProgressRing({percentage}){
    return (
        <div>
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
    )
}

export default ProgressRing