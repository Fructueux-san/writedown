import React from "react";

import { useEffect, useState, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, highlightActiveLine, lineNumbers } from '@codemirror/view';
import { defaultKeymap, historyKeymap, history, indentWithTab } from "@codemirror/commands";
import { indentOnInput, bracketMatching, continuedIndent, HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { oneDark } from "@codemirror/theme-one-dark";
import { tags } from "@lezer/highlight";
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

const useCodemirror = (props) => {
    const refContainer = useRef(null);
    const [editorView, setEditorView] = useState();
    const { onChange } = props;


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
    }, [refContainer]);

    return [refContainer, editorView];
}

export default useCodemirror;

