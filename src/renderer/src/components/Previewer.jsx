import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { darcula, dracula, oneDark, atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import CopyBtn from "./preview/CopyBtn";
import "../assets/preview.css";
import "../assets/copybutton.css";

// import "github-markdown-css";


const Preview = ({doc}) => {

  const Pre = ({children}) => <pre className="blog-pre">
      <CopyBtn>{children}</CopyBtn>
    </pre>;

  return (
    <div className="preview markdown-body">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // pre: Pre,
          code(props) {
            const {children, className, node, ...rest} = props;
            const match = /language-(\w+)/.exec(className || '');
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
        }}

      >
        {doc}
      </Markdown>
    </div>
  );
}

export default Preview;
