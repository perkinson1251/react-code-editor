import { useState, useEffect } from "react";

import { IDropdownOption } from "core/types";
import httpService from "core/services/http.service";
import logger from "core/utils/logs";
import useKeyPress from "core/hooks/useKeyPress";
import { languageOptions } from "core/configs/languageOptions";

import CodeWindow from "components/CodeWindow/CodeWindow";
import Header from "components/Header/Header";
import Dropdown from "components/Dropdown/Dropdown";
import OutputWindow from "components/OutputWindow/OutputWindow";

const javascriptDefault = `// Hello world!`;

const MainPage = () => {
    const [code, setCode] = useState<string>(javascriptDefault);
    const [customInput, setCustomInput] = useState<string>("");
    const [outputDetails, setOutputDetails] = useState<any>(null);
    const [processing, setProcessing] = useState<boolean>(false);
    const [theme, setTheme] = useState<string>("vs-dark");
    const [language, setLanguage] = useState<IDropdownOption>(
        languageOptions[0]
    );

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    useEffect(() => {
        if (enterPress && ctrlPress) {
            logger("Enter pressed", "info", enterPress);
            logger("Control pressed", "info", ctrlPress);
            handleCompile();
        }
    }, [enterPress, ctrlPress]);

    const handleSelectChange = (option: IDropdownOption | null) => {
        logger("Option changed. ", "info", option);
        // @ts-ignore
        setLanguage(option);
    };

    const handleChange = (action: string, data: string) => {
        switch (action) {
            case "code":
                setCode(data);
                break;
            default:
                logger(
                    "onChange case not founded! Check this out",
                    "warning",
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
            stdin: btoa("Judge0"),
        };
        // TODO: Fix this
        // @ts-ignore
        const response = await httpService.compile(formData);
        const token = response.data.token;
        checkStatus(token);
    };

    const checkStatus = async (token: string) => {
        try {
            const response = await httpService.checkStatus(token);
            const statusId = response.data.status?.id;
            if (statusId === 1 || statusId === 2) {
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            } else {
                setProcessing(false);
                setOutputDetails(response.data);
                logger("checkStatus res.data", "info", response);
                return;
            }
        } catch (error) {
            logger("checkStatusError", "error", error);
            setProcessing(false);
        }
    };

    return (
        <>
            <Header>
                <Dropdown
                    onChange={handleSelectChange}
                    options={languageOptions}
                    placeholder={language.name}
                />
            </Header>
            <CodeWindow
                code={code}
                onChange={handleChange}
                language={language?.value}
                theme={theme}
            />
            <button onClick={handleCompile} disabled={!code}>
                {processing ? "Processing..." : "Compile and Execute"}
            </button>
            <OutputWindow outputDetails={outputDetails}></OutputWindow>
        </>
    );
};

export default MainPage;
