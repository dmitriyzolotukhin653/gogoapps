import axios from "axios";

export const API_KEY = "AIzaSyBTeWrRKfqcurh96jGNxTmgzkNNJBbsaS8";

export const api = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});
