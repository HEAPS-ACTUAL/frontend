import axiosInstance from "../utility/axiosInstance";

async function generateFlashcard(email, testName, testType, file) { // isaiah to change
  try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("testName", testName);
      formData.append("testType", testType);
      formData.append("file", file);

      const response = await axiosInstance({
          method: "post",
          url: "/test/generateAndStoreTest",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.message;
  }
  catch (error) {
      if (error.response) {
          return error.response.data.message;
      }
  }
}

async function getAllFlashcardsByUser(email){
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/test/getTestInfo",
            data: { email: email, testType: 'F'},
        });

        return response.data;
    }
    catch (error) {
        return error.response.data.message;
    }
}

async function getAllFlashcardsWithoutSchedule(email){
    try {
        const response = await axiosInstance({
            method: "post",
            url: "/flashcard/getAllFlashcardsWithoutSchedule",
            data: {email: email}
        });

        return response.data; 
    }
    catch (error) {
        return error.response.data.message;
    }
}

export {generateFlashcard, getAllFlashcardsByUser, getAllFlashcardsWithoutSchedule};