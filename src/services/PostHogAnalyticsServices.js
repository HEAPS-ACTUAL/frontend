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

function trackTelegramButtonClicked(){
    posthog.capture('Telegram button clicked');
}

function trackFeaturesPageClicked(){
    posthog.capture('User entered features page')
}

function trackFlashcardClicked(testID){
    posthog.capture(`User clicked into flashcard with testID ${testID}`);
}

function trackReattemptQuiz(testID){
    posthog.capture(`User reattempted quiz with testID ${testID}`);
}

function trackEditFlashcard(testID, questionNo){
    posthog.capture(`Edited question ${questionNo} of flashcard testID ${testID}`)
}

function trackSpaceRepAlgoClicked(testID, questionNo){
    posthog.capture(`Space repetition algo clicked`)
}

export {
    identifyUser,
    trackSignIn,
    trackLogOut, 
    trackRegistration, 
    trackTelegramButtonClicked, 
    trackFeaturesPageClicked,
    trackFlashcardClicked, 
    trackReattemptQuiz,
    trackEditFlashcard,
    trackSpaceRepAlgoClicked
};