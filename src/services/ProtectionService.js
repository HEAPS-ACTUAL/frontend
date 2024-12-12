import { identifyUser, trackLogOut, trackSignIn } from "./PostHogAnalyticsServices";

function isLoggedIn() {
    // return !!sessionStorage.getItem("userEmail");
    return true; // UNCOMMENT THIS LINE AND COMMENT THE ABOVE TO BYPASS THE PROTECTION
}

function handleLogOut() {
    trackLogOut();
    sessionStorage.clear();
    window.dispatchEvent(new Event("logInOut"));
}

function handleLogIn(email) {
    sessionStorage.setItem("userEmail", email);
    identifyUser(email);
    trackSignIn();
    window.dispatchEvent(new Event("logInOut"));
}

export { isLoggedIn, handleLogOut, handleLogIn };
