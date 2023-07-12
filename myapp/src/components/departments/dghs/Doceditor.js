// import React, { useState } from "react";
// import ReactDOMServer from "react-dom/server";
// import { Parser } from "html-to-react";
// import { saveAs } from "file-saver";
// import { create as createDocx } from "docx";
// import demo from './demo.docx'
// // import { Document } from "docx-to-react";

// function App() {
//   const [wordDocumentHtml, setWordDocumentHtml] = useState(demo);

//   const handleSaveButtonClick = () => {
//     const parser = new Parser();
//     const reactElements = parser.parse(wordDocumentHtml);

//     const docxDocument = createDocx({
//       children: reactElements,
//     });

//     const docxFileBlob = new Blob([docxDocument], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
//     saveAs(docxFileBlob, "document.docx");
//   };

//   const handleHtmlChange = (event) => {
//     setWordDocumentHtml(event.target.value);
//   };

//   return (
//     <div>
//       <textarea value={wordDocumentHtml} onChange={handleHtmlChange} />
//       <button onClick={handleSaveButtonClick}>Save as Word Document</button>
//     </div>
//   );
// }

// export default App;
