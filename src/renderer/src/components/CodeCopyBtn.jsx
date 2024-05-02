import React from "react";
import {FaCheck, FaCopy} from "react-icons/fa6";

export default function CodeCopyBtn({ children }) {
    const [copyOk, setCopyOk] = React.useState(false);
    const iconColor = copyOk ? '#0af20a' : '#ddd';
    const icon = copyOk ? FaCheck : FaCopy;
    const handleClick = (e) => {
        navigator.clipboard.writeText(children.props.children);
        console.log(children.props.children);
        setCopyOk(true);
        setTimeout(() => {
            setCopyOk(false);
        }, 500);
    }
    return (
        <div className="code-copy-btn">
            {copyOk ? <FaCheck onClick={handleClick} /> : <FaCopy onClick={handleClick} />}
        </div>
    )
}

