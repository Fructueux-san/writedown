import { useEffect, useState, useRef } from "react";
import { EditorState, Text } from "@codemirror/state";
import { EditorView, keymap, highlightActiveLine, lineNumbers } from '@codemirror/view';
import { defaultKeymap, historyKeymap, history, indentWithTab } from "@codemirror/commands";
import { indentOnInput, bracketMatching, continuedIndent, HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { oneDark } from "@codemirror/theme-one-dark";
import { tags } from "@lezer/highlight";
import { activeDocInformations, openedObjectAtom, selectedNoteAtom } from "../hooks/editor/index";
import { useAtom } from "jotai";
import {throttle} from "lodash";

export const transparentTheme = EditorView.theme({
    '&': {
        backgroundColor: 'transparent !important',
        height: '100%'
    }
});

const syntaxHighlight = HighlightStyle.define([
    {
        tag: tags.heading1,
        fontSize: '1.6em',
        fontWeight: 'bold'
    },
    {
        tag: tags.heading2,
        fontSize: '1.4em',
        fontWeight: 'bold'
    },
    {
        tag: tags.heading3,
        fontSize: '1.2em',
        fontWeight: 'bold'
    },
    {
        tag: tags.content,
        fontSize: '1.2em'
    },
    {
        tag: tags.keyword,
        fontSize: '1.3em',
    },
    {
        tag: tags.definitionKeyword,
        fontSize: '1.2em'
    },

    {
        tag: tags.comment,
        fontSize: '1.2em'
    },
    {
        tag: [tags.brace, tags.bracket, tags.annotation, tags.name, tags.string, tags.className, tags.attributeValue, tags.monospace, tags.operator, tags.integer, tags.literal,tags.bool, tags.list, tags.self, tags.moduleKeyword],
        fontSize: '1.2em'
    },
    {
        tag: tags.function,
        fontSize: '1.2em'
    }
]);

const theme = EditorView.theme({
    $: {
        fontSize: "1.7em"
    }
})

function countWords(doc) {
  let count = 0, iter = doc.iter();
  while (!iter.next().done) {
    let inWorld = false;
    for (let i=0; i<iter.value.length; i++) {
      let word = /\w/.test(iter.value[i]);
      if (word && !inWorld) count++;
      inWorld = word;
    }
  }
  return count;
}
const useCodemirror = (props, state) => {
    const refContainer = useRef(null);
    const [editorView, setEditorView] = useState();
    const { onChange } = props;

    const [docIndex] = useAtom(selectedNoteAtom);
    const [docObject] = useAtom(openedObjectAtom);
    const [docInfo, setDocInfo] = useAtom(activeDocInformations);


    useEffect(() => {
        if (!refContainer.current) return;
        const startState = EditorState.create({
            doc: props.initialDoc,
            extensions: [
                keymap.of([defaultKeymap, historyKeymap, indentWithTab, continuedIndent({ units: 4 })]),
                lineNumbers(),
                history(),
                indentOnInput(),
                bracketMatching(),
                highlightActiveLine(),
                markdown({
                    base: markdownLanguage,
                    codeLanguages: languages,
                    addKeymap: true,
                }),
                oneDark,
                transparentTheme,
                syntaxHighlighting(syntaxHighlight),
                EditorView.lineWrapping,
                EditorView.updateListener.of(update => {
                    if (update.changes) {
                        onChange && onChange(update.state);
                        setDocInfo({
                          words: countWords(update.state.doc),
                          lines: update.state.doc.lines,
                          currentLine: update.state.doc.lineAt(view.state.selection.main.head).number
                        });
                        let data = {
                                id: docIndex,
                                note: {
                                  title: docObject.title,
                                  content: update.state.doc.toString(),
                                  updated_at: Date.now(),
                                }
                              }
                      console.log(data);
                        throttle(
                          window.electron.ipcRenderer.send("save-note", data),
                          3000,
                          {
                            leading: false,
                            trailing: true,
                          }
                        );
                        window.electron.ipcRenderer.on("success", (event, message) => {
                            console.log("[SAVING MESSAGE]", message);
                        });
                    }
                }),
            ]
        });

        const view = new EditorView({
            state: startState,
            parent: refContainer.current
        });
        setEditorView(view);

        return () => {
            view.destroy();
        };
    }, [docIndex, refContainer]);

    return [refContainer, editorView];
}

export default useCodemirror;

