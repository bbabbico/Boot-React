import axios from "axios";
import {API_SERVER_HOST} from "./todoApi";

const restApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
const clientSecret = import.meta.env.VITE_KAKAO_CLIENT_SECRET;
const redirectUri = "http://localhost:5173/member/kakao";

export const getKakaoLoginLink = () => {
  const params = new URLSearchParams({
    client_id: restApiKey,
    redirect_uri: redirectUri,
    response_type: "code",
  });

  return `https://kauth.kakao.com/oauth/authorize?${params}`;
};

export const getAccessToken = async (authCode) => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: restApiKey,
    redirect_uri: redirectUri,
    code: authCode,
  });

  if (clientSecret) {
    params.set("client_secret", clientSecret);
  }

  const res = await axios.post("https://kauth.kakao.com/oauth/token", params);

  return res.data.access_token;
};

export const getMemberWithAccessToken = async (accessToken) => {
  const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao`, {params: {accessToken}});

  return res.data;
};
