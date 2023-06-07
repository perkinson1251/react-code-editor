import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IOutputResult } from "core/types";

import * as S from "./styles";

interface Props {
    outputDetails: IOutputResult | null;
}

const OutputWindow = ({ outputDetails }: Props) => {
    const [activeTab, setActiveTab] = useState<string>("output");

    const handleTabChange = (tab: string): void => {
        setActiveTab(tab);
    };

    const getOutput = useMemo(() => {
        if (!outputDetails)
            return "(c) Monaco Editor base. All rights reserved. Here you will see the output";

        const { status, stdout, stderr, time, memory } = outputDetails;
        const statusDescription = status?.description;

        let output = "";
        switch (statusDescription) {
            case "Accepted":
                output = stdout ?? stderr ?? "";
                break;
            case "In Queue":
            case "Processing":
                output = "Processing...";
                break;
            case "Compilation Error":
                output = stderr || btoa("Compilation Error");
                toast.error("Compilation Error");
                break;
            case "Runtime Error":
                output = stderr || btoa("Runtime Error");
                toast.error("Runtime Error");
                break;
            case "Internal Error":
                output = stderr || btoa("Internal Error");
                toast.error("Internal Error");
                break;
            default:
                output = stderr || btoa("Unknown error");
                break;
        }

        const decodedOutput = atob(output);
        const statistics =
            time && memory ? `Time: ${time} s | Memory: ${memory} KB` : "";

        return (
            <>
                <pre>{decodedOutput}</pre>
                <pre>{statistics}</pre>
            </>
        );
    }, [outputDetails]);

    return (
        // <>
        //     <h1>Output:</h1>
        //     <S.OutputWindowContainer>
        //         <S.OutputWindowOutput>{getOutput}</S.OutputWindowOutput>
        //     </S.OutputWindowContainer>
        // </>
        <>
            <S.TerminalContainer>
                <S.TabContainer>
                    <S.Tab
                        active={activeTab === "output"}
                        onClick={() => handleTabChange("output")}
                    >
                        Output
                    </S.Tab>
                    <S.Tab
                        active={activeTab === "input"}
                        onClick={() => handleTabChange("input")}
                    >
                        Input
                    </S.Tab>
                </S.TabContainer>
                <S.ContentContainer>{getOutput}</S.ContentContainer>
            </S.TerminalContainer>
        </>
    );
};

export default OutputWindow;
