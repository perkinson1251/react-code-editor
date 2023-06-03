import { useState } from "react";

import { Editor } from "@monaco-editor/react";

interface Props {
    onChange: (action: string, data: string) => void;
    theme: any;
    language: string;
    code: string;
}

const CodeWindow = ({ onChange, theme, language, code }: Props) => {
    const [value, setValue] = useState<string>(code || "");

    const handleEditorChange = (value: any) => {
        setValue(value);
        onChange("code", value);
    };

    return (
        <Editor
            height="85vh"
            width="100%"
            language={language || "javascript"}
            value={value}
            theme={theme}
            defaultValue="// Hello world! Go on!"
            onChange={handleEditorChange}
        ></Editor>
    );
};

export default CodeWindow;
