function checkLogInStatus(){
    if(sessionStorage.getItem('userEmail')){
        return true;
    }
    else{
        return false;
    }
};

export default checkLogInStatus;