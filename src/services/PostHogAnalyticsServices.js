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
    posthog.capture(`User clicked into flashcard`, {testID: testID});
}

function trackReattemptQuiz(testID){
    posthog.capture(`User reattempted quiz with testID`, {testID: testID});
}

function trackEditFlashcard(testID, questionNo){
    posthog.capture(`Flashcard Question Edited`, {testID: testID, questionNo: questionNo })
}

function trackSpaceRepAlgoClicked(){
    posthog.capture(`Space repetition algo clicked`)
}

function trackAccountDeletion(email){
    posthog.capture(`User ${email} deleted account`)
}

function trackFlashcardUsage(testID, questionNo) {
    posthog.capture(`Revised Flashcard till Question ${questionNo}`, {testID: testID});

}

function trackFollowedRevisionSchedule(isRevisionDate){
    let isCorrect = true;
    if (isRevisionDate == "N"){ isCorrect = false; }
    posthog.capture("User revised according to schedule?", {isCorrect: isCorrect});
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
    trackSpaceRepAlgoClicked,
    trackAccountDeletion,
    trackFlashcardUsage,
    trackFollowedRevisionSchedule
};