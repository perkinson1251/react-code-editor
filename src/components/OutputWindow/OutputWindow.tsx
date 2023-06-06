import { useMemo } from "react";

import { IOutputResult } from "core/types";

import * as S from "./styles";

interface Props {
    outputDetails: IOutputResult | null;
}

const OutputWindow = ({ outputDetails }: Props) => {
    const getOutput = useMemo(() => {
        if (!outputDetails) return null;

        const { status, stdout, stderr, time, memory } = outputDetails;
        const statusDesc = status?.description;

        let output = "";
        if (statusDesc === "Accepted") output = (stdout || "") + (stderr || "");
        else if (statusDesc === "In Queue" || statusDesc === "Processing")
            output = "Processing...";
        else output = stderr || btoa("Unknown error");

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
