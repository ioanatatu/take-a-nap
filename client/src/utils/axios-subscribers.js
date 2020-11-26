import axios from "axios";

const instance = axios.create({
    baseURL: "https://take-a-nap-56da1.firebaseio.com/",
});

export default instance;
