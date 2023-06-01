import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import useKeyPress from "core/hooks/useKeyPress";
import { languageOptions } from "core/configs/languageOptions";

import CodeWindow from "components/CodeWindow/CodeWindow";
import httpService from "core/services/http.service";
import Header from "components/Header/Header";

const javascriptDefault = `
    // Hello world!
`;

const MainPage = () => {
    const [code, setCode] = useState<string>(javascriptDefault);
    const [customInput, setCustomInput] = useState<string>("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState<boolean>(false);
    const [theme, setTheme] = useState<string>("vs-dark");
    const [language, setLanguage] = useState(languageOptions[0]);

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    // Checking keys status
    useEffect(() => {
        if (enterPress && ctrlPress) {
            if (process.env.NODE_ENV === "development") {
                console.log("Enter pressed", enterPress);
                console.log("Control pressed", ctrlPress);
            }
            // handleCompile();
        }
    }, [enterPress, ctrlPress]);

    const handleSelectChange = (el: any) => {
        if (process.env.NODE_ENV === "development")
            console.log("Selected option: ", el);
        setLanguage(el);
    };

    const handleChange = (action: string, data: string) => {
        switch (action) {
            case "code":
                setCode(data);
                break;
            default:
                if (process.env.NODE_ENV === "development")
                    console.warn(
                        "onChange case not founded! Check this out",
                        action,
                        data
                    );
                break;
        }
    };

    const handleCompile = async () => {
        setProcessing(true);
        const formData = {
            language_id: language.id,
            source_code: btoa(code),
            stdin: btoa(customInput),
        };
        // TODO: Fix this
        // @ts-ignore
        const response = await httpService.compile(formData);
        const token = response.token;
        checkStatus(token);
    };

    const checkStatus = async (token: any) => {
        try {
            const response = await httpService.checkStatus(token);
            const statusId = response.status?.id;
            if (statusId === 1 || statusId === 2) {
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            } else {
                setProcessing(false);
                setOutputDetails(response);
                console.log("checkStatus res.data", response);
                return;
            }
        } catch (error) {
            console.log("checkStatusError", error);
            setProcessing(false);
        }
    };

    return (
        <>
            <Header></Header>
            <CodeWindow
                code={code}
                onChange={handleChange}
                language={language?.value}
                theme={theme}
            />
            <button onClick={handleCompile} disabled={!code}>
                {processing ? "Processing..." : "Compile and Execute"}
            </button>
        </>
    );
};

export default MainPage;
