import {useEffect, useRef} from "react";
import {Navigate, useNavigate, useSearchParams} from "react-router-dom";
import {getAccessToken, getMemberWithAccessToken} from "../../api/kakaoApi";
import useZustandMember from "../../zstore/useZustandMember";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");
  const save = useZustandMember((state) => state.save);
  const navigate = useNavigate();
  const requested = useRef(false);

  useEffect(() => {
    if (!authCode || requested.current) {
      return;
    }

    requested.current = true;

    getAccessToken(authCode)
      .then(getMemberWithAccessToken)
      .then((memberInfo) => {
        save(memberInfo);
        navigate(memberInfo.social ? "/member/modify" : "/", {replace: true});
      })
      .catch((err) => {
        console.error(err);
        alert("카카오 로그인에 실패했습니다.");
        navigate("/member/login", {replace: true});
      });
  }, [authCode, save, navigate]);

  return authCode ? <div className="text-3xl">Kakao Login...</div> : <Navigate replace to="/member/login"/>;
};

export default KakaoRedirectPage;
