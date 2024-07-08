import React from "react";
import Table from './Table';

import styles from '../../styles/AttemptsQuizzes.module.css';

import React from 'react';
import Table from './Table';

function AttemptsQuizzesTable () {

    let data = [
        {attempt1: {
            TestID: 1,
            AttemptNo: 1,
            NumOfCorrectAnswers: 10,
            TotalNumOfQuestions: 20

        }}
    ]
    {this.state.data.map(( listValue, index ) => {
        return (
          <tr key={index}>
            <td>{listValue.id}</td>
            <td>{listValue.title}</td>
            <td>{listValue.price}</td>
          </tr>
        );
      })}
}
