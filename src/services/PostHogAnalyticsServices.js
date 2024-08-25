import posthog from 'posthog-js';

function identifyUser(email){
    posthog.identify(`${email}`);
}

function trackSignIn(){
    posthog.capture('User signed in');
}

function trackLogOut(){
    posthog.capture('User logged out');
}

function trackRegistration(){
    posthog.capture('Registered for an account');
}

function trackFlashcardClicked(){
    posthog.capture('User clicked into flashcard');
}

export {identifyUser, trackSignIn, trackLogOut, trackRegistration, trackFlashcardClicked};