import Image from "next/image";
import { useRef, useState } from "react";
import style from "./file-upload.module.scss";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const FileUpload = ({
  className = "",
  setFile,
  errorMsg = "",
  setCoverType,
  validateAll,
  setCoverErrMsg,
}) => {
  const inputFile = useRef(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileExt, setFileExt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const containerRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");

  const onClickPreview = () => {
    setCoverErrMsg(`Input cover before preview`);
    validateAll();
  };

  const onFileChange = async (e) => {
    validateAll();
    if (e.target.files.length !== 0) {
      let file = e.target.files[0];
      let lastDot = file.name.lastIndexOf(".");
      let ext = file.name.substring(lastDot + 1);
      let videoUrl = URL.createObjectURL(file);
      let bookUrl = "";

      if (ext == "pdf") {
        bookUrl = URL.createObjectURL(file);
        window.localStorage.setItem("book-url", bookUrl);
      }

      if ((ext === "pdf" || ext === "epub") && file.size < 50000000) {
        setFilePreview(file);
        setFileName(file.name);
        setFileExt(ext);
        setVideoUrl(videoUrl);
        setCoverType(ext);
        setImageUrl(bookUrl);
      }
      setFile({ file: e.target.files[0] });
    } else console.log("Khong tai duoc");
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const emptyInput = () => {
    inputFile.current.value = null;
  };

  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      ref={containerRef}
      className={`${style["file-content-upload"]} ${style[className]}`}
    >
      {filePreview && (
        <div
          className={`${style["trash-icon"]}`}
          onClick={() => {
            setFilePreview(null);
            emptyInput();
            setFile({});
            window.localStorage.removeItem("video-url");
            window.localStorage.removeItem("music-url");
            window.localStorage.removeItem("video-thumbnail");
          }}
        >
          <Image src="/assets/icons/trash.svg" width={41} height={41} />
        </div>
      )}

      <div className={`${style["cover-photo-content"]}`}>
        <Image src="/assets/icons/cloud.png" height={74} width={74} />

        <div className={`${style["cover-photo-header"]}`}>Upload File</div>

        <div className={`${style["cover-photo-subtitle"]}`}>
          <span
            className={`${style["text-color-pink"]}`}
            onClick={onButtonClick}
            style={{ cursor: "pointer" }}
          >
            Browse
          </span>{" "}
          to choose file
        </div>

        <div className={`${style["file-upload-notice"]}`}>
          File must be less than 50MB for PDF and less than 10GB for MP4, MPEG4,
          MP3, M4A format
        </div>

        <input
          type="file"
          id="file"
          ref={inputFile}
          onChange={(e) => {
            onFileChange(e);
          }}
          accept="application/pdf"
          style={{ display: "none" }}
        />
        {errorMsg !== "" && (
          <div className={`${style["error-msg"]}`}>
            <Image src="/icons/invalid.svg" height={24} width={24} />
            <div className={`${style["error-content"]}`}>{errorMsg}</div>
          </div>
        )}

        {filePreview && (
          <div className={`${style["file-preview"]}`}>
            {fileExt === "pdf" && (
              <div
                // href={"/creator/create_episode/preview/document"}
                className={`${style["preview-container"]}`}
                // target="_blank"
              >
                <div
                  className={`${style["video-preview"]} ${style["file-img"]}`}
                >
                  <img src={"/assets/images/pdf-default.png"}></img>
                </div>
                {/* <Document
                  className={`${style["file-img"]}`}
                  file={filePreview}
                  renderMode="svg"
                  onLoadSuccess={onDocumentLoadSuccess}
                  
                >
                  <div className={`${style["preview-btn"]}`}>
                    <img src={"/icons/preview.svg"}></img>
                  </div>
                  <Page
                    pageNumber={1}
                    className={`${style["pdf-canvas"]}`}
                    height={containerRef?.current?.offsetHeight * 0.8}
                  />
                </Document> */}
              </div>
            )}
            <div className={`${style["file-name"]}`}>{fileName}</div>
          </div>
        )}
      </div>
    </div>
  );
};
