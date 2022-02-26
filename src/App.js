import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

function App() {
  const data = 'adasd' // get from database
  const [editorState, setEditorState] = useState(() => {
    if (!data) {
        const contentBlock = htmlToDraft(data?.description);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            return editorState;
        }
    }
    return EditorState.createEmpty()
});

// upload the html text in database 
  
  // const uploadText = () => {
  //   var html = '';
  //   var plainText = '';
  //   if (editorState) {
  //       if (editorState.getCurrentContent().getPlainText()) {
  //           plainText = editorState.getCurrentContent().getPlainText()
  //           html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
  //       } else {
  //           html = null;
  //       }
  //   }
  // }

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  };
  return (
    <div
      style={{ marginTop: 100, border: "1px solid black", minHeight: "6em", cursor: "text" }}
      onClick={focusEditor}
    >
      <Editor
        editorStyle={{ marginBottom: 0, marginTop: 0, minHeight: 200 }}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
        toolbarStyle={{ padding: 5, borderWidth: 2, borderColor: "#D3CECE", borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
        editorState={editorState}
        wrapperStyle={{ overflow: 'hidden', borderRadius: 10 }}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName form-control form-control-lg form-control-solid"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  )
}


export default App;
