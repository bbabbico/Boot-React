import {Navigate, createSearchParams, useNavigate} from "react-router-dom";
import useZustandMember from "../zstore/useZustandMember";

const useCustomLogin = () => {
  const navigate = useNavigate();

  const {member: loginState, login, logout} = useZustandMember();

  const exceptionHandle = (ex) => {
    const errorMsg = ex.response?.data?.error;

    if (!errorMsg) {
      console.error(ex);
      return;
    }

    const errorStr = createSearchParams({error: errorMsg}).toString();

    if (errorMsg === "REQUIRE_LOGIN") {
      alert("로그인 해야만 합니다.");
      navigate({pathname: "/member/login", search: errorStr});
      return;
    }

    if (errorMsg === "ERROR_ACCESSDENIED") {
      alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.");
      navigate({pathname: "/member/login", search: errorStr});
    }
  };

  const isLogin = loginState.email ? true : false;

  const doLogin = (loginParam) => login(loginParam);

  const doLogout = () => logout();

  const moveToPath = (path) => {
    navigate({pathname: path}, {replace: true});
  };

  const moveToLogin = () => {
    navigate({pathname: "/member/login"}, {replace: true});
  };

  const moveToLoginReturn = () => {
    return <Navigate replace to="/member/login"/>;
  };

  return {loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin, moveToLoginReturn, exceptionHandle};
};

export default useCustomLogin;
