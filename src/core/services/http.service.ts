import axios from "axios";

interface PayloadProps {
    language_id: number;
    source_code: any;
    stdin: any;
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
            console.error("Response error! Too many requests. Error: ", error);
        }
        if (!expectedError && process.env.NODE_ENV === "development") {
            console.error("Reesponse error! Code: ", error);
        }
        return Promise.reject(error);
    }
);

const httpService = {
    compile: async (payload: PayloadProps) => {
        const { data } = await API.request({
            method: "POST",
            url: process.env.REACT_APP_RAPID_API_URL,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
            data: payload,
        });
        return data;
    },
    checkStatus: async (token: any) => {
        const { data } = await API.request({
            method: "GET",
            url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
        });
        return data;
    },
};

export default httpService;
