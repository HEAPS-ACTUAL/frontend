import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
// import workerSrc from "pdfjs-dist/build/pdf.worker.entry";

GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

function fileTypeIsPDF(file) {
  const fileType = file.type; // this is how file type looks like if u console.log() it: "application/pdf"
  const indexOfSlash = fileType.lastIndexOf("/");
  const fileTypeString = fileType.slice(indexOfSlash);

  if (fileTypeString === "/pdf") {
    return true;
  }

  return false;
}

function fileSizeWithinLimit(file) {
  const fileSize = file.size;

  if (fileSize <= 20 * 10 ** 6) {
    return true;
  }

  return false;
}

function convertFileSizeTo2DP(file) {
  const fileSize = Math.round(file.size / 10 ** 4) / 100; // In MB, rounded off to 2dp
  return fileSize;
}

function countWordsInPDF(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = async (e) => {
      const typedArray = new Uint8Array(e.target.result);
      const pdfDoc = await getDocument({ data: typedArray }).promise;
      let totalWords = 0;

      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const textContent = await page.getTextContent();
        const words = textContent.items
          .map((item) => item.str.trim())
          .join(" ")
          .split(/\s+/).length;
        totalWords += words;
      }
      resolve(totalWords);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

export {
  fileTypeIsPDF,
  fileSizeWithinLimit,
  convertFileSizeTo2DP,
  countWordsInPDF,
};
