import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as pdfjsLib from "pdfjs-dist";
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react';

posthog.init(
    'phc_TnB61oDLTAprywGWtLK92oY8VjSOKsMdpubWh6xZ29P',
    {
        api_host: 'https://us.i.posthog.com',
        person_profiles: 'identified_only',
        autocapture: false
    }
)

// Set the path to the worker script before any other imports that might use pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <PostHogProvider client={posthog}>
            <App />
        </PostHogProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
