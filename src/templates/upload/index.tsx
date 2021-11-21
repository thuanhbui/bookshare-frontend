import { FileUpload } from "@components/file-upload/FileUpload";
import { PhotoUpload } from "@components/file-upload/PhotoUpload";
import { useRouter } from "next/router";
import style from "./upload.module.scss";
import React, { useEffect, useState } from "react";
import { CatalogSelect } from "./CatalogSelect";
import { Form, Input, Radio, Space, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import BookAPI from "src/api/book";

const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

export const UploadBook = () => {
  const [catalogId, setCatalogId] = useState("haha");
  const [fileExt, setFileExt] = useState("xyz");
  const [coverErrMsg, setCoverErrMsg] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [modalType, setModalType] = useState("");

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
    type: "editions",
    numberOfEdition: {
      num: "",
      isEmpty: true,
      isValid: false,
    },
    file: {
      file: null,
      isEmpty: true,
      errMsg: "",
    },
    isFree: false,
    seriesInfo: null,
  });

  const validateFile = (size, name) => {
    const lastDot = name.lastIndexOf(".");
    const ext = name.substring(lastDot);
    const category = uploadContent.seriesInfo?.category;
    console.log(uploadContent.seriesInfo?.formatAllowed);
    let extValid = uploadContent.seriesInfo?.formatAllowed.indexOf(ext) !== -1;
    let sizeValid =
      size <= (uploadContent.seriesInfo?.sizeAllowed || 100000000);
    let checkMsg = "";
    if (!extValid) {
      checkMsg = "Only PDF format are allowed";
    } else if (!sizeValid) {
      checkMsg = "File must be less than 50MB";
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

    if (
      !uploadContent.title.isEmpty &&
      uploadContent.title.isValid &&
      uploadContent.description.isValid &&
      !episodeThumbnail.isEmpty &&
      !uploadContent.file.isEmpty
    ) {
      if (
        uploadContent.type === "0" ||
        (!uploadContent.numberOfEdition.isEmpty &&
          uploadContent.numberOfEdition.isValid)
      ) {
        setModalType("nft-confirm");
      } else console.log("validate error 3");
    } else {
      console.log("validate error 4");
    }
    setSubmitClicked(false);
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
    // form.append("image", episodeThumbnail.thumb.pictureAsFile);
    form.append("imgMulti", image);
    form.append("catalogId", catalogId);
    form.append("title", content.title.content);
    form.append("description", content.description.content);
    form.append("fileMulti", content.file.file.file);

    return form;
  };

  const Upload = async () => {

    const formData = packageForm(
      uploadContent,
      episodeThumbnail.thumb.pictureAsFile,
      catalogId
    );

    BookAPI.uploadBook({ formdata: formData }).then((res) => {
      console.log(res);
    });

    // setVisible(true);
    // setTimeout(() => {
    //   if (!isPending) {
    //     setIsPending(true);
    //   }
    // }, 10000);
    // const category = uploadContent.seriesInfo?.category;
    // const uploadSingleFile = (data): Promise<any> =>
    //   new Promise((res, rej) => {
    //     const form = new FormData();
    //     if (!data) {
    //       rej("Errorrr");
    //     }
    //     form.append("file", data);
    //     SeriesAPI.uploadFile({
    //       formdata: form,
    //       userInfo: GetUserInfo(),
    //     })
    //       .then(({ key, location, pageNumber }) => {
    //         res({ key, location, pageNumber });
    //       })
    //       .catch(rej);
    //   });

    // const upload = await Promise.all([
    //   uploadSingleFile(episodeThumbnail.thumb.pictureAsFile),
    //   uploadSingleFile(uploadContent.file.file.file),
    //   category === "Music & Video" &&
    //     uploadSingleFile(videoThumbnail.thumb.pictureAsFile),
    // ]);

    // const formdata = {
    //   title: uploadContent.title.content,
    //   isFree: uploadContent.type === "0" ? true : false,
    //   editions: uploadContent.numberOfEdition.num,
    //   key: upload[1].key,
    //   thumbnail: upload[0].location,
    //   pageNumber: upload[1].pageNumber,
    //   serieId: serie,
    //   description: uploadContent.description.content,
    //   thumbnailVideo: upload[2].location,
    // };

    // EpisodesAPI.createEpisode({
    //   body: formdata,
    //   userInfo: GetUserInfo(),
    // })
    //   .then((res) => {
    //     setLoading(false);
    //     if (res.status === "pending") {
    //       if (!isPending) {
    //         setIsPending(true);
    //       }
    //     } else setVisible(false);
    //   })
    //   .catch((err) => {
    //     setVisible(false);
    //     notifyError(err);
    //     setLoading(false);
    //   });
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
        <section>
          <CatalogSelect setCate={setCatalogId} />
        </section>
        <Form layout="vertical">
          <Form.Item label="Book Title" style={{ width: "48%" }}>
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
            label="Item description (optional)"
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
            setCoverType={setFileExt}
            errorMsg={uploadContent.file.errMsg}
            setCoverErrMsg={(errMsg) => {
              setCoverErrMsg(errMsg);
            }}
          />
        </section>
        <div className={`${style["custom-serie-btn"]}`}>
          <Button
            className={`${style["button"]} ${style["cancel-button"]}`}
            onClick={() => {
              setModalType("cancel-nft");
            }}
          >
            Cancel
          </Button>

          <Button
            className={`${style["button"]} ${style["active-save"]} ${style["confirm-button"]}`}
            onClick={() => {
              console.log(uploadContent);
              setSubmitClicked(true);
              if (episodeThumbnail.errMsg !== "") {
                scrollToTop();
              } else Upload();
            }}
            disabled={uploadContent.file.isEmpty}
          >
            Create
          </Button>
        </div>
      </div>
    </>
  );
};
