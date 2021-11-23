import { FileUpload } from "@components/file-upload/FileUpload";
import { PhotoUpload } from "@components/file-upload/PhotoUpload";
import { useRouter } from "next/router";
import style from "./upload.module.scss";
import React, { useState } from "react";
import { CatalogSelect } from "./CatalogSelect";
import { Form, Input, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import BookAPI from "src/api/book";
import { CreateBookModal } from "@components/modal/CreateBookModal";
import { CancelCreateBookModal } from "@components/modal/CancelCreateBookModal";
import { GetUserInfo } from "src/api/common";

const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

const scrollToBody = () => {
  document.getElementById("book-info").scrollIntoView({ block: "center" });
};

export const UploadBook = () => {
  const router = useRouter();

  const [catalogId, setCatalogId] = useState(null);
  const [catalogErrMsg, setCatalogErrMsg] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [episodeThumbnail, setEpisodeThumbnail] = useState({
    thumb: null,
    isEmpty: true,
    sizeClassname: "",
    ratioClassname: "",
    widthClassname: "",
    extClassname: "",
    errMsg: "",
  });

  const [uploadContent, setUploadContent] = useState({
    title: {
      content: "",
      isEmpty: false,
      isValid: true,
    },
    description: {
      content: "",
      isValid: true,
    },
    file: {
      file: null,
      isEmpty: true,
      errMsg: "",
    },
  });

  const validateFile = (size, name) => {
    const lastDot = name.lastIndexOf(".");
    const ext = name.substring(lastDot);
    let extValid = ext == ".pdf";
    let sizeValid = size <= 100000000;
    let checkMsg = "";
    if (!extValid) {
      checkMsg = "Only PDF format are allowed";
    } else if (!sizeValid) {
      checkMsg = "File must be less than 10MB";
    } else checkMsg = "";
    setUploadContent((uploadContent) => ({
      ...uploadContent,
      file: {
        ...uploadContent.file,
        errMsg: checkMsg,
      },
    }));
    return extValid && sizeValid;
  };

  const validateThumbEmpty = () => {
    const isEmpty =
      episodeThumbnail.thumb === null ||
      episodeThumbnail.thumb.pictureAsFile === undefined;

    setEpisodeThumbnail((episodeThumbnail) => ({
      ...episodeThumbnail,
      isEmpty: isEmpty,
      errMsg: isEmpty ? "Please upload thumbnail" : "",
    }));
  };

  const validateEpisodeTitle = (value) => {
    value = value.replace(/ +(?= )/g, "");
    setUploadContent((uploadContent) => ({
      ...uploadContent,
      title: {
        ...uploadContent.title,
        content: value,
        isEmpty: value === "",
        isValid: value !== "" && value.length < 60,
      },
    }));
  };

  const validateFileEmpty = () => {
    const isEmpty =
      uploadContent.file.file === null || uploadContent.file.file === undefined;

    setUploadContent((uploadContent) => ({
      ...uploadContent,
      file: {
        ...uploadContent.file,
        isEmpty: isEmpty,
        errMsg: isEmpty ? "Please upload file" : "",
      },
    }));
  };

  const validateAll = async () => {
    validateThumbEmpty();
    validateEpisodeTitle(uploadContent.title.content);
    validateFileEmpty();
    !catalogId && setCatalogErrMsg(true);

    if (
      !uploadContent.title.isEmpty &&
      uploadContent.title.isValid &&
      uploadContent.description.isValid &&
      !episodeThumbnail.isEmpty &&
      !uploadContent.file.isEmpty &&
      !catalogErrMsg
    ) {
      setModalType("confirm");
    } else {
      console.log("validate error 4");
      scrollToBody();
    }
  };

  const episodeTitleChange = (e) => {
    const isValid = e.target.value.replace(/ +(?= )/g, "").length <= 60; //remove multiple whitespaces
    const isEmpty = e.target.value.replace(/\s/g, "") === ""; //remove all whitespaces
    if (isValid) {
      setUploadContent((uploadContent) => ({
        ...uploadContent,
        title: {
          ...uploadContent.title,
          content: e.target.value,
          isEmpty: isEmpty,
          isValid: isValid,
        },
      }));
    } else {
      setUploadContent((uploadContent) => ({
        ...uploadContent,
        title: {
          ...uploadContent.title,
          content: e.target.value.slice(0, 60),
          isEmpty: isEmpty,
          isValid: isValid,
        },
      }));
    }
  };

  const descriptionChange = (e) => {
    const isValid = e.target.value.length <= 500 && e.target.value.length >= 0;
    if (isValid) {
      setUploadContent((uploadContent) => ({
        ...uploadContent,
        description: {
          ...uploadContent.description,
          isValid: isValid,
          content: e.target.value,
        },
      }));
    } else {
      setUploadContent((uploadContent) => ({
        ...uploadContent,
        description: {
          ...uploadContent.description,
          isValid: isValid,
          content: e.target.value.slice(0, 500),
        },
      }));
    }
  };

  const validateImageExt = (type, ext) => {
    const isValid = ext === "png" || ext === "jpg" || ext === "jpeg";

    type === "thumb" &&
      setEpisodeThumbnail((episodeThumbnail) => ({
        ...episodeThumbnail,
        extClassname: isValid ? "convention-valid" : "convention-invalid",
      }));

    return isValid;
  };

  const validateThumbPicture = (width, height, size) => {
    setEpisodeThumbnail((episodeThumbnail) => ({
      ...episodeThumbnail,
      sizeClassname:
        size <= 10000000 ? "convention-valid" : "convention-invalid",
      ratioClassname:
        width === height ? "convention-valid" : "convention-invalid",
      widthClassname:
        width >= 500 && height >= 500
          ? "convention-valid"
          : "convention-invalid",
    }));
  };

  const validateImage = (type, size, src, name) =>
    new Promise((resolve, reject) => {
      let lastDot = name.lastIndexOf(".");
      let ext = name.substring(lastDot + 1);
      !validateImageExt(type, ext) && resolve(false);

      if (type === "thumb") {
        let width, height;
        let img = document.createElement("img");
        img.src = src;
        img.onload = () => {
          width = img.naturalWidth || img.width;
          height = img.naturalHeight || img.height;
          validateThumbPicture(width, height, size);
          if (
            episodeThumbnail.extClassname !== "convention-valid" ||
            episodeThumbnail.ratioClassname !== "convention-valid" ||
            episodeThumbnail.sizeClassname !== "convention-valid" ||
            episodeThumbnail.widthClassname !== "convention-valid"
          ) {
            setEpisodeThumbnail((episodeThumbnail) => ({
              ...episodeThumbnail,
              thumb: null,
              isEmpty: true,
            }));
          }
          resolve(true);
        };
      }
    });

  const packageForm = (content, image, catalogId) => {
    const form = new FormData();

    form.append("imgMulti", image);
    form.append("catalogId", catalogId);
    form.append("title", content.title.content);
    form.append("description", content.description.content);
    form.append("fileMulti", content.file.file.file);

    return form;
  };

  const Upload = async () => {
    setIsLoading(true);

    setTimeout(() => {
      const formData = packageForm(
        uploadContent,
        episodeThumbnail.thumb.pictureAsFile,
        catalogId
      );
      BookAPI.uploadBook({ formdata: formData, userInfo: GetUserInfo() })
        .then((res) => {
          setIsLoading(false);
          setModalType("");
          router.push(`/item?itemId=${res?.data.bookId}`);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }, 2000);
  };

  return (
    <>
      <div
        style={{
          minHeight: "70vh",
        }}
        className={`${style["create-episode-content"]}`}
      >
        <section className={`${style["select-episode-thumb"]}`}>
          <div className={`${style["serie-detail-header"]}`}>
            Select thumbnail
          </div>

          <div className={`${style["thumbnail-detail"]}`}>
            <PhotoUpload
              className={"thumbnail-cover"}
              type="thumb"
              setPagePicture={async ({ pictureAsFile, pictureSrc }) => {
                if (pictureAsFile === undefined) {
                  setEpisodeThumbnail({
                    isEmpty: true,
                    thumb: null,
                    ratioClassname: "",
                    sizeClassname: "",
                    widthClassname: "",
                    extClassname: "",
                    errMsg: "Please upload thumbnail",
                  });
                } else {
                  let isValidated = await validateImage(
                    "thumb",
                    pictureAsFile.size,
                    pictureSrc,
                    pictureAsFile.name
                  );

                  if (isValidated) {
                    setEpisodeThumbnail((episodeThumbnail) => ({
                      ...episodeThumbnail,
                      thumb: { pictureAsFile },
                      errMsg: "",
                      isEmpty: false,
                    }));
                  } else
                    setEpisodeThumbnail((episodeThumbnail) => ({
                      ...episodeThumbnail,
                      thumb: null,
                    }));
                }
              }}
              setChanged={() => console.log("changed")}
            ></PhotoUpload>

            <ul className={`${style["thumbnail-cover-convention"]}`}>
              <li
                className={`${style[episodeThumbnail.widthClassname]} ${
                  style["convention-item"]
                }`}
              >
                The square thumbnail must be larger than 500x500px.
              </li>
              <li
                className={`${style[episodeThumbnail.ratioClassname]} ${
                  style["convention-item"]
                }`}
              >
                The aspect ratio must be 1:1.
              </li>
              <li
                className={`${style[episodeThumbnail.sizeClassname]} ${
                  style["convention-item"]
                }`}
              >
                Image must be less than 10MB.
              </li>
              <li
                className={`${style[episodeThumbnail.extClassname]} ${
                  style["convention-item"]
                }`}
              >
                Only PNG , JPG, JPEG formats are allowed.
              </li>
            </ul>
          </div>
        </section>
        <section className={`${style["select-episode-thumb"]}`}>
          <div className={`${style["serie-detail-header"]}`} id="book-info">
            Book Information
          </div>
          <CatalogSelect
            setCate={setCatalogId}
            isEmpty={catalogErrMsg}
            setCatalogErrMsg={setCatalogErrMsg}
          />
          <Form layout="vertical">
            <Form.Item label="Book title" style={{ width: "48%" }}>
              <div
                className={`${
                  uploadContent.title.isEmpty || !uploadContent.title.isValid
                    ? "error-border"
                    : ""
                }`}
              >
                <Input
                  placeholder="Max 60 characters"
                  value={uploadContent.title.content}
                  onChange={episodeTitleChange}
                />
              </div>
              {uploadContent.title.isEmpty ? (
                <div className={`${style["error-msg-input"]}`}>
                  Please input item title
                </div>
              ) : (
                <>
                  {!uploadContent.title.isValid && (
                    <div className={`${style["error-msg-input"]}`}>
                      Maximum 60 characters
                    </div>
                  )}
                </>
              )}
            </Form.Item>
            <Form.Item
              style={{
                width: "48%",
              }}
              label="Book description (optional)"
            >
              <div
                className={`${
                  !uploadContent.description.isValid ? "error-border" : ""
                }`}
              >
                <TextArea
                  placeholder="Item description (optional)"
                  autoSize={{ minRows: 4, maxRows: 5 }}
                  name="summary"
                  value={uploadContent.description.content}
                  onChange={descriptionChange}
                />
              </div>
              {!uploadContent.description.isValid && (
                <div className={`${style["error-msg-input"]}`}>
                  Maximum 500 characters
                </div>
              )}
            </Form.Item>
          </Form>
        </section>

        <section className={`${style["upload-episode"]}`}>
          <div
            className={`${style["episode-option-header"]} ${style["episode-option"]}`}
          >
            Upload Content
          </div>
          <FileUpload
            validateAll={validateAll}
            className={`${style["file-upload"]}`}
            setFile={({ file }) => {
              if (file === undefined) {
                setUploadContent((uploadContent) => ({
                  ...uploadContent,
                  file: {
                    file: null,
                    isEmpty: true,
                    errMsg: "Please upload file",
                  },
                }));
              } else {
                let isValidated = validateFile(file.size, file.name);
                if (isValidated) {
                  setUploadContent((uploadContent) => ({
                    ...uploadContent,
                    file: {
                      file: { file },
                      isEmpty: false,
                      errMsg: "",
                    },
                  }));
                } else {
                  setUploadContent((uploadContent) => ({
                    ...uploadContent,
                    file: {
                      ...uploadContent.file,
                      file: null,
                    },
                  }));
                }
              }
            }}
            errorMsg={uploadContent.file.errMsg}
          />
        </section>
        <div className={`${style["custom-serie-btn"]}`}>
          <Button
            className={`${style["button"]} ${style["cancel-button"]}`}
            onClick={() => {
              setModalType("cancel");
            }}
          >
            Cancel
          </Button>

          <Button
            className={`${style["button"]} ${style["active-save"]} ${style["confirm-button"]}`}
            onClick={() => {
              if (episodeThumbnail.errMsg !== "") {
                scrollToTop();
              } else {
                validateAll();
              }
            }}
            disabled={uploadContent.file.isEmpty}
          >
            Create
          </Button>
        </div>
        {modalType === "confirm" && (
          <CreateBookModal
            updateModalVisible={setModalType}
            upLoad={Upload}
            isLoading={isLoading}
          />
        )}
        {modalType === "cancel" && (
          <CancelCreateBookModal updateModalVisible={setModalType} />
        )}
      </div>
    </>
  );
};
