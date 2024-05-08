import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { BsMarkdown, BsFileEarmarkPdf } from "react-icons/bs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import "../assets/editor-toolbar.css";
import { useAtom } from "jotai";
import { editorViewOpenedAtom, openDoc, selectedNoteAtom,openedObjectAtom } from "../hooks/editor";

export const Toolbar = ({previewRef}) => {
  const [editorActive, setEditorActive] = useAtom(editorViewOpenedAtom);
  const [openedNote, setOpenedNote] = useAtom(selectedNoteAtom);
  const [doc, setDoc] = useAtom(openDoc);
  const [docInfo, setDocInfo] = useAtom(openedObjectAtom);

  const activeRawBtn = () => {
    if (editorActive){
      ;
    }else{
      setEditorActive(true);
    }
  }

  const activePreviewBtn = () => {
    if (!editorActive){}
    else {
      setEditorActive(false);
    }
  }

  const closeActiveNote = () => {
    setOpenedNote(null);
    setDoc(null);
    setEditorActive(false);
  }

  const saveAsPdfFile = async (e) => {
      window.electron.ipcRenderer.send("pdf-on-fs", {
        id: openedNote,
        title: docInfo.title,
      });

    window.electron.ipcRenderer.on("pdf-path", (event, message) => {
      const input = previewRef.current;
      // input.style.color = "black";
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        imgData.fontcolor("black");
        console.log("TEXT CONTENT")
        console.log(canvas.textContent.toString());
        console.log("END TEXT CONTENT");
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(message);
      });
    });
    console.log("PDF successfully saved");
  }

  const saveAsMd = async (e) => {
    const data = Buffer(doc);
    window.electron.ipcRenderer.send("md-on-fs", {
      data: data,
      id: openedNote,
      title: docInfo.title
    });
  }

  return (
    <header>
      <div className="btn-bloc">
        <button className={(editorActive ? 'active' : '')} onClick={activeRawBtn}>Raw</button>
        <button className={(!editorActive ? 'active' : '')} onClick={activePreviewBtn}>Preview</button>
      </div>
      <div className="actions" >
    {   /*<button>
          <BsFileEarmarkPdf size={22} color="white" className="btn" onClick={saveAsPdfFile}/>
        </button>*/
    }
        <button>
            <BsMarkdown size={22} color="white" className="btn" onClick={saveAsMd}/>
        </button>
        <button onClick={closeActiveNote}>
          <RiCloseCircleLine size={22} color="white" className="close-btn" title="close"/>
        </button>
      </div>
    </header>
  );

}
