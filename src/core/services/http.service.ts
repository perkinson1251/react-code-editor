import axios from "axios";
import { toast } from "react-toastify";

import logger from "core/utils/logs";

interface PayloadProps {
    language_id: number;
    source_code: string;
    stdin: string;
}

const API = axios.create({
    baseURL: process.env.REACT_APP_RAPED_API_URL,
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        const expectedError =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        const errorTooManyRequests = error.response.status === 429;
        if (errorTooManyRequests) {
            toast.error(
                `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`
            );
            logger("Response error! Too many requests. Error:", "error", error);
        }
        if (!expectedError) {
            toast("Something had happened");
            logger("Response error! Code: ", "error", error);
        }
        return Promise.reject(error);
    }
);

const httpService = {
    compile: async (payload: PayloadProps) => {
        const res = await API.post("/submissions", payload, {
            params: {
                base64_encoded: "true",
                fields: "*",
            },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
            },
        });
        return res;
    },
    checkStatus: async (token: string) => {
        const res = await API.get(`/submissions/${token}`, {
            params: {
                base64_encoded: "true",
                fields: "*",
            },
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
        });
        return res;
    },
};

export default httpService;
