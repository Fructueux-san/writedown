import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../assets/preview.css";

const Preview = ({doc}) => {
  return (
    <div className="preview">
      <Markdown remarkPlugins={[remarkGfm]}>{doc}</Markdown>
    </div>
  );
}

export default Preview;
