export default function CheckLogin() {
  const isLogin = sessionStorage.getItem("accessToken");

  if (isLogin) {
    return true;
  } else {
    return false;
  }
}
