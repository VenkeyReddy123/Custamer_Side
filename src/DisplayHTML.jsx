import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function DisplayHTML({ keyName, htmlContent }) {
  return (
    <div style={{ border: '0px solid red' }}>
      <ReactQuill
        theme="snow"
        value={htmlContent}
        readOnly={true}
        modules={{ toolbar: false }}
        style={{ backgroundColor: '',border: 'none !important'}} // Apply background color directly to the ReactQuill component
      />
    </div>
  );
}

export default DisplayHTML;
