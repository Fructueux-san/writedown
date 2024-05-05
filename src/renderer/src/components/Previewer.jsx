import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkGemoji from "remark-gemoji";
import remarkHint from "remark-hint";
import remarkCodeTitle from "remark-code-title";
import '../assets/preview.css';
// import 'github-markdown-css/github-markdown.css';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import CodeCopyBtn from "./CodeCopyBtn";
import {dark, darcula, dracula, oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import "../assets/copybutton.css";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";
import remarkMath from "remark-math";
const Preview = ({doc, preview})=>{

    const Pre = ({ children }) => <pre className="blog-pre">
        <CodeCopyBtn>{children}</CodeCopyBtn>
        {children}
    </pre>

    return (
        <div className={"preview markdown-body"}>
            <Markdown remarkPlugins={[remarkGfm, remarkRehype, remarkGemoji, remarkHint, remarkMath]} rehypePlugins={[rehypeRaw]} components={{
                pre: Pre,
                code(props) {
                    const {children, className, node, ...rest} = props
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <SyntaxHighlighter
                        {...rest}
                        children={String(children).replace(/\n$/, '')}
                        style={darcula}
                        language={match[1]}
                        PreTag="div"
                      />
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    )
                  }
            }}>{String(doc)}</Markdown>
        </div>
    )
}

export default Preview;

