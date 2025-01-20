//import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import type { CodeEditorState } from "@/types";
import { Monaco } from "@monaco-editor/react";
import { create } from "zustand";

const getInitialState = () => {
  // If we are in the server, return the default values
  if (typeof window === "undefined")
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };

  // Otherwise, get the values from the local storage because localStorage
  // is not available in the server
  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || 16;

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editor: Monaco) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) editor.setValue(savedCode);

      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", String(fontSize));
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      // Save the code of the previous language before switching
      const currentCode = get().editor?.getValue() || "";
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }

      // set the new language
      localStorage.setItem("editor-language", language);

      set({ language, output: "", error: null });
    },

    // TODO: Implement this function
    runCode: async () => {},
  };
});
