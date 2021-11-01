import style from "./noresult.module.scss";

export const SeeMoreNoResult = ({ message = ""}) => {

  return (
    <>
      <div className={`${style["see-more-no-result"]}`}>
        <img src="/assets/icons/no-result.svg" className={`${style["img"]}`} />
        {message === "" ? (
          <div className={`${style["text"]}`}>No Result</div>
        ) : (
          <div className={`${style["text"]}`}>{message}</div>
        )}
      </div>
    </>
  );
};