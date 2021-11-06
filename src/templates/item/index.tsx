import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./item.module.scss"
import {Col, Row, Skeleton, Button} from "antd";
import Slider from "react-slick";
import CustomImageField from "../../components/image";
import Share from "../../components/share";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import { NonPurchasedItem } from "./NonPurchasesItem";
import { PurchasedItem } from "./PurchasedItem";


const EpisodeTemplate = ({seriesId, episodeId}) => {
    let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  
    const router = useRouter();
    const [shareModal, setShareModal] = useState(false);
    const dispatch = useDispatch();
    const cartList = useSelector((state: any) => state.cart?.cartList);
    const [favorite, setFavorite] = useState(false);
    const [amountInCart, setAmountInCart] = useState(0);
    const [episodeInfo, setEpisodeInfo] = useState<any>({});
    const [episodeTotalLikes, setTotalLikes] = useState(0);
    const [isLogged, setIsLogged] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [addedToBookshelf, setAddedToBookshelf] = useState(false);
  
    const moveToSeriePage = () => {
      const pathname = "/serie/" + seriesId;
      router.push(pathname);
    };
  
    const addToBookshelf = () => {
      // if (!isLogged) setModalVisible(true);
      // else {
      //   CustomerBookshelfAPI.addFreeEpToBookshelf({
      //     userInfo: GetUserInfo(),
      //     episodeId,
      //   })
      //     .then(() => {
      //       setAddedToBookshelf(true);
      //     })
      //     .catch();
      // }
    };
  
    const onClickFavorite = () => {
      // if (!isLogged) setModalVisible(true);
      // console.log(favorite);
      // favorite ?
      //   EpisodeManagementAPI.unlike({
      //     userInfo: GetUserInfo(),
      //     episodeId: episodeId,
      //   }).then((res) => {
      //     console.log(res);
      //     if (res.data == "success") {
      //       setFavorite(false);
      //       setTotalLikes(episodeTotalLikes - 1);
      //     }
      //   }) : EpisodeManagementAPI.like({
      //     userInfo: GetUserInfo(),
      //     episodeId: episodeId,
      //   }).then((res) => {
      //     console.log(res);
      //     if (res.data == "success") {
      //       setFavorite(true);
      //       setTotalLikes(episodeTotalLikes + 1);
      //     }
      //   })
    };
  
    // const [isCreatorMode, setCreatorMode] = useState(false);
    //
    useEffect(() => {
      if (typeof window !== "undefined") {
        userInfo =
          window.localStorage && window.localStorage.getItem("userInfo")
            ? JSON.parse(window.localStorage.getItem("userInfo"))
            : {};
  
        if (userInfo["encryptedPrivateKey"] && userInfo["publicKey"]) {
          setIsLogged(true);
          // if (userInfo.role.role === "creator") setCreatorMode(true);
        } else {
          setIsLogged(false);
        }
      }
    }, [userInfo]);
  
    useEffect(() => {
      fetchData();
    }, [episodeId]);
  
    // const [isPurchasedItem, setIsPurchased] = useState(false);
  
    const fetchData = () => {
      // if (episodeId) {
      //   CustomerEpisodeAPI.getEpisodeInfo({
      //     userInfo: GetUserInfo(),
      //     episodeId: episodeId,
      //   }).then((response) => {
      //     const episode = response.data || response;
      //     setEpisodeInfo({
      //       ...episode,
      //     });
      //     setFavorite(episode?.alreadyLiked);
      //     setTotalLikes(episode?.likes);
      //     console.log(episodeInfo?.isBought);
      //     // setIsPurchased(episode?.numEditionInBookshelf !== null);
      //     // setAddedToBookshelf(episode?.addedToBookshelf);
      //   });
      // }
    };
  
    const getCartList = () => {
      const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      // CustomerCartAPI.getCart({userInfo}).then((data) => {
      //   console.log({data})
      //   if (data) {
      //     dispatch({
      //       type: "UPDATE_CART",
      //       payload: data,
      //     });
      //     data.forEach((_episodeId) => {
      //       if (_episodeId === episodeId)
      //         setAmountInCart(1);
      //     });
      //   }
      // });
    };
  
    const handleAddToCart = () => {
      console.log({"amount": amountInCart});
      let newCartList = [];
      if (cartList) {
        newCartList = [...new Set([...cartList, episodeInfo.episodeId])];
      } else newCartList = [episodeInfo.episodeId]
      console.log({newCartList})
      const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      // if (userInfo) {
      //   CustomerCartAPI.updateCart({
      //     userInfo,
      //     cartItems: newCartList,
      //   }).then(() => {
      //     getCartList();
      //   });
      // } else {
      //   dispatch({
      //     type: "UPDATE_CART",
      //     payload: newCartList,
      //   });
      //   setAmountInCart(1);
      // }
    };
  
    return (
      <div className={style.nft}>
        <Row gutter={30}>
          <Col span={12}>
            <Skeleton active loading={!episodeInfo?.thumbnail}>
              <div className="nft-image" style={{position: "relative"}}>
                <CustomImageField
                  width={"454"}
                  height={"454"}
                  src={episodeInfo.thumbnail}
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
                  paragraph={{rows: 0}}
                  loading={!episodeInfo?.name}
                >
                  <h2 className={style["nft-name"]}>{episodeInfo?.name}</h2>
                </Skeleton>
              </div>
  
              <div>
                <Skeleton
                  active
                  paragraph={{rows: 0}}
                  loading={!episodeInfo?.serie}
                >
                  <h3
                    className={`${style["series-link"]} ${style["cursor_pointer"]
                    }`}
                    onClick={moveToSeriePage}
                  >
                    {episodeInfo?.serie?.serieName}
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
                <span className={style["likes"]}>
                                  {" "}
                  {episodeTotalLikes}{" "}
                              </span>
  
                <span>
                                  <img src={"/assets/icons/separate-line.svg"} width={1} height={22}/>
                              </span>
  
                <span className={style["category-list"]}>
                                  <span className={style["category-name"]}>
                                      {episodeInfo?.category?.categoryName}
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
                <Share episodeId={episodeId} thumbnail={episodeInfo?.thumbnail}/>
              </Row>
  
              {episodeInfo.isBought ? <PurchasedItem
                episodeInfo={episodeInfo}
                serieId={seriesId}
              /> : <NonPurchasedItem
                serieId={seriesId}
                episodeInfo={episodeInfo}
                amountInCart={amountInCart}
                addedToBookshelf={addedToBookshelf}
                handelAddToBookshelf={() => {
                  addToBookshelf()
                }}
                handleAddToCart={handleAddToCart}
              />}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={24} className={`${style["description"]}`}>
            <Skeleton
              active
              loading={
                episodeInfo?.description !== "" && !episodeInfo?.description
              }
            >
              {episodeInfo?.description}
            </Skeleton>
          </Col>
        </Row>
  
        {/* {modalVisible && (
          <RequireLoginModal
            updateModalVisible={() => setModalVisible(false)}
            isFrom={router.asPath}
          />
        )} */}
  
        <div className={`${style["slide"]}`}>
          <Slider
            infinite={true}
            // slidesToShow={3}
            // slidesToScroll={3}
            nextArrow={<div>next</div>}
            prevArrow={<div>prev</div>}
            slidesPerRow={5}
            rows={1}
          >
            {episodeInfo?.similarEpisodes?.map((ep) => {
              return (
                <div className={`${style["slide-component"]}`}>
                  <img src={ep.thumbnail}/>
                </div>
              )
            })}
          </Slider>
        </div>
  
      </div>
    );
  };
  
  export default EpisodeTemplate;