export function fileTypeIsPDF(file){
    const fileType = file.type; // this is how file type looks like if u console.log() it: "application/pdf"
    const indexOfSlash = fileType.lastIndexOf('/');
    const fileTypeString = fileType.slice(indexOfSlash);

    if(fileTypeString === '/pdf'){
        return true;
    }

    return false;
}

export function fileSizeWithinLimit(file){
    const fileSize = file.size;
    
    if(fileSize <= (5 * 10**6)){
        return true;
    }

    return false;
}

export function convertFileSizeTo2DP(file){
    const fileSize = Math.round(file.size / (10**4)) / 100 // In MB, rounded off to 2dp
    return fileSize;
}