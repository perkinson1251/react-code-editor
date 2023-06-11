import { useState, useEffect, useRef } from "react";

import * as monacoEditor from "monaco-editor";
import { Editor } from "@monaco-editor/react";

interface Props {
    onChange: (action: string, data: string) => void;
    theme: any;
    language: string;
    code: string;
}

const CodeWindow = ({ onChange, theme, language, code }: Props) => {
    const [value, setValue] = useState<string>(code || "");

    const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(
        null
    );

    useEffect(() => {
        if (monacoEditor) {
            monacoEditor.languages.register({ id: language });
            monacoEditor.editor.defineTheme(theme, {
                base: "vs",
                inherit: true,
                rules: [],
                colors: {
                    "editor.background": "#791d1d",
                },
            });
            monacoEditor.editor.setTheme(theme);
        }
    }, [language, theme]);

    const handleEditorDidMount = (
        editor: monacoEditor.editor.IStandaloneCodeEditor
    ) => {
        editorRef.current = editor;
    };

    const handleEditorChange = (value: any) => {
        if (value !== undefined) {
            setValue(value);
            onChange("code", value);
        }
    };

    return (
        <Editor
            height="100%"
            width="100%"
            options={{
                fontSize: 18,
            }}
            language={language || "javascript"}
            value={value}
            theme={theme}
            defaultValue="// Hello world! Go on!"
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
        ></Editor>
    );
};

export default CodeWindow;
