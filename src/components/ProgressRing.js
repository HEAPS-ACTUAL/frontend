import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ProgressRing(){
    return (
        <div>
            <CircularProgressbar value={66} text={`${66}%`} />
        </div>
    )
}

export default ProgressRing