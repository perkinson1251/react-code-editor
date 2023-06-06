import { useMemo } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IOutputResult } from "core/types";

import * as S from "./styles";

interface Props {
    outputDetails: IOutputResult | null;
}

const OutputWindow = ({ outputDetails }: Props) => {
    const getOutput = useMemo(() => {
        if (!outputDetails) return null;

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
                <p>{decodedOutput}</p>
                <p>{statistics}</p>
            </>
        );
    }, [outputDetails]);

    return (
        <>
            <h1>Output:</h1>
            <S.OutputWindowContainer>
                <S.OutputWindowOutput>{getOutput}</S.OutputWindowOutput>
            </S.OutputWindowContainer>
        </>
    );
};

export default OutputWindow;
