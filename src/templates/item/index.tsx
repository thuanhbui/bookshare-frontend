import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./item.module.scss";
import { Col, Row, Skeleton, Button } from "antd";
import Slider from "react-slick";
import CustomImageField from "../../components/image";
import Share from "../../components/share";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import BookAPI from "../../api/book";

const EpisodeTemplate = ({ bookId }) => {

  const router = useRouter();
  const [shareModal, setShareModal] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [amountInCart, setAmountInCart] = useState(0);
  const [bookInfo, setBookInfo] = useState<any>({});
  const [episodeTotalLikes, setTotalLikes] = useState(0);
  const [isLogged, setIsLogged] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addedToBookshelf, setAddedToBookshelf] = useState(false);

  const moveToSeriePage = () => {
    const pathname = "/serie/" + bookId;
    router.push(pathname);
  };

  const onClickFavorite = () => {
  };

  useEffect(() => {
    fetchData();
  }, [bookId]);

  const fetchData = () => {
    if (bookId) {
      BookAPI.getInfo(bookId).then((res) => {
        setBookInfo(res.data);
        console.log(res.data);
      });
    }
  };

  const handleDownload = () => {
  };

  return (
    <div className={style.nft}>
      <Row gutter={30}>
        <Col span={10.75}>
          <Skeleton active loading={!bookInfo?.imageLink}>
            <div className="nft-image" style={{ position: "relative" }}>
              <CustomImageField
                width={"454"}
                height={"454"}
                src={"http://localhost:9001" + bookInfo.imageLink}
                alt="nft"
                isNewRelease={false}
                borderSize="bold"
                isPublished={true}
                isSoldOut={false}
              />
            </div>
          </Skeleton>
        </Col>

        <Col span={12}>
          <div className={style["product-detail"]}>
            <div className={style["name-container"]}>
              <Skeleton
                active
                paragraph={{ rows: 0 }}
                loading={!bookInfo?.title}
              >
                <h2 className={style["nft-name"]}>{bookInfo?.title}</h2>
              </Skeleton>
            </div>

            <div>
              <Skeleton
                active
                paragraph={{ rows: 0 }}
                loading={!bookInfo?.userName}
              >
                <h3
                  className={`${style["series-link"]} ${style["cursor_pointer"]}`}
                  onClick={moveToSeriePage}
                >
                  {bookInfo?.userName}
                </h3>
              </Skeleton>
            </div>

            <div className={style["category-row"]}>
              <span>
                {favorite ? (
                  <HeartFilled
                    className={`${style["favorite-icon"]} ${style["color-red"]}`}
                    onClick={onClickFavorite}
                  />
                ) : (
                  <HeartOutlined
                    className={`${style["favorite-icon"]}`}
                    onClick={onClickFavorite}
                  />
                )}
              </span>
              <span className={style["likes"]}> {bookInfo?.likes} </span>

              <span>
                <img
                  src={"/assets/icons/separate-line.svg"}
                  width={1}
                  height={22}
                />
              </span>

              <span className={style["category-list"]}>
                <span className={style["category-name"]}>
                  {bookInfo?.catalogName}
                </span>
              </span>
            </div>

            <div>
              <img
                className={`${style["dotted-line"]}`}
                src={"/assets/icons/dotted-line.svg"}
                height={2}
              />
            </div>

            <Row>
              <Share episodeId={bookId} thumbnail={bookInfo?.imageLink} />
            </Row>
            <Row gutter={15} className={`${style["available"]}`}>
              <>
                <Col span={11}>
                  <Button
                    className={
                      amountInCart < 1
                        ? `${style["available"]} ${style["btn-add-to-cart"]}`
                        : `${style["sold-out"]} ${style["btn-add-to-cart"]}`
                    }
                    disabled={amountInCart > 0}
                    onClick={() => handleDownload()}
                  >
                    Download
                  </Button>
                </Col>
                <Col span={2}></Col>
                <Col span={11}>
                  <Button
                    className={`${style["available"]} ${style["btn-buy-now"]}`}
                  >
                    Enjoy
                  </Button>
                </Col>
              </>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24} className={`${style["description"]}`}>
          <Skeleton
            active
            loading={
              bookInfo?.description !== "" && !bookInfo?.description
            }
          >
            <p>{bookInfo?.description}</p>
          </Skeleton>
        </Col>
      </Row>

      {/* {modalVisible && (
          <RequireLoginModal
            updateModalVisible={() => setModalVisible(false)}
            isFrom={router.asPath}
          />
        )} */}

    </div>
  );
};

export default EpisodeTemplate;
