// Source: https://www.youtube.com/watch?v=nI8PYZNFtac&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=5 (9:14)

/*
These are custom axios instances that make it easier to use axios without repeating some of the code.
*/

import axios from "axios";

const BASE_URL = "http://localhost:8000";

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
