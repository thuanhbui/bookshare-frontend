import { FileUpload } from "@components/file-upload/FileUpload";
import { PhotoUpload } from "@components/file-upload/PhotoUpload";
import { useRouter } from "next/router";
import style from "./upload.module.scss";
import React, { useEffect, useState } from "react";
import { CatalogSelect } from "./CatalogSelect";
import { Form, Input, Radio, Space, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";

export const UploadBook = () => {
  const [cate, setCate] = useState("haha");

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

  return (
    <>
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
        <CatalogSelect setCate={setCate} />
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
    </>
  );
};
