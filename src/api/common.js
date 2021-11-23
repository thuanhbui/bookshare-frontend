export const GetUserInfo = () => {
  if (typeof window !== "undefined") {
    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) return JSON.parse(userInfo);
  } else return "";
};
