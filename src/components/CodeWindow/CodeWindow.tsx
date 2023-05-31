import React, { useState } from "react";

import { Editor } from "@monaco-editor/react";

interface Props {
    onChange: (action: string, data: string) => void;
    theme: any;
    laungage: string;
    code: string;
}

const CodeWindow = ({ onChange, theme, laungage, code }: Props) => {
    const [value, setValue] = useState<string>(code || "");

    const handleEditorChange = (value: any) => {
        setValue(value);
        onChange("code", value);
    };

    return (
        <div>
            <Editor
                height="85vh"
                width="100%"
                language={laungage || "javascript"}
                value={value}
                theme={theme}
                defaultValue="// Hello world! Go on!"
                onChange={handleEditorChange}
            ></Editor>
        </div>
    );
};

export default CodeWindow;
