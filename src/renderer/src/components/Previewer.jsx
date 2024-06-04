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
import remarkHtml from "remark-html";
import { FaExclamation } from "react-icons/fa6";
import { GoAlert, GoAlertFill, GoInfo, GoStop } from "react-icons/go";
const Preview = ({doc, previewRef})=>{

    const Pre = ({ children }) => <pre className="blog-pre">
        <CodeCopyBtn>{children}</CodeCopyBtn>
        {children}
    </pre>

    return (
        <div className={"preview markdown-body"} ref={previewRef}>
            <Markdown remarkPlugins={[remarkHtml, remarkHint, remarkGfm, remarkGemoji, remarkRehype, remarkMath  ]} rehypePlugins={[rehypeRaw]} components={{
                p(props){
                  const {children, className, node, ...rest} = props;
                  let classes = className.split(" ");
                  if (classes.indexOf("hint") !== -1){
                    if (classes.indexOf("error") !== -1) {
                      return <p className="hint error">
                          <GoStop size={20} color="red"/>
                          <div>{children}</div>
                        </p>
                    }else if (classes.indexOf("tip") !== -1){
                      return <p size={20} className="hint tip">
                        <GoInfo size={20} color="blue" />
                        <div>{children}</div>
                        </p>
                    }else if (classes.indexOf("warn") !== -1){
                      return <p className="hint warn">
                        <GoAlertFill size={20} color="orange" />
                        <div>{children}</div>
                        </p>
                    }else {
                      return <p className={className}>{children}</p>
                    }
                  }
                },
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

